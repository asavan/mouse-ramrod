import test from 'ava';
import quasiMouse from "../src/quasiMouse";

function testFunc(t, hits, expected) {
    const mouse = quasiMouse(3);
    for (const h of hits) {
        mouse.hit(h - 1);
    }
    t.deepEqual(mouse.getPrevPos(), expected);
}


test('hit in 3', (t) => {
    const hits = [3];
    testFunc(t, hits, 1);
});
