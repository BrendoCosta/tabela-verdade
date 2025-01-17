import { expect } from 'vitest';
import NamesExchanger from '../../../../../src/library/generator/names/exchanger';

describe('Name exchanger', () => {
    it('Should accept an empty list of names', () => {
        const exchanger = new NamesExchanger();

        expect(exchanger.exchange([])).toEqual([]);
    });

    it('Should exchange values', () => {
        const exchanger = new NamesExchanger();

        expect(exchanger.exchange(['a', 'b', 'c'])).toStrictEqual([
            {a: true, b: true, c: true},
            {a: true, b: true, c: false},
            {a: true, b: false, c: true},
            {a: true, b: false, c: false},
            {a: false, b: true, c: true},
            {a: false, b: true, c: false},
            {a: false, b: false, c: true},
            {a: false, b: false, c: false},
        ]);
    });
});
