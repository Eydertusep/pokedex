// control + k + c para comentar
const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/";
const botonesHeader = document.querySelectorAll(".btn-header");

/* for (inicio; mientras sea verdad; paso) { código } */

for (let i = 1; i <= 10; i++) {
  // fetch: realiza una solicitud HTTP y devuelve una promesa con la respuesta
  // Solicitud HTTP: mensaje del cliente al servidor para obtener, enviar o modificar datos.
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
}

function mostrarPokemon(data) {
  // Crea un nuevo elemento 'div' en el DOM

  let tipos = data.types.map(
    (t) => ` <p class="${t.type.name} tipo">${t.type.name}</p>`
  );
  tipos = tipos.join(); // join(separador) convierte un array en una cadena uniendo sus elementos con el separador especificado (por defecto es ",").

  let pokenId = data.id.toString();//Metodos que nos permiti convertir un numero a string
  if (pokenId.length === 1 ) {
    pokenId = "00" + pokenId;
  } else if (pokenId.length === 2) {
    pokenId = "0" + pokenId;
  }
  
  const div = document.createElement("div");

  // Agrega la clase "pokemon" al nuevo div

  div.classList.add("pokemon"); // classList permite agregar, quitar, alternar y verificar clases CSS en elementos HTML usando JavaScript.

  div.innerHTML = `<div class="pokemon">
   <p class="pokemon-id-back">${pokenId}</p>

   <div class="pokemon-imagen derecha-img">
     
     <img
       src="${data.sprites.other["official-artwork"].front_default}"
       alt="${data.name}"
     />
   </div>

   <div class="pokemon-info">
     <div class="nombre-contenedor">
       <p class="pokemon-id">${pokenId}</p>
       <h2 class="pokemon nombre">${data.name}</h2>
     </div>

     <div class="pokemon tipos">
        ${tipos}
     </div>

     <div class="pokemon-stats">
       <p class="stat">${data.height}</p>
       <p class="stat">${data.weight}kg</p>
     </div>
   </div>
 </div>;`;

  listaPokemon.append(div); //Agrega el div al final de la lista pokemon
}

botonesHeader.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id; // Obtiene el ID del botón clickeado

    for (let i = 1; i <= 10; i++) {
      fetch(URL + i) // Realiza la solicitud HTTP
        .then((response) => response.json()) // Convierte la respuesta en JSON
        .then((data) => {
          const tipos = data.types.map((t) => t.type.name); // Extrae los tipos

          // Verifica si algún tipo coincide con el ID del botón
          if (tipos.some((tipo) => tipo.includes(botonId))) {
            console.log(`El Pokémon ${data.name} tiene el tipo ${botonId}`);

            // Crear un nuevo elemento para mostrar el Pokémon
            const pokemonElemento = document.createElement("li");
            pokemonElemento.textContent = `Nombre: ${
              data.name
            }, Tipo: ${tipos.join(", ")}`;

            // Agregarlo a la lista en el DOM
            listaPokemon.appendChild(pokemonElemento);
          }
        })
        .catch((error) => console.error("Error en la solicitud:", error)); // Manejo de errores
    }
  })
);
