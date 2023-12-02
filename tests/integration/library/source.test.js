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
    });
});