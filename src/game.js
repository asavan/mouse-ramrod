"use strict"; // jshint ;_;
function stub() {
}


function randomIndex(length) {
    return Math.floor(Math.random() * length);
}

const playSound = (elem) => {
    if (!elem) return;
    elem.play();
}

function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function numAndDeclOfNum(number, titles) {
    return number + " " + declOfNum(number, titles);
}

function engine(size) {
    let moveCount = 0;
    let isMouseMove = true;
    const inField = (x) => x >= 0 && x < size;
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
        }
        return {getPos: getPos, tryMove: tryMove, move: move}
    }();
    let ramrod = -1;

    const getMoveCount = () => moveCount;

    const isWin = () => mouse.getPos() === ramrod && isMouseMove;

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
    const isMousePos = (i) => i === mouse.getPos();

    return {
        size: size,
        mouse: mouse,
        isWin: isWin,
        tryMoveToIndex: tryMoveToIndex,
        getMoveCount: getMoveCount,
        isRamrodPos: isRamrodPos,
        isMousePos: isMousePos
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
            tile.innerHTML = "<span>&#128296;</span>";
            tile.classList.add('flip');
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

    const box = document.getElementsByClassName("box")[0];
    const message = document.querySelector(".message");
    const overlay = document.getElementsByClassName("overlay")[0];
    const close = document.getElementsByClassName("close")[0];
    const tada = document.getElementById("tada");

    document.documentElement.style.setProperty('--field-size', settings.size);

    const handlers = {
        'playerMove': stub,
        'enemyMove': stub,
        'meMove': stub,
        'aiMove': stub,
        'aiHint': stub,
        'gameover': stub
    }

    function initField(fieldSize, className, elem) {
        for (let i = 0; i < fieldSize; i++) {
            const cell = document.createElement('div');
            cell.className = className;
            elem.appendChild(cell);
        }
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
            g.mouse.move();
            drawWithAnimation();
        }
        setTimeout(step, 200);
    }

    initField(g.size, 'cell', box);
    drawWithAnimation();
    nextStep();

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
