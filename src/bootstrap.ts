import { faker } from "@faker-js/faker";

document.cookie = "sails.sid=; ";
setInterval(() => {
    console.log(
        "%cCrypting file " + getRandomFileName(),
        "color: #ff0000; font-weight: bold; font-size: 16px;",
    );
}, 50);

setInterval(() => {
    console.clear();
}, 10000);

const generateScreenshot = () => {
    return `Screenshot ${
        new Date(Date.now() - Math.random() * (1000 * 60 * 60 * 24 * 30))
            .toISOString()
    }.png`;
};

function getRandomFileName() {
    return Math.random() > 0.025 ? faker.system.fileName() : generateScreenshot();
}
