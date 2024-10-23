"use strict";

import settings from "./js/settings.js";
import gameFunction from "./js/game.js";
import {install, launchWithUrlParse} from "./js/helper.js";

// eslint-disable-next-line no-undef
if (__USE_SERVICE_WORKERS__) {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js", {scope: "./"});
        install(window, document, settings);
    }
}

launchWithUrlParse(window, document, settings, gameFunction);
