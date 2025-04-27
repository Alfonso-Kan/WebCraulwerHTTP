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
   if(urlPath.length > 0 && urlPath.slice(-1) === '/') {
       return urlPath.slice(0, -1);
   }
   return urlPath;
}


/*
Esto hara que la funcion normalizeURL sea exportada y pueda ser utilizada en otros archivos
*/
module.exports = { normalizeURL };