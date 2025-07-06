const { crawlingWebsite } = require("./crawl.js");

//El punto central de la aplicación
async function main() {
    if (process.argv.length < 3) {
        console.error("Error: No se ha proporcionado un archivo de entrada.");
        process.exit(1);

    }

    if(process.argv.length > 3) {
        console.error("Error: Se han proporcionado demasiados argumentos.");
        process.exit(1);
    }

    const baseUrl = process.argv[2];

    // for(const arg of process.argv) {
    //     console.log(arg);
    // }

    console.log("Iniciando el crowl de: " + baseUrl);
    const pages = await crawlingWebsite(baseUrl, baseUrl, {})
    
    for (const page of Object.entries(pages)) {
        console.log(page);
    }
}

/*
A nivel básico de un programa:
primer argumento es el nombre del programa,
el segundo es la ruta de node, la ruta de entrada de la aplicaciòn.
y el tercero es la ruta del archivo ejecutable.
*/

main();