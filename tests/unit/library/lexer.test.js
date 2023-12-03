import { assert } from 'console';
import Lexer, {isAlphabetic, isNumber, isWhiteSpace} from '../../../src/library/lexer';
import * as tokens from '../../../src/library/tokens';


it('Check number', () => {
    expect(isNumber('8')).toBe(true);
});

it('Check invalid number', () => {
    expect(isNumber('a')).toBe(false);
});

it('Check number limit inf', () => {
    expect(isNumber('0')).toBe(true);
});

it('Check number limit sup', () => {
    expect(isNumber('9')).toBe(true);
});

it('Check negative number', () => {
    expect(isNumber('-8')).toBe(false);
});

it('Check double digit number', () => {
    expect(isNumber('10')).toBe(false);
});

it('Check LowerCase alphabetic', () => {
    expect(isAlphabetic('m')).toBe(true);
});

it('Check invalid alphabetic', () => {
    expect(isAlphabetic('1')).toBe(false);
});

it('Check invalid alphabetic symb', () => {
    expect(isAlphabetic('*')).toBe(false);
});

it('Check invalid alphabetic symb {', () => {
    expect(isAlphabetic('{')).toBe(false);
});


it('Check LowerCase alphabetic a', () => {
    expect(isAlphabetic('a')).toBe(true);
});

it('Check LowerCase alphabetic z', () => {
    expect(isAlphabetic('z')).toBe(true);
});

it('Check UpperCase alphabetic A', () => {
    expect(isAlphabetic('A')).toBe(true);
});

it('Check UpperCase alphabetic Z', () => {
    expect(isAlphabetic('Z')).toBe(true);
});

it('Check UpperCase alphabetic', () => {
    expect(isAlphabetic('M')).toBe(true);
});

it('Check Whitespace', () => {
    expect(isWhiteSpace('\x20')).toBe(true);
});

it('Check not whitespace', () => {
    expect(isWhiteSpace('\p')).toBe(false);
});

it('Check Next not()', () => {
    const lx = new Lexer({
        skipWhile(){},

        peek(){
            return '!'
        },

        bump(){}
    }) 
    const output = lx.next()
    expect(output).toBeInstanceOf(tokens.Not);
});

it('Check Next And()', () => {
    const lx = new Lexer({
        skipWhile(){},

        peek(){
            return '&'
        },

        bump(){}
    }) 
    const output = lx.next()
    expect(output).toBeInstanceOf(tokens.And);
});

it('Check Next Or()', () => {
    const lx = new Lexer({
        skipWhile(){},

        peek(){
            return '|'
        },

        bump(){}
    }) 
    const output = lx.next()
    expect(output).toBeInstanceOf(tokens.Or);
});

it('Check Next Conditional()', () => {
    const lx = new Lexer({
        skipWhile(){},

        peek(){
            return '→'
        },

        bump(){}
    }) 
    const output = lx.next()
    expect(output).toBeInstanceOf(tokens.Conditional);
});

it('Check Next Biconditional()', () => {
    const lx = new Lexer({
        skipWhile(){},

        peek(){
            return '↔'
        },

        bump(){}
    }) 
    const output = lx.next()
    expect(output).toBeInstanceOf(tokens.Biconditional);
});

it('Check Next OpeningParenthesis()', () => {
    const lx = new Lexer({
        skipWhile(){},

        peek(){
            return '('
        },

        bump(){}
    }) 
    const output = lx.next()
    expect(output).toBeInstanceOf(tokens.OpeningParenthesis);
});

it('Check Next ClosingParenthesis()', () => {
    const lx = new Lexer({
        skipWhile(){},

        peek(){
            return ')'
        },

        bump(){}
    }) 
    const output = lx.next()
    expect(output).toBeInstanceOf(tokens.ClosingParenthesis);
});

it('Check Next End()', () => {
    const lx = new Lexer({
        skipWhile(){},

        peek(){},

        bump(){}
    }) 
    const output = lx.next()
    expect(output).toBeInstanceOf(tokens.End);
});

it('Check Next Biconditional() <->', () => {
    const lx = new Lexer({
        offset: 0,
        
        skipWhile(){},

        peek(){
            return '<->'[this.offset]
        },

        bump(){ this.offset++}
    }) 
    const output = lx.next()
    expect(output).toBeInstanceOf(tokens.Biconditional);
});

it('Check Next Conditional() <->', () => {
    const lx = new Lexer({
        offset: 0,
        
        skipWhile(){},

        peek(){
            return '->'[this.offset]
        },

        bump(){ this.offset++}
    }) 
    const output = lx.next()
    expect(output).toBeInstanceOf(tokens.Conditional);
});

it('Check Next empty', () => {
    const lx = new Lexer({
        skipWhile(){},

        peek(){
            
        },

        bump(){}
    }) 
    const output = lx.next()
    expect(output).toBeInstanceOf(tokens.End);
});

it('Check Next Biconditional() <a>', () => {
    const lx = new Lexer({
        offset: 0,
        
        skipWhile(){},

        peek(){
            return '<a>'[this.offset]
        },

        bump(){ this.offset++}
    }) 
    expect(() => {lx.next()}).toThrow('Unexpected character');
    //const output = lx.next()
    //expect(output).not.toBeInstanceOf(tokens.Biconditional);
});