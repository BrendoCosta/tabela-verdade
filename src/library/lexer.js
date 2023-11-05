import {
    LOGICAL_NOT,
    TILDE,
    EXCLAMATION,

    CARET,
    ASTERISK,
    AMPERSAND,
    LOGICAL_AND,

    PLUS,
    VERTICAL_LINE,
    LOGICAL_OR,

    RIGHTWARDS_ARROW,
    RIGHTWARDS_DOUBLE_ARROW,

    LEFT_RIGHT_ARROW,
    LEFT_RIGHT_DOUBLE_ARROW,

    OPENING_PARENTHESIS,
    CLOSING_PARENTHESIS,
} from './characters';

import {
    Name,

    Not,
    And,
    Or,

    Conditional,
    Biconditional,

    OpeningParenthesis,
    ClosingParenthesis,

    End,
} from './tokens';

export function isWhiteSpace (ch) {
    // New line
    return ch === '\n' ||
    // Return
            ch === '\r' ||
    // Return
            ch === '\t' ||
    // Tab
            ch === '\v' ||
    // Vertical tab
            ch === '\b' ||
    // Backspace
            ch === '\f' ||
    // Form feed
            ch === '\x20' ||
    // Space
            ch === '\xA0';
    // No-break space
}

export function isNumber (ch) {
    // eslint-disable-next-line no-magic-numbers
    return (typeof ch === 'string' && ch.length === 1) && (ch >= '0' && ch <= '9');
}

export function isAlphabetic (ch) {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
}

export default class Lexer {
    constructor (source) {
        this.source = source;
    }

    // eslint-disable-next-line max-lines-per-function, max-statements, complexity
    next () {
        this.source.skipWhile(isWhiteSpace);

        const ch = this.source.peek();

        switch (ch) {
            case TILDE:
            case EXCLAMATION:
            case LOGICAL_NOT:
                this.source.bump();

                return new Not();

            case CARET:
            case ASTERISK:
            case AMPERSAND:
            case LOGICAL_AND:
                this.source.bump();

                return new And();

            case PLUS:
            case VERTICAL_LINE:
            case LOGICAL_OR:
                this.source.bump();

                return new Or();

            case RIGHTWARDS_ARROW:
            case RIGHTWARDS_DOUBLE_ARROW:
                this.source.bump();

                return new Conditional();

            case LEFT_RIGHT_ARROW:
            case LEFT_RIGHT_DOUBLE_ARROW:
                this.source.bump();

                return new Biconditional();

            case OPENING_PARENTHESIS:
                this.source.bump();

                return new OpeningParenthesis();

            case CLOSING_PARENTHESIS:
                this.source.bump();

                return new ClosingParenthesis();

            default:
                if (ch === null || ch === undefined) {
                    return new End();
                }

                if (ch === '<') {
                    this.source.bump();

                    if (this.source.peek() === '-') {
                        this.source.bump();

                        if (this.source.peek() === '>') {
                            this.source.bump();

                            return new Biconditional();
                        }
                    }
                } else if (ch === '-') {
                    this.source.bump();

                    if (this.source.peek() === '>') {
                        this.source.bump();

                        return new Conditional();
                    }
                } else if (isAlphabetic(ch)) {
                    // eslint-disable-next-line no-shadow
                    const name = this.source.takeWhile((ch) => isAlphabetic(ch) || isNumber(ch));

                    return new Name(name);
                }

                throw new Error('Unexpected character');
        }
    }
}
