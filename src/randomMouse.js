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
    let prevPos = -1;
    const mouseDirections = [-1, 1];
    const getPos = () => posX;
    const hit = function (i) {
        prevPos = posX;
        if (i === posX) {
            return true;
        }
        const availablePos = [];
        for (const d of mouseDirections) {
            const new_pos = posX + d;
            if (inField(new_pos)) {
                availablePos.push(new_pos);
            }
        }
        if (availablePos.length === 0) {
            return true;
        }
        posX = randomElem(availablePos);
        return false;
    }
    const isMousePos = (i) => i === prevPos;
    return {getPos: getPos, hit: hit, isMousePos: isMousePos}
}
