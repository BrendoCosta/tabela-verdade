import { AndExpression, OrExpression, NameExpression } from "../../../src/library/expressions";
import Parser from "../../../src/library/parser";
import { Name, And, Or, End, Conditional } from "../../../src/library/tokens";

class StubLexer {
    constructor (tokens) {
        this.index = 0;
        this.tokens = tokens;
    }

    peek () {
        return this.tokens[this.index];
    }

    next () {
        return this.tokens[this.index++];
    }

    isPeekTypeOf (clazz) {
        return this.tokens[this.index] instanceof clazz;
    }
}

describe('Parser', () => {
    it('Should parse name expression', () => {
        const parser = new Parser(new StubLexer([
            new Name('x'),
            new End(),
        ]));

        expect(parser.parse()).toEqual(new NameExpression('x'),);
    });


    it('Should parse and expression', () => {
        const parser = new Parser(new StubLexer([
            new Name('a'),
            new And(),
            new Name('b'),
            new End(),
        ]));

        expect(parser.parse()).toEqual(new AndExpression(
            new NameExpression('a'),
            new NameExpression('b')
        ));
    });

    it('Should parse or expression', () => {
        const parser = new Parser(new StubLexer([
            new Name('a'),
            new Or(),
            new Name('b'),
            new End(),
        ]));

        expect(parser.parse()).toEqual(new OrExpression(
            new NameExpression('a'),
            new NameExpression('b')
        ));
    });

    it('Should not parse without end token', () => {
        const parser = new Parser(new StubLexer([
            new Name('a'),
            new Conditional(),
            new Name('b'),
        ]));

        expect(() => parser.parse()).toThrow('Expected end');
    });
});