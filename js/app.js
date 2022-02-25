let pokemonList  = [];
let total        = 150; 
let totalPerPage = 15;  // Resultado por página
let totalPages   = parseInt(total/totalPerPage);
let position     = 1; // posicion inicial
let currentPage  = 1;

async function getPokemons(page, filter = null){
    $(".poke-container").empty();

    // Como PokeAPI solo me permite obtener un pokemon a la vez implemento un tipo de paginacion
    let start = (page == 1 ? 1 : ((page - 1) * totalPerPage)+1);
    let end   = (page * totalPerPage);

    //seteo la pagina actual
    currentPage = page;

    try {
      $("body").css("cursor", "progress");

      // Llamo a la API recursivamente de acuerdo a la cantidad por pagina basandome en la posicion actual
      for(let i = start; i <= end; i++){
        
          // Obtengo el pokemon de acuerdo a su número 
          let res  = await fetch(`${config.base_url}pokemon/${i}`, {cache: "no-store"});
          let info = await res.json();

          // Construyo un objeto pokemon con los datos mas importantes 
          let pokemon = new Pokemon(
            `${config.base_img_url}${info.id}.png`,
            info.sprites.front_default,
            info.sprites.other.dream_world.front_default,
            info.name,
            info.base_experience,
            info.stats[0].base_stat,
            info.stats[1].base_stat,
            info.stats[2].base_stat,
            info.stats[3].base_stat,
            i
          );
          
          // Agrego el pokemon a un arreglo con todos los encontrados
          if(!pokemonList.find(e => e.number == i)){
              pokemonList.push(pokemon);
          }

          position++;
          
          //Dibujo en pantalla el pokemon
          drawCard(pokemon);
      }
      drawPages();
    } catch (error) {
      console.log(error)
   }
}

const drawCard = pokemon => {
    let numberLong = 5;
    let pokecard = $(`<div class="col-8 col-sm-3 col-lg-2 my-3 card shadow rounded">
                          <div class="card-inner">
                              <div class="card-front">
                                  <img class="card-img-top poke-card-img p-2"
                                      src="${pokemon.img}"
                                      alt="image ${pokemon.name}">
                                  <div class="card-body">
                                    <h5 class="card-title text-center">${pokemon.name}</h5>
                                    <p class="card-text text-center poke-text text-muted">
                                        ${pokemon.hp} Hp | ${pokemon.xp} Xp
                                    </p>
                                    <div class="poke-card-data">
                                      <span class="badge bg-success poke-status">${pokemon.attack}</span>
                                      <span class="badge bg-info poke-status">${pokemon.defense}</span>
                                      <span class="badge bg-danger poke-status">${pokemon.special}</span>
                                    </div>
                                  </div>
                              </div>
                              <div class="card-back">
                                  <img class="card-img-top"
                                    src="${pokemon.imgGame}"
                                    alt="game image ${pokemon.name}">
                                    <span class="badge bg-light text-dark">N° ${pokemon.number}</span>
                              </div>
                          </div> 
                      </div>`).hide();
    $(".poke-container").append(pokecard)
    pokecard.show("normal");

}

const drawPages = () => {
   $("#pages").empty();
   for($i = 1; $i <= totalPages; $i++){
     let btnPage = `<button type="button" data-id="${$i}" 
                        class="btn btn-danger ${currentPage == $i ? 'active' : ''} changePage">${$i}</button>`;
     $("#pages").append(btnPage);
   }
   $("body").css("cursor", "default");
};

// si cambio la pagina llamo a la funcion getPokemons
$("body").on("click", ".changePage", function(e){
    getPokemons($(this).attr("data-id"));
});


$("#search").on("keyup", function() {
  var value = $(this).val().toLowerCase();
  $(".card-title").filter(function() {
      if($(this).text().toLowerCase().indexOf(value) > -1){
        $(this).parent().parent().parent().parent().show("slow");
      }else{
        $(this).parent().parent().parent().parent().hide("normal");
      }
  });
});



$(async function() {
    await getPokemons(currentPage);
});

