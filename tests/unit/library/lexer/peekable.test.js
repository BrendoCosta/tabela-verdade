import PeekableLexer from "../../../../src/library/lexer/peekable";

describe('Peekable', () => {
    it('wasPeeked returns true when peeked is not null', () => {
        const peekable = new PeekableLexer({});
        peekable.peeked = 'test'

        expect(peekable.wasPeeked()).toBe(true);
    });
    
    it('wasPeeked returns false when peeked is null', () => {
        const peekable = new PeekableLexer({});

        expect(peekable.wasPeeked()).toBe(false);
    });
    
    it('isPeekTypeOf returns false for incorrect type', () => {
        const peekable = new PeekableLexer({});
        peekable.peeked = 'test'

        expect(peekable.isPeekTypeOf(Number)).toBe(false);
    });
   
    it('take returns peeked value and resets peeked to null', () => {
        const peekable = new PeekableLexer({});
        peekable.peeked = '!';
        const result = peekable.take();

        expect(result).toBe('!');
        expect(peekable.peeked).toBeNull();
    });

});
