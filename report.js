/*
FUNCIÓN PARA ESCRIBIR UN REPORTE DE LAS PÁGINAS
*/
function printReport(pages) {
    console.log('==========')
    console.log('REPORT')
    console.log('==========')
    const sortedPages = sortPages(pages);
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0];
        const hits = sortedPage[1];
        console.log(`Found ${hits} links to page: ${url}`);
    }
    console.log('==========')
    console.log('FINISHED REPORT')
    console.log('==========')
}

function sortPages(pages) {
    const pagesArray = Object.entries(pages);
    /*
    Recordar que el índice 1 tiene la cuenta que queremos ordenar
    y que el indice 0 tiene la URL
    Lo que retorna esta función es un número.
    Dependiendo si nos regresa un valor posivito o negativo es como ordena
    todas las entradas individuales en el arreglo.
    */
    pagesArray.sort((a, b) => {
        aHits = a[1]
        bHits = b[1]
        return b[1] - a[1]
    })
    return pagesArray}

module.exports = {
    sortPages,
    printReport
}