// AUTOCOMPLETAR CON LOCALSTORAGE
function autocompletar(arreglo) {
    const inputGif = document.querySelector('#search');
    let indexFocus = -1;

    inputGif.addEventListener('input', function () {
        const tipoGif = this.value;

        if (!tipoGif) return false;
        cerrarLista();

        //Crear lista de sugerencias
        const divList = document.createElement('div');
        divList.setAttribute('id', this.id + '-lista-autocompletar');
        divList.setAttribute('class', 'lista-autocompletar-items');
        this.parentNode.appendChild(divList);

        //Validad Arreglo vs Input
        if(arreglo.length == 0) return false;
        arreglo.forEach(item => {
            //console.log(item);
            //console.log(item.substr(0, tipoGif.length));
            if(item.substr(0, tipoGif.length) == tipoGif) {
                //console.log(item);
                const elementoLista=document.createElement('div');
                elementoLista.innerHTML=`<strong>${item.substr(0,tipoGif.length)}</strong>${item.substr(tipoGif.length)}`;
                elementoLista.addEventListener('click',function(){
                    inputGif.value=this.innerText;
                    cerrarLista();
                    return false;
                })
                divList.appendChild(elementoLista);
            }

        });


    });
    inputGif.addEventListener('keydown', function () {

    });
}
function cerrarLista(){
    const items=document.querySelectorAll('.lista-autocompletar-items');
    items.forEach(item=>{
         item.parentNode.removeChiled(item);   
    });
   
}

autocompletar(['perro', 'gato', 'pez', 'paloma', 'conejo']);
// ********************BUSCAR GIF******************************

let APIKEY = "hZFijLy5ddrIKkhAz5sv38TYIl1x4qFp";
// Helmer villareal
document.addEventListener("DOMContentLoaded", init);


function init(i) {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault(); //to stop the page reload
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=3&q=`;
        let str = document.getElementById("search").value.trim();
        url = url.concat(str);
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(content => {
                //data paginacion
                console.log(content.data);
                console.log("META", content.meta);
                let fig = document.createElement("figure");
                let img = document.createElement("img");
                let fc = document.createElement("figcaption");
                img.src = content.data[0].images.downsized.url;
                img.alt = content.data[0].title;
                fc.textContent = content.data[0].title;
                fig.appendChild(img);
                fig.appendChild(fc);
                let out = document.querySelector(".out");
                out.insertAdjacentElement('afterbegin', fig);
                document.querySelector("#search").value = "";

            })
            .catch(err => {
                console.error(err);
            });
    });
}