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

export function initField(fieldSize, className, elem, document) {
    for (let i = 0; i < fieldSize; i++) {
        const cell = document.createElement("div");
        cell.className = className;
        const num = i + 1;
        cell.dataset.num = num;
        elem.appendChild(cell);
    }
}
