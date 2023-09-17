"use strict";

import settings from "./settings.js";
import gameFunction from "./game.js";
import {install, launchWithUrlParse} from "./helper.js";

// eslint-disable-next-line no-undef
if (__USE_SERVICE_WORKERS__) {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js", {scope: "./"});
        install(window, document, settings);
    }
}

launchWithUrlParse(window, document, settings, gameFunction);
