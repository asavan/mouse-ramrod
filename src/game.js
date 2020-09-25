"use strict"; // jshint ;_;
import {playSound, numAndDeclOfNum, initField} from "./helper";

function stub() {
}


function randomIndex(length) {
    return Math.floor(Math.random() * length);
}


function engine(size) {
    let moveCount = 0;
    let isMouseMove = false;
    const inField = (x) => x >= 0 && x < size;
    let ramrod = -1;
    let iswin = false;
    let showMousePos = false;
    const quasiMouse = function () {
        let prevPos = 3;
        let positions = [2, 3];

        const add = (positions, p) => {
            if (inField(p)) {
                positions.push(p);
            }
        }

        const isFirstOrLast = (ind) => {
            return ind === 0 || ind === size;
        }

        const calcScore = (ind) => {
            if (!inField(ind)) return 0;
            if (isFirstOrLast(ind)) return 1;
            return 2;
        }

        const hit = function (r) {
            const candidates = positions.filter((c) => c !== r);
            let maxScore = 0;
            let maxInd = -1;
            ++moveCount;
            for (const c of candidates) {
                const newScore = calcScore(c-1) + calcScore(c+1);
                if (maxScore < newScore) {
                    maxScore = newScore;
                    maxInd = c;
                }
            }
            positions = [];
            if (maxScore === 0) {
                iswin = true;
                return;
            }
            prevPos = maxInd;
            add(positions, prevPos + 1);
            add(positions, prevPos - 1);
        }

        const getPrevPos = () => prevPos;
        const isWin = () => positions.length === 0;
        return {
            getPrevPos: getPrevPos,
            hit: hit,
            isWin: isWin
        }
    }();
    const mouse = function () {
        let posX = 2;
        const mouseDirections = [-1, 1];
        let lastMoveIndex = -1;
        const getPos = () => posX;
        const tryMove = (x) => {
            if (!isMouseMove) {
                return false;
            }

            if (Math.abs(posX - x) <= 1) {
                if (inField(x)) {
                    posX = x;
                    isMouseMove = true;
                    return true;
                }
            }
            return false;
        }

        const move = function () {
            if (!isMouseMove) {
                console.log("Error");
                return;
            }
            const availableInd = [];
            let ind = 0;
            for (const d of mouseDirections) {
                if (inField(posX + d)) {
                    availableInd.push(ind)
                }
                ++ind;
            }

            ind = availableInd[randomIndex(availableInd.length)];
            let d = mouseDirections[ind];
            lastMoveIndex = ind;
            posX = posX + d;
            ++moveCount;
            isMouseMove = false;
            ramrod = -1;
        }
        return {getPos: getPos, tryMove: tryMove, move: move}
    }();

    const getMoveCount = () => moveCount;

    const isWin = () => iswin;

    const tryMoveToIndex = (i) => {
        if (isMouseMove) {
            return false;
        }
        if (inField(i)) {
            ramrod = i;
            isMouseMove = true;
            return true;
        }
        return false;
    }

    const isRamrodPos = (i) => i === ramrod;
    const isMousePos = (i) => !iswin && showMousePos && i === quasiMouse.getPrevPos();
    const setShowMousePos = (b) => {
        showMousePos = b;
        isMouseMove = false;
        ramrod = -1;
    };
    const mouseMove = () => {
        quasiMouse.hit(ramrod);
        showMousePos = true;
    }

    return {
        size: size,
        mouse: mouse,
        isWin: isWin,
        tryMoveToIndex: tryMoveToIndex,
        getMoveCount: getMoveCount,
        isRamrodPos: isRamrodPos,
        isMousePos: isMousePos,
        setShowMousePos: setShowMousePos,
        mouseMove: mouseMove
    }
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

    const g = engine(settings.size);

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
