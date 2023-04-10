// const test = require('test')


function add(a, b) {
    return a + b;
}

test('addiction', () => {
    expect(add(1, 2)).toBe(3);
});