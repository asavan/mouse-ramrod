import {playSound, initField} from "./helper.js";
import engine from "./engine.js";
import idealMouse from "./idealMouse.js";
import quasiMouseFunc from "./quasiMouse.js";
import randomMouse from "./randomMouse.js";
import {delay, detectLangByBrowser, translator, handlersFunc} from "netutils";

const handleClick = function (evt, parent) {
    const getIndex = function (e, p) {
        for (let i = 0; i < p.children.length; i++) {
            if (p.children[i] === e.target) {
                return i;
            }
        }
        return -1;
    };

    evt.preventDefault();
    if (!evt.target.classList.contains("cell")) {
        return -1;
    }
    return getIndex(evt, parent);
};

async function draw(presenter, box, message, settings, trans) {
    // 🐭 🐁 🖯 🖰 🖱 🖱️ 🗿
    const avMice = ["", "&#128045;", "&#128001;", "&#128431;", "&#128432;", "&#128433;",
        "&#128433;&#65039;", "&#128511;"];

    // 🕳 🔨 🪓 ⛏ 🗡 🔪 🔧 📌 🪠 🪄
    const avRamrod = ["&#128371;", "&#128296;", "&#129683;", "&#9935;", "&#128481;", "&#128298;",
        "&#128295;", "&#128204;", "&#129696;", "&#129668;"];

    // 🪤 💥 🎆 ⚰️
    const avCollision = ["&#129700;", "&#128165;", "&#127878;", "&#9904;&#65039;"];

    function setText(tile, text) {
        if (text) {
            tile.innerHTML = `<span>${text}</span>`;
        } else {
            tile.innerHTML = "";
        }
    }

    for (let i = 0; i < settings.size; i++) {
        const tile = box.childNodes[i];
        if (presenter.isRamrodPos(i)) {
            if (presenter.isWin()) {
                setText(tile, avCollision[settings.collision]);
            } else {
                setText(tile, avRamrod[settings.ramrod]);
            }
        } else if (presenter.isMousePos(i)) {
            setText(tile, avMice[settings.mouse]);
        } else {
            setText(tile, "");
        }
    }
    if (message && presenter.getMoveCount()) {
        message.textContent = await trans.pluralise("move", presenter.getMoveCount());
    }
}

function localeLoader() {
    return {
        "en": async () => {
            const module = await import("../locales/en.json", {
                with: {
                    type: "json"
                }
            });
            return module.default;
        },
        "ru": async () => {
            const module = await import("../locales/ru.json", {
                with: {
                    type: "json"
                }
            });
            return module.default;
        }
    };
}


export default function game(window, document, settings) {

    const box = document.querySelector(".box");
    const message = document.querySelector(".message");
    const overlay = document.querySelector(".overlay");
    const close = document.querySelector(".close");
    const tada = document.getElementById("tada");

    document.documentElement.style.setProperty("--field-size", settings.size);

    const lang = settings.lang || detectLangByBrowser(window);

    const trans = translator(lang, localeLoader());
    trans.warmUp().then(async () => {
        const rulesEl = document.querySelector(".rules");
        rulesEl.innerHTML = (await trans.t("rules")).replaceAll("\n", "<br>");

        const winHeaderEl = document.querySelector(".win-header");
        winHeaderEl.textContent = await trans.t("catch");
        document.title = await trans.t("game");
    });
    document.documentElement.lang = trans.getLang();

    const handlers = handlersFunc(["gameover"]);
    const {on} = handlers;

    const miceFunc = [idealMouse, quasiMouseFunc, quasiMouseFunc,
        randomMouse, quasiMouseFunc, idealMouse, randomMouse, quasiMouseFunc];

    const g = engine(settings.size, miceFunc[settings.mouse]);

    async function onGameEnd() {
        const content = overlay.querySelector(".content");
        const str = (await trans.t("in")) + " " + await trans.pluralise("move", g.getMoveCount());
        content.textContent = str;
        overlay.classList.add("show");
        handlers.call("gameover", g.getMoveCount());
        if (settings.sound) {
            playSound(tada);
        }
    }

    async function drawWithAnimation() {
        await draw(g, box, message, settings, trans);
        if (g.isWin()) {
            await delay(200);
            await onGameEnd();
        }
    }

    async function nextStep() {
        await delay(60);
        g.mouseMove();
        await drawWithAnimation();
        if (!g.isWin()) {
            await delay(200);
            g.setShowMousePos(false);
            await drawWithAnimation();
        }
    }

    initField(settings.size, "cell", box, document);
    drawWithAnimation();

    const handleBox = function (evt) {
        const ind = handleClick(evt, box);
        if (g.tryMoveToIndex(ind)) {
            nextStep();
        }
    };

    box.addEventListener("click", handleBox, false);
    close.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.classList.remove("show");
    }, false);

    return {
        on
    };
}
