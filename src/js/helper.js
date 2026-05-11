import {addSettingsButton, detectLangByBrowser, parseSettings, translator} from "netutils";

function localeLoader() {
    return {
        "en": async () => {
            const module = await import("../locales/en.json", {
                with: {
                    type: "json"
                }
            });
            return module.default;
        },
        "ru": async () => {
            const module = await import("../locales/ru.json", {
                with: {
                    type: "json"
                }
            });
            return module.default;
        }
    };
}

export function starter(window, document, settings, f) {
    parseSettings(window.location.search, settings);
    addSettingsButton(document, settings);
    settings.lang = settings.lang || detectLangByBrowser(window);

    const trans = translator(settings.lang, localeLoader());

    const g = f(window, document, settings, trans);
    g.on("gameover", (/*score*/) => {
        const btnAdd = document.getElementById("butInstall");
        btnAdd.classList.remove("hidden2");
    });
}
