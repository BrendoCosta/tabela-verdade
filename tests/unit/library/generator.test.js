import { BiconditionalExpression, OrExpression, NameExpression } from '../../../src/library/expressions';
import Generator from '../../../src/library/generator';

describe('Generator', () => {
    it('Should not generate table if expression is null', () => {
        const generator = new Generator({
            parse () {
                return null;
            }
        });

        expect(() => generator.generate())
            .toThrowError('Unexpected expression');
    });

    it('Should generate table for a single name expression', () => {
        const generator = new Generator({
            parse () {
                return new NameExpression('x');
            }
        });

        expect(generator.generate()).toEqual([
            ['x'],
            [
                [true],
                [false],
            ]
        ]);
    });

    it('Should generate table the whole expression', () => {
        const generator = new Generator({
            parse () {
                return new BiconditionalExpression(
                    new NameExpression('x'),
                    new OrExpression(
                        new NameExpression('y'),
                        new NameExpression('z'),
                    ),
                );
            }
        });

        expect(generator.generate()).toEqual([
            ['x', 'y', 'z', 'y ∨ z', 'x ↔ (y ∨ z)'],
            [
                [true, true, true, true, true],
                [true, true, false, true, true],
                [true, false, true, true, true],
                [true, false, false, false, false],
                [false, true, true, true, false],
                [false, true, false, true, false],
                [false, false, true, true, false],
                [false, false, false, false, true]]
        ]);
    });
})