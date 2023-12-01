import Source from '../../../src/library/source';
import Lexer from '../../../src/library/lexer';
import {
    End,
    Not,
} from '../../../src/library/tokens';

function createLexerFromString(string) {
    return new Lexer(new Source(string));
}

describe('Source', () => {
    it('Lexer should be able to skip source\'s characters while they are whitespaces characters', () => {
        const lexer = createLexerFromString('            ¬a  ');
        expect(lexer.next()).toBeInstanceOf(Not);
    });

    it('Lexer should be able to bump source', () => {
        const lexer = createLexerFromString('            ¬a  ');
        lexer.next();
        expect(lexer.source.peek()).toEqual('a');
    });

    it('Lexer should be able to take source\'s characters while they are alphabetic characters', () => {
        const lexer = createLexerFromString('  somename  ');
        expect(lexer.next().name).toEqual('somename');
    });

    it('Lexer should return an End token after consuming all source\'s characters', () => {
        const lexer = createLexerFromString('a & b');
        lexer.source.peek = () => null;
        expect(lexer.next()).toBeInstanceOf(End);
        lexer.source.peek = () => undefined;
        expect(lexer.next()).toBeInstanceOf(End);
    });
});