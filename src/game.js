"use strict"; // jshint ;_;
import {playSound, numAndDeclOfNum, initField} from "./helper.js";
import engine from "./engine.js";
import idealMouse from "./idealMouse.js";
import quasiMouseFunc from "./quasiMouse.js";
import randomMouse from "./randomMouse.js";

function stub() {
}

const handleClick = function (evt, parent) {
    const getIndex = function (e, p) {
        for (let i = 0; i < p.children.length; i++) {
            if (p.children[i] === e.target) return i;
        }
        return -1;
    };

    evt.preventDefault();
    if (!evt.target.classList.contains("cell")) {
        return -1;
    }
    return getIndex(evt, parent);
};

function draw(presenter, box, message, settings) {
    // 🐭 🐁 🖯 🖰 🖱 🖱️ 🗿
    const avMice = ["", "&#128045;", "&#128001;", "&#128431;", "&#128432;", "&#128433;", "&#128433;&#65039;", "&#128511;"];
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
        message.textContent = numAndDeclOfNum(presenter.getMoveCount(), ["ход", "хода", "ходов"]);
    }
}

export default function game(window, document, settings) {

    const box = document.querySelector(".box");
    const message = document.querySelector(".message");
    const overlay = document.querySelector(".overlay");
    const close = document.querySelector(".close");
    const tada = document.getElementById("tada");

    document.documentElement.style.setProperty("--field-size", settings.size);

    const handlers = {
        "gameover": stub,
        "mouse": stub,
        "ramrod": stub
    };

    const miceFunc = [idealMouse, quasiMouseFunc, quasiMouseFunc, randomMouse, quasiMouseFunc, idealMouse, randomMouse, quasiMouseFunc];

    const g = engine(settings.size, miceFunc[settings.mouse]);

    function onGameEnd() {
        const content = overlay.querySelector(".content");
        content.textContent = "За  " + numAndDeclOfNum(g.getMoveCount(), ["ход", "хода", "ходов"]);
        overlay.classList.add("show");
        handlers["gameover"](g.getMoveCount());
        if (settings.sound) {
            playSound(tada);
        }
    }

    function drawWithAnimation() {
        draw(g, box, message, settings);
        if (g.isWin()) {
            setTimeout(onGameEnd, 200);
        }
    }

    function nextStep() {
        function step() {
            g.mouseMove();
            drawWithAnimation();
            if (!g.isWin()) {
                setTimeout(() => {
                    g.setShowMousePos(false);
                    drawWithAnimation();
                }, 200);
            }
        }

        setTimeout(step, 60);
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
    close.addEventListener("click", function (e) {
        e.preventDefault();
        overlay.classList.remove("show");
    }, false);

    function on(name, f) {
        handlers[name] = f;
    }

    return {
        on: on
    };
}
