const { JSDOM } = require("jsdom");


/*
Se actualizan los parametros de la función crawlingWebsite para que pueda realizar la prueba en
un sitio web completo y no de una sola pagina.
baseUrl: La url base del sitio web que se va a crawl
currentUrl: La url actual que se está procesando, se usa para evitar ciclos infinitos
pages: Será un objeto que mantiene un rastro de todas las paginas
*/
const crawlingWebsite = async (baseUrl, currentUrl, pages) => {
  
  /*
  Así es como mantenemos un rastro de las páginas que ya hemos crawleado,
  si los dos hostnames son diferentes, simplemente se quiere esquipear la pagina
  */
 const baseUrl_obj = new URL(baseUrl);
 const currentUrl_obj = new URL(currentUrl);
 if(baseUrl_obj.hostname !== currentUrl_obj.hostname) {
   return pages
  }
  
  /*
  Lo siguiente es ver si hemos crawleado la pagina
  La manera en la que podemos en la que nos cercioramos que hemos crawled esta
  pagina es que la currentUrl esté en el objeto pages
  El objeto de pagina es escencialmente un mapa de URLs normalizados,
  así que no queremos duplicados a el número de vecesque hemos visto esa URL o las veces que hemos crawleado esa URL
  */
 const normalizedCurrentUrl = normalizeURL(currentUrl);
 if(pages[normalizedCurrentUrl] > 0) {
   pages[normalizedCurrentUrl]++;
   return pages; // Si ya hemos crawleado esta URL, simplemente retornamos el objeto pages
   //Esta es la forma en la que le podemos decir al usuario cuantas veces fue visitada una pagina.
  }
  
  //Para poner la primera vez que hemos crawleado esta URL
  pages[normalizedCurrentUrl] = 1;
  
  console.log(`acively crawling: ${currentUrl}`);

  try {
    const resp = await fetch(baseUrl);
    if (resp.status > 399) {
      console.log(`Error in fetch with status code: ${resp.status} on page ${baseUrl}`);
      return pages;
    }

    //Para validar que el html que estamos obteniendo sea valido
    const contentType = resp.headers.get("content-type");
    /*
    Se debe usar includes porque el content-type puede incluir informaaciòn adicional
    como charset=utf-8, por lo que no podemos comparar directamente con 'text/html'
    */
    if (!contentType.includes('text/html')) {
      console.log(`non html response, content type: ${contentType} on page ${baseUrl}`);
      return pages;
    }


    //Almacenamos el html en una variable
    // console.log(await resp.text());
    const htmlBody = await resp.text();
    //Ahora extraemos las URLs del HTML
    const nextUrls = getURLsFromHTML(htmlBody, baseUrl);

    //Aqui vamos a crawlear recursivamente esas paginas
    for (const nextUrl of nextUrls) {
      //Llamamos a la función crawlingWebsite recursivamente
      //Actualizamos la variale pages con el más reciente objeto pages
      pages = await crawlingWebsite(baseUrl, nextUrl, pages);
    }

  } catch (error) {
    console.log(`Error in fetch: ${error.message}, on page: ${baseUrl}`);
  }

  //Una vez que hemos crawleado cada pagina, entonces solo podemos ir al final
  return pages;

  /*
  Lo transcribimos a texto porque estamos esperando recuperar urls de HTML
  Puede salir un pequeño warnining porque fetch solo estaba disponible en el ambiente del navegador
  */

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
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`Error with absolute URL: ${error.message}`);
      }
      // urls.push(linkElement.href);
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