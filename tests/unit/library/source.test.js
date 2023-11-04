import Source from '../../../src/library/source';

describe('Source', () => {
    it('Should create a string span at specified range', () => {
        const source = new Source('abcdefg');

        expect(source.span(2, 4)).toBe('cd');
    });

    it('Should return the lower half the string', () => {
        const text = '(a & b) | (b | c)';
        const source = new Source(text);
        expect(source.span(0, Math.floor((text.length - 1) / 2))).toEqual('(a & b) ');
    });

    it('Should peek character after being bumped', () => {
        const source = new Source('hi');

        source.bump();

        expect(source.peek()).toBe('i');
    });

    it('Should take while character is `a`', () => {
        const source = new Source('aaaabbbb');

        expect(source.takeWhile(ch => {
            return ch === 'a';
        })).toBe('aaaa');
    });

    it('Should skip while character is `w`', () => {
        const source = new Source('wwwxyz');

        source.skipWhile(ch => {
            return ch === 'w';
        });

        expect(source.peek()).toBe('x');
    });

    it('Should skip while character is a white space', () => {
        const text = '                   a & b';
        const source = new Source(text);
        source.skipWhile(char => (char === ' '));
        expect(source.peek()).toEqual('a');
    });

    it('Should return the entire alphabetic character sequence', () => {
        const text = 'anExampleName1996 & b';
        const source = new Source(text);
        const regexExpession = new RegExp('[a-z]', 'i'); // Lower case alphabetic characters, case (i)nsensitive
        let result = source.takeWhile(char => regexExpession.test(char));
        expect(result).toEqual('anExampleName');
    });

})