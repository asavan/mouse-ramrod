"use strict";

import settings from "./js/settings.js";
import gameFunction from "./js/game.js";
import {starter} from "./js/helper.js";
import {install} from "netutils";

// eslint-disable-next-line no-undef
if (__USE_SERVICE_WORKERS__) {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js", {scope: "./"});
        install(window, document, settings);
    }
}

starter(window, document, settings, gameFunction);
