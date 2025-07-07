const { sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

test('sort 2 pages', () => {
    /*
    Casa url mapea cuantas veces esa URL se encuentra en el sitio web
    El objetivo de esta función es ordenar las páginas por la cantidad de veces que se encuentran
    poniendo la url màs frecuenta hasta arriba de la lista
    */
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})

test('sort 5 pages', () => {
    /*
    Casa url mapea cuantas veces esa URL se encuentra en el sitio web
    El objetivo de esta función es ordenar las páginas por la cantidad de veces que se encuentran
    poniendo la url màs frecuenta hasta arriba de la lista
    */
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path2': 5,
        'https://wagslane.dev/path3': 2,
        'https://wagslane.dev/path4': 9
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path4', 9],
        ['https://wagslane.dev/path2', 5],
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path3', 2],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})