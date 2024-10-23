import idealMouse from "../src/js/idealMouse.js";
import test from "ava";

function testFunc(t, hits, expected) {
    const mouse = idealMouse(5);
    for (const h of hits) {
        mouse.hit(h - 1);
    }
    t.deepEqual(mouse.getPositions().map(i => i+1).sort(), expected);
}

test("one position left", (t) => {
    const hits = [2, 3, 4, 2, 3];
    testFunc(t, hits, [4]);
});

test("two hits", (t) => {
    const hits = [2, 2];
    testFunc(t, hits, [2, 3, 4, 5]);
});

test("four hits", (t) => {
    const hits = [2, 2, 3, 3];
    testFunc(t, hits, [2, 3, 4, 5]);
});

test("mouse not dead1", (t) => {
    const hits = [2, 2, 4, 4, 4, 3, 3, 2];
    testFunc(t, hits, [2, 3, 4, 5]);
});

test("mouse not dead2", (t) => {
    const hits = [2, 2, 4, 4, 4, 2];
    testFunc(t, hits, [2, 3, 4, 5]);
});

test("mouse not dead4", (t) => {
    const hits = [4, 4, 2, 2, 2, 3, 3, 4];
    testFunc(t, hits, [1, 2, 3, 4]);
});

// dead
test("mouse dead1", (t) => {
    const hits = [2, 3, 4, 2, 3, 4];
    testFunc(t, hits, []);
});

test("mouse dead2", (t) => {
    const hits = [2, 3, 4, 4, 3, 2];
    testFunc(t, hits, []);
});

test("mouse dead3", (t) => {
    const hits = [2, 3, 4, 4, 2, 4, 3, 2];
    testFunc(t, hits, []);
});
