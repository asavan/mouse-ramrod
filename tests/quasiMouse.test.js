import test from "node:test";
import assert from "node:assert/strict";

import quasiMouse from "../src/js/quasiMouse.js";

function testFunc(t, hits, expected) {
    const mouse = quasiMouse(3);
    for (const h of hits) {
        mouse.hit(h - 1);
    }
    assert.deepStrictEqual(mouse.getPrevPos(), expected);
}

test("hit in 3", (t) => {
    const hits = [3];
    testFunc(t, hits, 1);
});
