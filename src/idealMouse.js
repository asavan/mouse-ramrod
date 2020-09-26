export function idealMouse(size) {
    const inField = (x) => x >= 0 && x < size;
    let positions = [];
    for (let i = 0; i < size; ++i) {
        positions.push(i);
    }
    let hits = [];
    const add = (positions, p) => {
        if (inField(p)) {
            if (!positions.includes(p)) {
                positions.push(p);
            }
        }
    }
    const hit = (r) => {
        hits.push(r);
        const candidates = positions.filter((c) => c !== r);
        const newPositions = [];
        for (const c of candidates) {
            add(newPositions, c - 1);
            add(newPositions, c + 1);
        }
        positions = newPositions;
        return positions.length === 0;
    }
    const getPositions = () => positions;
    return {
        hit: hit,
        getPositions: getPositions
    }
}
