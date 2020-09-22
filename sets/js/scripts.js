const APIurl = "https://api.giphy.com/v1/gifs/search?q=";
//const APIkey = "xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx"  56cTthKcllF5tck39cR59sP4wXo8fp5q;
const APIkey = "&apy_key=56cTthKcllF5tck39cR59sP4wXo8fp5q";

const btnBuscar = document.getElementById('buscar');
btnBuscar.addEventListener('click', getArrData);
const resultsEl = document.getElementById("results");

//Obtener array de gif
async function getArrData() {
  try {
    const valor = document.getElementById('search').value;
    const url = 'https://api.giphy.com/v1/gifs/search?q=' + valor + '&q=&limit=12&api_key=56cTthKcllF5tck39cR59sP4wXo8fp5q';
    const request = await fetch(url);
    const jsonData = await request.json();
    console.log(jsonData.data);
    let resultsHTML = "";

    jsonData.data.forEach(function (obj) {
      const url = obj.images.fixed_height.url;
      const height = obj.images.fixed_height.height;
      const title = obj.title;
      resultsHTML += `<div class ="itemGif"><img
      class="item"
      src="${url}"
      height="${height}"
      alt="${title}"
      > </div>`;
    });
    resultsEl.innerHTML = resultsHTML;
  }
catch (err) {
  console.log(err);
}
}


// Traigo palabras sugeridas, API datamuse.
async function getSugerencias(value) {
  const consulta = await fetch(`http://api.datamuse.com/sug?max=3&s=${value}`);
  const dataSugerencias = await consulta.json();
  console.log(dataSugerencias);
  return dataSugerencias;
  
}

// FUNCIONES PARA SUGERENCIAS DE BUSQUEDA
// Inserto sugerencias segun lo que se escribe en el input y me devuelve la API.
async function insertarSugerenciasDataMuse() {
  let value = document.getElementById('search').value;
  const buttonsNodes = document.querySelectorAll('button.button-sugerencia');
  const divSugerencias = document.querySelector('div.sugerencias-busqueda');

  if (value.length > 1) {
      // Consulto por sugerencias
      const sugerencias = await getSugerencias(value);
      // Muestro el div que contiene los botones
      divSugerencias.classList.replace('ocultar', 'mostar');

      for (contador = 0; contador < sugerencias.length; contador++) {
          // A cada boton le inserto el texto que recibo como sugerencia.
          // Al boton que le estoy insertando le agrego la clase mostrar.
          // Asi evito que se muestren botones vacios.
          buttonsNodes[contador].classList.replace('ocultar', 'mostrar');
          buttonsNodes[contador].innerHTML = sugerencias[contador].word;
      }
  } else {
      // Oculto todos los botones de sugerencia y el div que los contiene.
      hideContenedorSugerencias();
  }
}
// Oculta los botones de sugerencia y el div que los contiene.
function hideContenedorSugerencias() {
  const buttonsNodes = document.querySelectorAll('button.button-sugerencia');
  const divSugerencias = document.querySelector('div.sugerencias-busqueda');

  for (contador = 0; contador < buttonsNodes.length; contador++) {
      divSugerencias.setAttribute('class', 'sugerencias-busqueda ocultar');
      buttonsNodes[contador].classList.replace('mostrar', 'ocultar');
  }
}







//++++++++++++++++++++++++++++++++++++


function hide() {
  document.getElementById('style-list').style.display = 'none';
}

function show() {
  document.getElementById('style-list').style.display = 'block';
}

function saylor_night() {
  document.body.classList.add('sailor-night-tem');
}

function saylor_day() {
  document.body.classList.remove('sailor-night-tem');
}


