export default class Source {
    constructor (input) {
        this.offset = 0;
        this.input = input;
    }

    span (start, end) {
        return this.input.slice(
            start,
            end,
        );
    }

    peek () {
        return [...this.input][this.offset];
    }

    bump () {
        this.offset += 1;
    }

    takeWhile (fn) {
        const start = this.offset;

        this.skipWhile(fn);

        const end = this.offset;

        return this.span(
            start,
            end,
        );
    }

    skipWhile (fn) {
        while (fn(this.peek())) {
            this.bump();
        }
    }
}
