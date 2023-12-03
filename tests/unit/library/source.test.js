import Source from '../../../src/library/source';

describe('Source', () => {
    it('Should create a string span at specified range', () => {
        const source = new Source('abcdefg');

        expect(source.span(2, 4)).toBe('cd');
    });

    it('Should return the lower half the string', () => {
        const text = '(a & b) | (b | c)';
        const source = new Source(text);
        expect(source.span(0, 8)).toEqual('(a & b) ');
    });

    it('Should return the upper half the string', () => {
        const text = '(a & b) | (b | c)';
        const source = new Source(text);
        expect(source.span(8, 17)).toEqual('| (b | c)');
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

    it('Should increment offset after bump', () => {
        const source = new Source("abcd");
        source.bump();
        expect(source.offset).toEqual(1);
    });

    it('Should bump when skipWhile argument evaluates to true', () => {
        const text = 'a & b';
        const source = new Source(text);
        source.skipWhile(char => char == 'a' || char == '&' || char == 'b' || char == ' ');
        expect(source.offset).toEqual(5);
    });

    it('Should not bump when skipWhile argument evaluates to false', () => {
        const text = 'a & b';
        const source = new Source(text);
        source.skipWhile(char => false);
        expect(source.offset).toEqual(0);
    });

    it('Should return the entire alphabetic character sequence', () => {
        const text = 'anExampleName1996 & b';
        const source = new Source(text);
        const regexExpession = new RegExp('[a-z]', 'i'); // Lower case alphabetic characters, case (i)nsensitive
        let result = source.takeWhile(char => regexExpession.test(char));
        expect(result).toEqual('anExampleName');
    });

    it.each([
        ["兄弟 & 妹", "兄"],
        ["형제 | 자매", "형"],
        ["брат & !сестра", "б"],
        ["🍮 -> 😁", "🍮"]
    ])('Should be able to peek Unicode characters', (input, expected) => {
        let source = new Source(input);
        expect(source.peek()).toEqual(expected);
    });

    it.each([
        ["兄弟 & 妹", "弟"],
        ["형제 | 자매", "제"],
        ["брат & !сестра", "р"],
        ["🍕🍫 -> 😁", "🍫"]
    ])('Should be able to bump Unicode characters', (input, expected) => {
        let source = new Source(input);
        source.bump();
        expect(source.peek()).toEqual(expected);
    });

    it('Should call bump after skipWhile with a function returning true', () => {

        const source = new Source('wwwxyz');
        const spy = vi.spyOn(source, 'bump');
        source.skipWhile(ch => {
            return ch === 'w';
        });
        expect(spy).toHaveBeenCalledTimes(3);

    });

    it('Should not call bump after skipWhile with a function returning false', () => {

        const source = new Source('wwwxyz');
        const spy = vi.spyOn(source, 'bump');
        source.skipWhile(ch => {
            return ch === '2';
        });
        expect(spy).toHaveBeenCalledTimes(0);

    });

})