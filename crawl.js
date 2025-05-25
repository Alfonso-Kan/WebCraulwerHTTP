const { JSDOM } = require("jsdom");

const crawlingWebsite = async (baseUrl) => {
  console.log(`Crawling ${baseUrl}`);
  const resp = await fetch(baseUrl);

  /*
  Lo transcribimos a texto porque estamos esperando recuperar urls de HTML
  */
 console.log(await resp.text());

}

/*
Existes tres pasos para realizar un test
1. Hacer una strub de la función que queremos probar
2. Escribir el test para la función

La forma en la que funciona jest, es que este busca archivos en tu package o
en tu carpeta directorio del proyecto que termina con .test.js
*/

/*
Función que toma una URL en cadena u retorna otra
*/
function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const urlPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (urlPath.length > 0 && urlPath.slice(-1) === "/") {
    return urlPath.slice(0, -1);
  }
  return urlPath;
}

/*
Obtener las urls de una función de HTML
INPUTS:
- htmlBody: Que toma en una cadena de texto el cuerpo de html
- baseURL: Que toma en una cadena de texto la url base, representa la url del sitio web
    que estamos crawleando.
OUTPUTS:
- urls: Un arreglo de cadenas de texto que contiene las urls encontradas en el htmls
*/
function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  /*
    Lo que hace esto es tomar un html como cadena de texto y lo convierte en un objeto DOM
    un objeto en memoria que representa ese arbol del DOM.
    */
  const dom = new JSDOM(htmlBody);
  /* Esto es algo que se usarìa en el navegador para obtener lo que está en el DOM */
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      //relative URL
      //Còdigo para evitar que el programa se detenga en caso de que la url sea invalida
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.error(`Error with relative URL: ${error.message}`);
      }
    } else {
      //absolute URL
      urls.push(linkElement.href);
      try {
        const urlObj = new URL(linkElement.href);
        urlObj.push(urlObj.href);
      } catch (error) {
        console.log(`Error with absolute URL: ${error.message}`);
      }
    }
}
return urls;
}

/*
Esto hara que la funcion normalizeURL sea exportada y pueda ser utilizada en otros archivos
*/
module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlingWebsite
};