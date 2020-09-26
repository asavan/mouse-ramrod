import {idealMouse} from "./idealMouse.js";

function randomIndex(length) {
    return Math.floor(Math.random() * length);
}

export function engine(size, useIdealMouse) {
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
    const iMouse = idealMouse(size);

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
        ++moveCount;
        if (useIdealMouse) {
            iswin = iMouse.hit(ramrod);
        } else {
            quasiMouse.hit(ramrod);
            showMousePos = true;
        }
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
