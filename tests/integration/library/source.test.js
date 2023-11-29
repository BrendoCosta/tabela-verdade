import Source from '../../../src/library/source';
import Lexer from '../../../src/library/lexer';
import {
    Not,
} from '../../../src/library/tokens';

function createLexerFromString(string) {
    return new Lexer(new Source(string));
}

describe('Source', () => {
    it('Lexer should be able to skip source\'s characters while they are whitespaces characters', () => {
        const lexer = createLexerFromString('            ¬a  ');
        expect(lexer.next() instanceof Not).toBeTruthy();
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
});