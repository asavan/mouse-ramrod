"use strict";
export default function quasiMouse(size) {
    const inField = (x) => x >= 0 && x < size;
    let prevPos = Math.floor((size - 1) / 2);
    let positions = [];

    const add = (positions, p) => {
        if (inField(p)) {
            positions.push(p);
        }
    };
    add(positions, prevPos);
    add(positions, prevPos + 1);

    const isFirstOrLast = (ind) => ind === 0 || (ind === (size - 1));

    const calcScore = (ind) => {
        if (!inField(ind)) {
            return 0;
        }
        if (isFirstOrLast(ind)) {
            return 1;
        }
        return 2;
    };

    const hit = function (r) {
        const candidates = positions.filter((c) => (c !== r));
        let maxScore = 0;
        let maxInd = -1;

        for (const c of candidates) {
            const newScore = calcScore(c - 1) + calcScore(c + 1);
            if (maxScore < newScore) {
                maxScore = newScore;
                maxInd = c;
            }
        }
        positions = [];
        if (maxScore === 0) {
            prevPos = r;
            return true;
        }
        prevPos = maxInd;
        add(positions, prevPos + 1);
        add(positions, prevPos - 1);
        return false;
    };

    const getPrevPos = () => prevPos;
    const isWin = () => positions.length === 0;
    const isMousePos = (i) => i === getPrevPos();
    return {
        getPrevPos: getPrevPos,
        hit: hit,
        isWin: isWin,
        isMousePos: isMousePos
    };
}
