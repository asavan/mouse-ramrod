export default function engine(size, mouseFunc) {
    let moveCount = 0;
    let isMouseMove = false;
    let ramrod = -1;
    let iswin = false;
    let showMousePos = false;
    const inField = (x) => x >= 0 && x < size;
    const iMouse = mouseFunc(size);

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
    const isMousePos = (i) => showMousePos && iMouse.isMousePos(i);

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
        iswin = iMouse.hit(ramrod);
        showMousePos = true;
    }

    return {
        isWin: isWin,
        tryMoveToIndex: tryMoveToIndex,
        getMoveCount: getMoveCount,
        isRamrodPos: isRamrodPos,
        isMousePos: isMousePos,
        setShowMousePos: setShowMousePos,
        mouseMove: mouseMove
    }
}
