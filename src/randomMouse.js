"use strict";
function randomIndex(length) {
    return Math.floor(Math.random() * length);
}

export default function randomMouse(size) {
    const inField = (x) => x >= 0 && x < size;
    let posX = 2;
    const mouseDirections = [-1, 1];
    let lastMoveIndex = -1;
    const getPos = () => posX;
    const tryMove = (x) => {
        if (Math.abs(posX - x) <= 1) {
            if (inField(x)) {
                posX = x;
                return true;
            }
        }
        return false;
    }

    const move = function () {
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
    }
    return {getPos: getPos, tryMove: tryMove, move: move}
}
