import Source from '../../../src/library/source';

describe('Source', () => {
    describe('Input', () => {
        it('Should support slicing', () => {
            let source = new Source("a & b");
            expect(source.input.slice).toBeInstanceOf(Function);
        });

        it('Should support slicing by two arguments', () => {
            let source = new Source("a & b");
            expect(source.input.slice.length).toBe(2);
        });

        it('Should support slicing given two arguments', () => {
            let source = new Source("a & b");
            expect(source.input.slice(0, 3)).toEqual("a &");
        });

        it('Should support indexing', () => {
            let source = new Source("a & b");
            expect(source.input[2]).toEqual("&");
        });

        it('Should support the length determination', () => {
            let source = new Source("a & b");
            expect(source.input.length).toBe(5);
        });

        it('Should support iterators through the default protocol', () => {
            let source = new Source("a & b");
            expect(source.input[Symbol.iterator]).toBeInstanceOf(Function);
            expect(source.input[Symbol.iterator]()).toMatchObject({
                next: expect.any(Function)
            });
        });

        it('Should be iterable through the default statement', () => {
            let source = new Source("ab cdefghi jk");
            let i = 0;
            for (let character of source.input) {
                expect(character).toEqual(source.input[i]);
                i++;
            }
        });

        /*it('Should support iteration through Unicode characters', () => {
            let source = new Source("ab cde🍕fghi🍫jk");
            let i = 0;
            for (let character of source.input) {
                expect(character).toEqual(source.input[i]);
                i++;
            }
        });*/

        it('Should support the well-known iterating object protocol', () => {
            let source = new Source("a & b");
            let iterator = source.input[Symbol.iterator]();
            expect(iterator.next()).toMatchObject({
                done: expect.any(Boolean),
                value: expect.any(String)
            });
        });
    });
});