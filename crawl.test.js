const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
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

/*
El objetivo de este test es verificar
que la función getURLsFromHTML extrae correctamente las URLs de un cuerpo HTML
captura todas las URLs de un sitio web y las retorna un en arreglo de cadenas de texto
*/
test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/">
                Boot.dev Blog
                </a>
            </body>
        </html>
    `
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, baseURL)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})


/*
Test para validar urls relativas
*/
test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/path/">
                Boot.dev Blog
                </a>
            </body>
        </html>
    `
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, baseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

//Test para validar urls relativas y absolutas
test('getURLsFromHTML relative and absolute', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path1/">
                    Boot.dev Blog Path One
                </a>
                <a href="/path2/">
                    Boot.dev Blog Path Two
                </a>
            </body>
        </html>
    `
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, baseURL)
    console.log(actual)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

/*
TEST PARA PROBAR URLs INVALIDAS
se tiene que modificar la funciòn getURLsFromHTML para que ignore las urls invalidas
y no las incluya en el arreglo de salida y no se detenga la ejecuciòn del programa
*/
test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="invalid">
                Invalid URL
                </a>
            </body>
        </html>
    `
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, baseURL)
    const expected = []
    expect(actual).toEqual(expected)
})