import {idealMouse} from "./idealMouse.js";
import test from 'ava';

function testFunc(t, hits, expected) {
    const mouse = idealMouse(5);
    for (const h of hits) {
        mouse.hit(h - 1);
    }
    t.deepEqual(mouse.getPositions(), expected);
}


test('one position left', (t) => {
    const hits = [2, 3, 4, 2, 3];
    testFunc(t, hits, [3]);
});

test('two hits', (t) => {
    const hits = [2, 2];
    testFunc(t, hits, [2,4,1,3]);
});

test('four hits', (t) => {
    const hits = [2, 2, 3, 3];
    testFunc(t, hits, [2,4,1,3]);
});

test('mouse not dead', (t) => {
    const hits = [2,2,4,4,4,3,3,2];
    testFunc(t, hits, [2, 4, 1, 3]);
});

test('mouse not dead2', (t) => {
    const hits = [2,2,4,4,4,2];
    testFunc(t, hits, [2, 4, 1, 3]);
});

test('mouse dead', (t) => {
    const hits = [2,3,4,4,2,4,3,2];
    testFunc(t, hits, []);
});


test('mouse not dead4', (t) => {
    const hits = [4,4,2,2,2,3,3,4];
    testFunc(t, hits, [0, 2, 1, 3]);
});

test('mouse dead1', (t) => {
    const hits = [2,3,4,2,3,4];
    testFunc(t, hits, []);
});
//
//
//
test('mouse dead2', (t) => {
    const hits = [2, 3, 4, 4, 3, 2];
    testFunc(t, hits, []);
});
