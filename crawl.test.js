const { normalizeURL } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

/*
Normalizar unna url significa hacer que urls diferentes que apuntan
al mismo sitio web tengan la misma estructura
*/

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})


//Test para verificar si una url con un slash al final se normaliza correctamente
test('normalizeURL extra slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

//Test para verificar si la url es la misma con mayusculas y minusculas
test('normalizeURL capitalice', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

/*Tet para normalizar url sin la capa de seguridad(s) la instancia
de la url es la misma sin importar si tiene http o https*/
test('normalizeURL strip http', () => {
    const input = 'http://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})