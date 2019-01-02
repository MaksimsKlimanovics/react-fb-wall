import { sum, delay, getUniqueID, getFullApiUrl } from './';

describe('instruments', () => {
    jest.setTimeout(10000);

    test('sum function must be function', () => {
        expect(sum).toBeInstanceOf(Function)
    });

    test('sum function should throw, when called with non number types of parameters', () => {
        expect(() => sum(2, 'hello')).toThrow();
    });

    test('sum function should throw, when called with non number types of parameters', () => {
        expect(() => sum('hello', 2)).toThrow();
    });

    test('sum function should return addition of to arguments', () => {
        expect(sum(3, 2)).toBe(5);
        expect(sum(3, 2)).toMatchSnapshot();
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    test('delay function should return a resolved promise for value', async () => {
        await expect(delay(7000)).resolves.toBeUndefined();
    });

    test('getUniqueId should be function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueId function should throw, when called with non number types of parameters', () => {
        expect(() => getUniqueID('hello')).toThrow();
    });

    test('getUniqueId function should produce a string value', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
    });

    test('getFullApiUrl should produce a string value', () => {
        expect(typeof getFullApiUrl('qwerty', 'ytrewq')).toBe('string');
    });

    test('getFullApiUrl function should throw, when called with non literal types of parameters', () => {
        expect(() => getFullApiUrl(1,'a')).toThrow();
    });

    test('getFullApiUrl function should throw, when called with non literal types of parameters', () => {
        expect(() => getFullApiUrl('a', 1)).toThrow();
    });

    test('getFullApiUrl function should return addition of to arguments', () => {
        expect(getFullApiUrl('qwerty', 'ytrewq')).toBe('qwerty/ytrewq');
        expect(getFullApiUrl('qwerty', 'ytrewq')).toMatchSnapshot();
    });

})