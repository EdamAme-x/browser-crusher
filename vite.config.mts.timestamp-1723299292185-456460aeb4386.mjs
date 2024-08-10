// vite.config.mts
import { defineConfig } from "file:///C:/Users/user/Desktop/practice/browser-crusher/node_modules/vite/dist/node/index.js";
import { createHtmlPlugin } from "file:///C:/Users/user/Desktop/practice/browser-crusher/node_modules/vite-plugin-html/dist/index.mjs";
import postcssRename from "file:///C:/Users/user/Desktop/practice/browser-crusher/node_modules/postcss-rename/build/index.js";
import tailwindcss from "file:///C:/Users/user/Desktop/practice/browser-crusher/node_modules/tailwindcss/lib/index.js";
import fs from "node:fs";
import obfuscatorPlugin from "file:///C:/Users/user/Desktop/practice/browser-crusher/node_modules/vite-plugin-javascript-obfuscator/dist/index.cjs.js";
var classMap = /* @__PURE__ */ new Map();
var createID = (length) => {
  return "_" + [...crypto.getRandomValues(new Uint32Array(Math.floor(length / 2)))].map((n) => n.toString(36)).join("");
};
var renameClass = (originalClass) => {
  if (!classMap.has(originalClass)) {
    classMap.set(originalClass, createID(10));
  }
  return classMap.get(originalClass);
};
var vite_config_default = defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true
    }),
    {
      name: "rename-classes",
      enforce: "post",
      transform(code, id) {
        if (/\.(js|jsx|ts|tsx|html)$/.test(id) && !/node_modules/.test(id)) {
          if (code.match(/class.{0,4}="((\w+(\s|-)\w+)+)"/g)?.length > 0) {
            return code.replace(
              /class(.{0,4})="((\w+(\s|-)\w+)+)"/g,
              (match, p1, p2) => {
                const renamedClasses = p2.split(" ").map(
                  renameClass
                ).join(" ");
                let result = `${match.slice(0, ("class" + p1).length + 1)}"${renamedClasses}"`;
                return result;
              }
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
              {}
            ),
            null,
            2
          )
        );
      }
    },
    {
      name: "obfuscate-html",
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          return obfuscateHtml(html);
        }
      }
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
          "rc4"
        ],
        stringArrayIndexesType: [
          "hexadecimal-number",
          "hexadecimal-numeric-string"
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
        unicodeEscapeSequence: true
      }
    })
  ],
  css: {
    postcss: {
      plugins: [
        // @ts-expect-error NOT TYPED
        tailwindcss((await import("file:///C:/Users/user/Desktop/practice/browser-crusher/node_modules/tailwindcss/lib/index.js")).Config),
        postcssRename({
          strategy: (input) => renameClass(input)
        })
      ]
    }
  },
  html: {
    cspNonce: createID(16)
  }
});
function obfuscateHtml(html) {
  return html.replace(/<div/g, "<gateway");
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxEZXNrdG9wXFxcXHByYWN0aWNlXFxcXGJyb3dzZXItY3J1c2hlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxEZXNrdG9wXFxcXHByYWN0aWNlXFxcXGJyb3dzZXItY3J1c2hlclxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3VzZXIvRGVza3RvcC9wcmFjdGljZS9icm93c2VyLWNydXNoZXIvdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1odG1sXCI7XHJcbmltcG9ydCBwb3N0Y3NzUmVuYW1lIGZyb20gXCJwb3N0Y3NzLXJlbmFtZVwiO1xyXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcInRhaWx3aW5kY3NzXCI7XHJcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xyXG5pbXBvcnQgb2JmdXNjYXRvclBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tamF2YXNjcmlwdC1vYmZ1c2NhdG9yXCI7XHJcblxyXG5jb25zdCBjbGFzc01hcCA9IG5ldyBNYXAoKTtcclxuY29uc3QgY3JlYXRlSUQgPSAobGVuZ3RoOiBudW1iZXIpID0+IHtcclxuICAgIHJldHVybiBcIl9cIiArXHJcbiAgICAgICAgWy4uLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQzMkFycmF5KE1hdGguZmxvb3IobGVuZ3RoIC8gMikpKV1cclxuICAgICAgICAgICAgLm1hcCgobikgPT4gbi50b1N0cmluZygzNikpLmpvaW4oXCJcIik7XHJcbn07XHJcblxyXG5jb25zdCByZW5hbWVDbGFzcyA9IChvcmlnaW5hbENsYXNzOiBzdHJpbmcpID0+IHtcclxuICAgIGlmICghY2xhc3NNYXAuaGFzKG9yaWdpbmFsQ2xhc3MpKSB7XHJcbiAgICAgICAgY2xhc3NNYXAuc2V0KG9yaWdpbmFsQ2xhc3MsIGNyZWF0ZUlEKDEwKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2xhc3NNYXAuZ2V0KG9yaWdpbmFsQ2xhc3MpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgICBjcmVhdGVIdG1sUGx1Z2luKHtcclxuICAgICAgICAgICAgbWluaWZ5OiB0cnVlLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJyZW5hbWUtY2xhc3Nlc1wiLFxyXG4gICAgICAgICAgICBlbmZvcmNlOiBcInBvc3RcIixcclxuICAgICAgICAgICAgdHJhbnNmb3JtKGNvZGUsIGlkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgL1xcLihqc3xqc3h8dHN8dHN4fGh0bWwpJC8udGVzdChpZCkgJiZcclxuICAgICAgICAgICAgICAgICAgICAhKC9ub2RlX21vZHVsZXMvKS50ZXN0KGlkKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlLm1hdGNoKC9jbGFzcy57MCw0fT1cIigoXFx3KyhcXHN8LSlcXHcrKSspXCIvZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8ubGVuZ3RoISA+IDBcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvZGUucmVwbGFjZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9jbGFzcyguezAsNH0pPVwiKChcXHcrKFxcc3wtKVxcdyspKylcIi9nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1hdGNoLCBwMSwgcDIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZW5hbWVkQ2xhc3NlcyA9IHAyLnNwbGl0KFwiIFwiKS5tYXAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmFtZUNsYXNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuam9pbihcIiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGAke1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaC5zbGljZSgwLCAoXCJjbGFzc1wiICsgcDEpLmxlbmd0aCArIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVwiJHtyZW5hbWVkQ2xhc3Nlc31cImA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB3cml0ZUJ1bmRsZSgpIHtcclxuICAgICAgICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjbGFzcy1tYXAuanNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbLi4uY2xhc3NNYXAuZW50cmllcygpXS5yZWR1Y2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob2JqLCBba2V5LCB2YWx1ZV0pID0+ICh7IC4uLm9iaiwgW2tleV06IHZhbHVlIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwib2JmdXNjYXRlLWh0bWxcIixcclxuICAgICAgICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sOiB7XHJcbiAgICAgICAgICAgICAgICBvcmRlcjogXCJwcmVcIixcclxuICAgICAgICAgICAgICAgIGhhbmRsZXIoaHRtbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmZ1c2NhdGVIdG1sKGh0bWwpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9iZnVzY2F0b3JQbHVnaW4oe1xyXG4gICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBjb21wYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbEZsb3dGbGF0dGVuaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xGbG93RmxhdHRlbmluZ1RocmVzaG9sZDogMC43NSxcclxuICAgICAgICAgICAgICAgIGRlYWRDb2RlSW5qZWN0aW9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGRlYWRDb2RlSW5qZWN0aW9uVGhyZXNob2xkOiAwLjQsXHJcbiAgICAgICAgICAgICAgICBkZWJ1Z1Byb3RlY3Rpb246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZGVidWdQcm90ZWN0aW9uSW50ZXJ2YWw6IDUsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlQ29uc29sZU91dHB1dDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBkb21haW5Mb2NrOiBbXSxcclxuICAgICAgICAgICAgICAgIGZvcmNlVHJhbnNmb3JtU3RyaW5nczogW10sXHJcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyTmFtZXNDYWNoZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGlkZW50aWZpZXJOYW1lc0dlbmVyYXRvcjogXCJtYW5nbGVkLXNodWZmbGVkXCIsXHJcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyc0RpY3Rpb25hcnk6IFtdLFxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcnNQcmVmaXg6IFwiJHhcIixcclxuICAgICAgICAgICAgICAgIGlnbm9yZUltcG9ydHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaW5wdXRGaWxlTmFtZTogXCJcIixcclxuICAgICAgICAgICAgICAgIGxvZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBudW1iZXJzVG9FeHByZXNzaW9uczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnNQcmVzZXQ6IFwiZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgICAgcmVuYW1lR2xvYmFsczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICByZW5hbWVQcm9wZXJ0aWVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVuYW1lUHJvcGVydGllc01vZGU6IFwic2FmZVwiLFxyXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZWROYW1lczogW10sXHJcbiAgICAgICAgICAgICAgICByZXNlcnZlZFN0cmluZ3M6IFtdLFxyXG4gICAgICAgICAgICAgICAgc2VlZDogTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTAwKSxcclxuICAgICAgICAgICAgICAgIHNlbGZEZWZlbmRpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzaW1wbGlmeTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VNYXA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc291cmNlTWFwQmFzZVVybDogXCJcIixcclxuICAgICAgICAgICAgICAgIHNvdXJjZU1hcEZpbGVOYW1lOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgc291cmNlTWFwTW9kZTogXCJzZXBhcmF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgc291cmNlTWFwU291cmNlc01vZGU6IFwic291cmNlcy1jb250ZW50XCIsXHJcbiAgICAgICAgICAgICAgICBzcGxpdFN0cmluZ3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzcGxpdFN0cmluZ3NDaHVua0xlbmd0aDogMTAsXHJcbiAgICAgICAgICAgICAgICBzdHJpbmdBcnJheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN0cmluZ0FycmF5Q2FsbHNUcmFuc2Zvcm06IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdHJpbmdBcnJheUNhbGxzVHJhbnNmb3JtVGhyZXNob2xkOiAwLjUsXHJcbiAgICAgICAgICAgICAgICBzdHJpbmdBcnJheUVuY29kaW5nOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgXCJiYXNlNjRcIixcclxuICAgICAgICAgICAgICAgICAgICBcInJjNFwiLFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHN0cmluZ0FycmF5SW5kZXhlc1R5cGU6IFtcclxuICAgICAgICAgICAgICAgICAgICBcImhleGFkZWNpbWFsLW51bWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGV4YWRlY2ltYWwtbnVtZXJpYy1zdHJpbmdcIixcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBzdHJpbmdBcnJheUluZGV4U2hpZnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdHJpbmdBcnJheVJvdGF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN0cmluZ0FycmF5U2h1ZmZsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN0cmluZ0FycmF5V3JhcHBlcnNDb3VudDogMyxcclxuICAgICAgICAgICAgICAgIHN0cmluZ0FycmF5V3JhcHBlcnNDaGFpbmVkQ2FsbHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdHJpbmdBcnJheVdyYXBwZXJzUGFyYW1ldGVyc01heENvdW50OiA1LFxyXG4gICAgICAgICAgICAgICAgc3RyaW5nQXJyYXlXcmFwcGVyc1R5cGU6IFwiZnVuY3Rpb25cIixcclxuICAgICAgICAgICAgICAgIHN0cmluZ0FycmF5VGhyZXNob2xkOiAwLjc1LFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBcImJyb3dzZXJcIixcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybU9iamVjdEtleXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB1bmljb2RlRXNjYXBlU2VxdWVuY2U6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgY3NzOiB7XHJcbiAgICAgICAgcG9zdGNzczoge1xyXG4gICAgICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIE5PVCBUWVBFRFxyXG4gICAgICAgICAgICAgICAgdGFpbHdpbmRjc3MoKGF3YWl0IGltcG9ydChcInRhaWx3aW5kY3NzXCIpKS5Db25maWcpLFxyXG4gICAgICAgICAgICAgICAgcG9zdGNzc1JlbmFtZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyYXRlZ3k6IChpbnB1dCkgPT4gcmVuYW1lQ2xhc3MoaW5wdXQpLFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBodG1sOiB7XHJcbiAgICAgICAgY3NwTm9uY2U6IGNyZWF0ZUlEKDE2KSxcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gb2JmdXNjYXRlSHRtbChodG1sOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBodG1sLnJlcGxhY2UoLzxkaXYvZywgXCI8Z2F0ZXdheVwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5qZWN0QW50aVdhcGFwbHl6ZXIoaHRtbDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBmYWtlSGVhZCA9IFtcclxuICAgICAgICBgPHN0eWxlIGlkPVwiX19GUlNIX1RXSU5EXCIvPmAsXHJcbiAgICAgICAgYDxtZXRhIGNvbnRlbnQ9XCJMdW1lIHZYLlguWFwiIG5hbWU9XCJnZW5lcmF0b3JcIj5gLFxyXG4gICAgICAgIGA8bWV0YSBuYW1lPVwiZ2VuZXJhdG9yXCIgY29udGVudD1cIkFzdHJvIHYyLjEuODlcIj5gLFxyXG4gICAgICAgIGA8c2NyaXB0IGNyb3Nzb3JpZ2luIHNyYz1cImh0dHBzOi8vdW5wa2cuY29tL3JlYWN0QDE4L3VtZC9yZWFjdC5kZXZlbG9wbWVudC5qc1wiIHR5cGU9XCJnYXRld2F5XCI+PC9zY3JpcHQ+YCxcclxuICAgICAgICBgPHNjcmlwdCBzcmM9XCJodHRwczovL2NvZGUuanF1ZXJ5LmNvbS9qcXVlcnktMy43LjEuc2xpbS5taW4uanNcIiB0eXBlPVwiZ2F0ZXdheVwiPjwvc2NyaXB0PmAsXHJcbiAgICAgICAgYDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9jb2RlLmpxdWVyeS5jb20vdWkvMS4xMy4yL2pxdWVyeS11aS5taW4uanNcIiB0eXBlPVwiZ2F0ZXdheVwiPjwvc2NyaXB0PmAsXHJcbiAgICAgICAgYDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9AdW5vY3NzL3J1bnRpbWVcIiB0eXBlPVwiZ2F0ZXdheVwiPjwvc2NyaXB0PmAsXHJcbiAgICAgICAgYDxzY3JpcHQgc3JjPVwiYmFja2JvbmUuZmFrZS5qc1wiIHR5cGU9XCJnYXRld2F5XCI+PC9zY3JpcHQ+YCxcclxuICAgICAgICBgPG1ldGEgYXV0aG9yPVwiQ29udmVydHIgQ29tbWVyY2VcIj5gLFxyXG4gICAgXTtcclxuICAgIHJldHVybiBodG1sLnJlcGxhY2UoLzxcXC9oZWFkPi8sIChoZWFkKSA9PiBmYWtlSGVhZC5qb2luKFwiXFxuXCIpICsgaGVhZCk7XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVSxTQUFTLG9CQUFvQjtBQUN2VyxTQUFTLHdCQUF3QjtBQUNqQyxPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFFBQVE7QUFDZixPQUFPLHNCQUFzQjtBQUU3QixJQUFNLFdBQVcsb0JBQUksSUFBSTtBQUN6QixJQUFNLFdBQVcsQ0FBQyxXQUFtQjtBQUNqQyxTQUFPLE1BQ0gsQ0FBQyxHQUFHLE9BQU8sZ0JBQWdCLElBQUksWUFBWSxLQUFLLE1BQU0sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzlELElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7QUFDL0M7QUFFQSxJQUFNLGNBQWMsQ0FBQyxrQkFBMEI7QUFDM0MsTUFBSSxDQUFDLFNBQVMsSUFBSSxhQUFhLEdBQUc7QUFDOUIsYUFBUyxJQUFJLGVBQWUsU0FBUyxFQUFFLENBQUM7QUFBQSxFQUM1QztBQUNBLFNBQU8sU0FBUyxJQUFJLGFBQWE7QUFDckM7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxpQkFBaUI7QUFBQSxNQUNiLFFBQVE7QUFBQSxJQUNaLENBQUM7QUFBQSxJQUNEO0FBQUEsTUFDSSxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxVQUFVLE1BQU0sSUFBSTtBQUNoQixZQUNJLDBCQUEwQixLQUFLLEVBQUUsS0FDakMsQ0FBRSxlQUFnQixLQUFLLEVBQUUsR0FDM0I7QUFDRSxjQUNJLEtBQUssTUFBTSxrQ0FBa0MsR0FDdkMsU0FBVSxHQUNsQjtBQUNFLG1CQUFPLEtBQUs7QUFBQSxjQUNSO0FBQUEsY0FDQSxDQUFDLE9BQU8sSUFBSSxPQUFPO0FBQ2Ysc0JB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
