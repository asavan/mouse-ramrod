import {idealMouse} from "./idealMouse.js";
import quasiMouseFunc from "./quasiMouse.js";

export function engine(size, useIdealMouse) {
    let moveCount = 0;
    let isMouseMove = false;
    let ramrod = -1;
    let iswin = false;
    let showMousePos = false;
    const inField = (x) => x >= 0 && x < size;
    const quasiMouse = quasiMouseFunc(size);
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
        if (!isMouseMove) {
            console.log("Error");
            return;
        }
        ++moveCount;
        if (useIdealMouse) {
            iswin = iMouse.hit(ramrod);
        } else {
            iswin = quasiMouse.hit(ramrod);
            showMousePos = true;
        }
    }

    return {
        size: size,
        isWin: isWin,
        tryMoveToIndex: tryMoveToIndex,
        getMoveCount: getMoveCount,
        isRamrodPos: isRamrodPos,
        isMousePos: isMousePos,
        setShowMousePos: setShowMousePos,
        mouseMove: mouseMove
    }
}
