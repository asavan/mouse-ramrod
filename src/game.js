"use strict"; // jshint ;_;
import {playSound, numAndDeclOfNum, initField} from "./helper.js";
import {engine} from "./engine.js";

function stub() {
}



const handleClick = function (evt, parent) {
    const getIndex = function (e, parent) {
        const target = e.target || e.srcElement;
        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i] === target) return i;
        }
        return -1;
    };

    evt.preventDefault();
    if (!(evt.target.classList.contains('cell') || evt.target.classList.contains('digit'))) {
        return;
    }
    return getIndex(evt, parent);
};

function draw(presenter, box, message, settings) {
    const avMice = ["&#128045;", "&#128001;", "&#128431;", "&#128432;", "&#128433;"];
    for (let i = 0; i < presenter.size; i++) {
        const tile = box.childNodes[i];
        tile.className = 'cell';
        if (presenter.isRamrodPos(i)) {
            if (presenter.isWin()) {
                // collisionSymbol
                tile.innerHTML = "<span>&#128165;</span>";
            } else {
                // &#128371;
                // tile.innerHTML = "<span>&#128371;</span>";
                tile.innerHTML = "<span>&#128296;</span>";
            }
        } else if (presenter.isMousePos(i)) {
            if (settings.mouse) {
                const horseIndex = parseInt(settings.mouse, 10) - 1;
                const horseText = avMice[horseIndex];
                if (horseText) {
                    tile.innerHTML = `<span>${horseText}</span>`;
                }
            }
        } else {
            tile.innerHTML = ""
        }
    }
}

export default function game(window, document, settings) {

    const box = document.querySelector(".box");
    const message = document.querySelector(".message");
    const overlay = document.querySelector(".overlay");
    const close = document.querySelector(".close");
    const tada = document.getElementById("tada");

    document.documentElement.style.setProperty('--field-size', settings.size);

    const handlers = {
        'gameover': stub
    }

    const g = engine(settings.size, settings.mouse === 0);

    function onGameEnd() {
        const content = overlay.querySelector('.content');
        content.textContent = "За  " + numAndDeclOfNum(g.getMoveCount(), ['ход', 'хода', 'ходов']);
        overlay.classList.add('show');
        handlers['gameover'](g.getMoveCount());
        if (settings.sound) {
            playSound(tada);
        }
    }

    function drawWithAnimation() {
        draw(g, box, message, settings);
        if (g.isWin()) {
            // should never happen
            onGameEnd();
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
                }, 200)
            }
        }
        setTimeout(step, 200);
    }

    initField(g.size, 'cell', box, document);
    drawWithAnimation();

    const handleBox = function (evt) {
        const ind = handleClick(evt, box);
        if (g.tryMoveToIndex(ind)) {
            drawWithAnimation();
            if (!g.isWin()) {
                nextStep();
            }
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
    }
}
