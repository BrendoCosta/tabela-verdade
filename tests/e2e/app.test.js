import { test, expect } from '@playwright/test';
import enUS from '~/locales/en-us';

test.beforeEach(({ page }) => page.goto('/'));

async function getTableData(page) {
    const rowsLocator = await page.locator('tbody').locator('tr');
    const rowData = [];
    for (let i = 0; i < await rowsLocator.count(); i++) {
        const cellsLocator = await rowsLocator.nth(i).locator('td');
        const cellData = [];
        for (let j = 0; j < await cellsLocator.count(); j++) {
            cellData.push(await cellsLocator.nth(j).getAttribute('data-value') == 'true');
        }
        rowData.push(cellData);
    }
    return rowData;
}

test('Expression input border should become red when the user enter a invalid input values', async ({ page }) => {
    const invalidInputsCases = [
        '🍎 & 🍌',
        '白 & 黒',
        '123 & 456',
        'a b &',
        '5',
        '🍎',
        ' '
    ];
    for (const testCase of invalidInputsCases) {
        const input = page.getByRole('textbox');
        await input.fill(testCase);
        await expect(input).toHaveClass(/border-red-500/);
    }
});

test('Expression input border should turn to primary color when the user enter a valid input values', async ({ page }) => {
    const validInputCases = [
        '                  a & b',
        '          a &    b          ',
        'a           & b',
        'a & b',
        '(a & b)',
        '(a & b) & c',
        '(a | b) -> c',
        '(a ^ b) -> (c)'
    ];
    for (const testCase of validInputCases) {
        const input = page.getByRole('textbox');
        await input.fill(testCase);
        await expect(input).toHaveClass(/border-primary/);
    }
});

test('Click on operators\' buttons should display them at input textbox', async ({ page }) => {
    const operatorsCases = [
        '~',
        '!',
        '¬',
        '^',
        '*',
        '&',
        '∧',
        '+',
        '|',
        '∨',
        '→',
        '⇒',
        '↔',
        '⇔'
    ];
    for (const testCase of operatorsCases) {
        const button = page.locator(`[data-operator="${testCase}"]`);
        await button.click();
        const input = page.getByRole('textbox');
        await expect(await input.inputValue()).toEqual(testCase);
        await input.clear();
    }
});

test('Click on parenthesis operator button should wrap input textbox\'s content', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('a & b');
    await input.selectText();
    
    const button = page.locator(`[data-default-operator="("]`);
    await button.click();
    
    await expect(await input.inputValue()).toEqual('(a & b)');
});

test('Should generate the conjunction truth table', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('a & b');
    
    await expect(await getTableData(page)).toEqual([
        [true, true, true],
        [true, false, false],
        [false, true, false],
        [false, false, false]
    ]);
});

test('Should generate the disjunction truth table', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('a | b');
    
    await expect(await getTableData(page)).toEqual([
        [true, true, true],
        [true, false, true],
        [false, true, true],
        [false, false, false]
    ]);
});

test('Should generate the negation truth table', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('!a');
    
    await expect(await getTableData(page)).toEqual([
        [true, false],
        [false, true]
    ]);
});

test('Should generate the conditional truth table', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('a -> b');
    
    await expect(await getTableData(page)).toEqual([
        [true, true, true],
        [true, false, false],
        [false, true, true],
        [false, false, true],
    ]);
});

test('Should generate the biconditional truth table', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('a <-> b');
    
    await expect(await getTableData(page)).toEqual([
        [true, true, true],
        [true, false, false],
        [false, true, false],
        [false, false, true],
    ]);
});

test('Should be able to switch user interface language', async ({ page }) => {
    await page.goto('/pt-BR');
    const button = page.locator('[href="/en-US"]');
    await button.click();
    await page.waitForURL('/en-US');
    const header = page.locator('h1');
    await expect(await header.innerText()).toEqual(enUS.headerTitle);
});

test.describe('Mobile', () => {
    test.use({ viewport: { width: 390, height: 844 } });
    
    test('Should generate the conjunction truth table', async ({ page }) => {
        const input = page.getByRole('textbox');
        await input.fill('a & b');
        
        await expect(await getTableData(page)).toEqual([
            [true, true, true],
            [true, false, false],
            [false, true, false],
            [false, false, false]
        ]);
    });
    
    test('Should generate the disjunction truth table', async ({ page }) => {
        const input = page.getByRole('textbox');
        await input.fill('a | b');
        
        await expect(await getTableData(page)).toEqual([
            [true, true, true],
            [true, false, true],
            [false, true, true],
            [false, false, false]
        ]);
    });
    
    test('Should generate the negation truth table', async ({ page }) => {
        const input = page.getByRole('textbox');
        await input.fill('!a');
        
        await expect(await getTableData(page)).toEqual([
            [true, false],
            [false, true]
        ]);
    });
    
    test('Should generate the conditional truth table', async ({ page }) => {
        const input = page.getByRole('textbox');
        await input.fill('a -> b');
        
        await expect(await getTableData(page)).toEqual([
            [true, true, true],
            [true, false, false],
            [false, true, true],
            [false, false, true],
        ]);
    });
    
    test('Should generate the biconditional truth table', async ({ page }) => {
        const input = page.getByRole('textbox');
        await input.fill('a <-> b');
        
        await expect(await getTableData(page)).toEqual([
            [true, true, true],
            [true, false, false],
            [false, true, false],
            [false, false, true],
        ]);
    });
});