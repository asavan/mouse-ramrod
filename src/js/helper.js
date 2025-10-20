import {addSettingsButton, parseSettings} from "netutils";

export function starter(window, document, settings, f) {
    parseSettings(window.location.search, settings);
    addSettingsButton(document, settings);
    const g = f(window, document, settings);
    g.on("gameover", (/*score*/) => {
        const btnAdd = document.getElementById("butInstall");
        btnAdd.classList.remove("hidden2");
    });
}

export function playSound(elem) {
    console.log("play", elem);
    if (!elem) {
        return;
    }
    elem.play();
}

function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

export function numAndDeclOfNum(number, titles) {
    return number + " " + declOfNum(number, titles);
}

export function initField(fieldSize, className, elem, document) {
    for (let i = 0; i < fieldSize; i++) {
        const cell = document.createElement("div");
        cell.className = className;
        elem.appendChild(cell);
    }
}
