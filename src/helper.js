"use strict";

export function install(window, document, settings) {
    const btnAdd = document.getElementById("butInstall");
    let deferredPrompt = null;
    btnAdd.addEventListener("click", (e) => {
        e.preventDefault();
        // hide our user interface that shows our A2HS button
        // btnAdd.setAttribute('disabled', true);
        btnAdd.classList.add("hidden");
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((resp) => {
            console.log(JSON.stringify(resp));
        });
    });

    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (settings && settings.install) {
            btnAdd.classList.remove("hidden");
        }
    });
}

function stringToBoolean(string){
    switch(string.toLowerCase().trim()){
    case "true": case "yes": case "1": return true;
    case "false": case "no": case "0": case null: return false;
    default: return Boolean(string);
    }
}

function starter(window, document, settings, f) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (const [key, value] of urlParams) {
        if (typeof settings[key] === "number") {
            settings[key] = parseInt(value, 10);
        } else if (typeof settings[key] === "boolean") {
            settings[key] = stringToBoolean(value);
        } else {
            settings[key] = value;
        }
    }
    const g = f(window, document, settings);
    g.on("gameover", (/*score*/) => {
        const btnAdd = document.getElementById("butInstall");
        btnAdd.classList.remove("hidden2");
    });
}

function launch(f, window, document, settings, afterUrlParse) {
    if (document.readyState !== "loading") {
        f(window, document, settings, afterUrlParse);
    } else {
        document.addEventListener("DOMContentLoaded", function () {
            f(window, document, settings, afterUrlParse);
        });
    }
}

export function launchWithUrlParse(window, document, settings, afterUrlParse) {
    launch(starter, window, document, settings, afterUrlParse);
}

export function playSound(elem) {
    if (!elem) return;
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
