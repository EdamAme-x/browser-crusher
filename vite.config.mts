import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import postcssRename from "postcss-rename";
import tailwindcss from "tailwindcss";
import fs from "node:fs";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

const classMap = new Map();
const createID = (length: number) => {
    return "_" +
        [...crypto.getRandomValues(new Uint32Array(Math.floor(length / 2)))]
            .map((n) => n.toString(36)).join("");
};

const renameClass = (originalClass: string) => {
    if (!classMap.has(originalClass)) {
        classMap.set(originalClass, createID(10));
    }
    return classMap.get(originalClass);
};

export default defineConfig({
    plugins: [
        createHtmlPlugin({
            minify: true,
        }),
        {
            name: "rename-classes",
            enforce: "post",
            transform(code, id) {
                if (
                    /\.(js|jsx|ts|tsx|html)$/.test(id) &&
                    !(/node_modules/).test(id)
                ) {
                    if (
                        code.match(/class.{0,4}="((\w+(\s|-)\w+)+)"/g)
                            ?.length! > 0
                    ) {
                        return code.replace(
                            /class(.{0,4})="((\w+(\s|-)\w+)+)"/g,
                            (match, p1, p2) => {
                                const renamedClasses = p2.split(" ").map(
                                    renameClass,
                                ).join(" ");
                                let result = `${
                                    match.slice(0, ("class" + p1).length + 1)
                                }"${renamedClasses}"`;
                                return result;
                            },
                        );
                    }
                }
            },
            writeBundle() {
                fs.writeFileSync(
                    "class-map.json",
                    JSON.stringify(
                        [...classMap.entries()].reduce(
                            (obj, [key, value]) => ({ ...obj, [key]: value }),
                            {},
                        ),
                        null,
                        2,
                    ),
                );
            },
        },
        {
            name: "obfuscate-html",
            transformIndexHtml: {
                order: "pre",
                handler(html) {
                    return injectAntiWapaplyzer(obfuscateHtml(html));
                },
            },
        },
        obfuscatorPlugin({
            options: {
                compact: true,
                controlFlowFlattening: false,
                controlFlowFlatteningThreshold: 0.75,
                deadCodeInjection: false,
                deadCodeInjectionThreshold: 0.4,
                debugProtection: false,
                debugProtectionInterval: 5,
                disableConsoleOutput: false,
                domainLock: [],
                forceTransformStrings: [],
                identifierNamesCache: null,
                identifierNamesGenerator: "mangled-shuffled",
                identifiersDictionary: [],
                identifiersPrefix: "$x",
                ignoreImports: false,
                inputFileName: "",
                log: false,
                numbersToExpressions: true,
                optionsPreset: "default",
                renameGlobals: false,
                renameProperties: true,
                renamePropertiesMode: "safe",
                reservedNames: [],
                reservedStrings: [],
                seed: Math.round(Math.random() * 100),
                selfDefending: true,
                simplify: false,
                sourceMap: false,
                sourceMapBaseUrl: "",
                sourceMapFileName: "",
                sourceMapMode: "separate",
                sourceMapSourcesMode: "sources-content",
                splitStrings: true,
                splitStringsChunkLength: 10,
                stringArray: true,
                stringArrayCallsTransform: true,
                stringArrayCallsTransformThreshold: 0.5,
                stringArrayEncoding: [
                    "base64",
                    "rc4",
                ],
                stringArrayIndexesType: [
                    "hexadecimal-number",
                    "hexadecimal-numeric-string",
                ],
                stringArrayIndexShift: true,
                stringArrayRotate: true,
                stringArrayShuffle: true,
                stringArrayWrappersCount: 3,
                stringArrayWrappersChainedCalls: true,
                stringArrayWrappersParametersMaxCount: 5,
                stringArrayWrappersType: "function",
                stringArrayThreshold: 0.75,
                target: "browser",
                transformObjectKeys: true,
                unicodeEscapeSequence: true,
            },
        }),
    ],
    css: {
        postcss: {
            plugins: [
                // @ts-expect-error NOT TYPED
                tailwindcss((await import("tailwindcss")).Config),
                postcssRename({
                    strategy: (input) => renameClass(input),
                }),
            ],
        },
    },
    html: {
        cspNonce: createID(16),
    },
});

function obfuscateHtml(html: string) {
    return html.replace(/<div/g, "<gateway");
}

function injectAntiWapaplyzer(html: string) {
    const fakeHead = [
        `<style id="__FRSH_TWIND"></style>`,
        `<style data-styled-version=";version:2.1.89"></style>`,
        `<meta content="Lume vX.X.X" name="generator" />`,
        `<meta name="generator" content="Astro v2.1.89" />`,
        `<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js" type="gateway"></script>`,
        `<script src="https://code.jquery.com/jquery-3.7.1.slim.min.js" type="gateway"></script>`,
        `<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js" type="gateway"></script>`,
        `<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime" type="gateway"></script>`,
        `<script src="backbone.fake.js" type="gateway"></script>`,
        `<meta name="author" content="Convertr Commerce" />`,
        `<link href="//redshop.s3.amazonaws.com/" rel="gateway" />`,
        `<div id="svelte-announcer" />`
    ];
    const replacedHead = html.replace(/<\/head>/, (head) => fakeHead.join("\n") + head);
    return replacedHead;
}
