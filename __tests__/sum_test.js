jest.unmock('../src/sum'); // unmock to use the actual implementation of sum

/* Do we need to keep this file/folder? */


describe('sum', () => {
    it('adds 1 + 2 to equal 3', () => {
        const sum = require('../src/sum');
        expect(sum(1, 2)).toBe(3);
    });
});
