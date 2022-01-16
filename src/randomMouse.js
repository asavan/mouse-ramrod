"use strict";
function randomIndex(length) {
    return Math.floor(Math.random() * length);
}

function randomElem(arr) {
    return arr[randomIndex(arr.length)];
}

export default function randomMouse(size) {
    const inField = (x) => x >= 0 && x < size;
    let posX = randomIndex(size);
    const mouseDirections = [-1, 1];
    const getPos = () => posX;
    const tryMove = (x) => {
        if (Math.abs(posX - x) === 1) {
            if (inField(x)) {
                posX = x;
                return true;
            }
        }
        return false;
    }

    const move = function () {
        const availablePos = [];
        for (const d of mouseDirections) {
            const new_pos = posX + d;
            if (inField(new_pos)) {
                availablePos.push(new_pos);
            }
        }
        posX = randomElem(availablePos);
    }
    return {getPos: getPos, tryMove: tryMove, move: move}
}
