"use strict";
export default function quasiMouse(size) {
    const inField = (x) => x >= 0 && x < size;
    let prevPos = size-1;
    let positions = [Math.floor((size-1)/2), Math.floor((size-1)/2) + 1];

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
        const candidates = positions.filter((c) => (c !== r) && inField(c));
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
            return true;
        }
        prevPos = maxInd;
        add(positions, prevPos + 1);
        add(positions, prevPos - 1);
        return false;
    }

    const getPrevPos = () => prevPos;
    const isWin = () => positions.length === 0;
    return {
        getPrevPos: getPrevPos,
        hit: hit,
        isWin: isWin
    }
}
