"use strict";

const typeColor = {
    bug: "#a8ba1c",
    dragon: "#ffeaa7",
    electric: "#f7cf2d",
    fairy: "#d685ae",
    fighting: "#c22e29",
    fire: "#ed822f",
    flying: "#a98ff2",
    grass: "#7bc74c",
    ground: "#e3c066",
    ghost: "#6d538f",
    ice: "#98d9d5",
    normal: "#a8a87b",
    poison: "#a340a2",
    psychic: "#fa5586",
    rock: "#b8a235",
    water: "#628ff0",
};

let typesArray = [];
let likedArray = [];
let savedArray = [];

const pokemonContainer = document.querySelector("#pokemonContainer");
const pokemonInfo = document.querySelector("#pokemonInfo");
const pokemonType = document.querySelector("#pokemonType");
const pokemonName = document.querySelector('#pokemonName');
const likedLenght = document.querySelector("#likedLenght");
const savedLenght = document.querySelector("#savedLenght");
const showSavedPoks = document.querySelector("#showSavedPoks");
const showLikedPoks = document.querySelector("#showLikedPoks");

function renderPokemons(arr, list) {
    list.innerHTML = "";

    arr.forEach(pokemon => {
        const div = document.createElement("div");
        div.className = "bg-main w-[200px] group pb-3 text-center rounded-full";
        div.innerHTML = `
            <img src="${pokemon.img}" width="100px" class="cursor-pointer -mt-10 mx-auto group-hover:scale-125 transition-all duration-200" alt="${pokemon.name}">
            <p class="mt-1 text-main-100 font-bold text-lg">#${pokemon.id}</p>
            <h1 class="font-bold text-xl mb-2">${pokemon.name}</h1>
            <p class="flex items-center justify-center" id="types"></p>
            <div class="flex items-center text-lg justify-center gap-2 my-2">
                <i class="likedBtn fa-solid cursor-pointer ${pokemon.isLike ? "text-red-600" : ""} fa-heart"></i>
                <i class="savedBtn fa-solid cursor-pointer ${pokemon.isSaved ? "text-cyan-400" : ""} fa-bookmark"></i>
            </div>
        `;

        appendTypes(pokemon.type, div.querySelector("#types"));

        const likedBtn = div.querySelector(".likedBtn");
        const savedBtn = div.querySelector(".savedBtn");

        likedBtn.addEventListener('click', () => {
            pokemon.isLike = !pokemon.isLike;
            updateArrays();
            renderPokemons(arr, list);
        });

        savedBtn.addEventListener('click', () => {
            pokemon.isSaved = !pokemon.isSaved;
            updateArrays();
            renderPokemons(arr, list);
        });

        div.querySelector("img").addEventListener("click", () => {
            displayPokemonInfo(pokemon);
        });

        list.append(div);
    });
}

function appendTypes(types, container) {
    types.forEach(type => {
        const span = document.createElement("span");
        span.textContent = type;
        if(span.textContent == "Rock" && span.textContent == "Dragon"){
            span.style.color = '#000'
        }
        span.style.backgroundColor = typeColor[type.toLowerCase()] || '#000';
        span.className = "text-white uppercase text-xs rounded-md px-3 py-2 mx-1";
        container.appendChild(span);
    });
}

function displayPokemonInfo(pokemon) {
    pokemonInfo.innerHTML = `
        <div class="flex items-center justify-between">
            <p class="p-1 bg-gray-300/80 rounded-md font-medium border border-gray-400">${pokemon.height}</p>
            <p class="p-1 bg-gray-300/80 rounded-md font-medium border border-gray-400">${pokemon.weight}</p>
        </div>
        <p class="text-center font-medium text-gray-500 my-10">#${pokemon.id}</p>
        <h1 class="text-center font-bold text-xl">${pokemon.name}</h1>
        <div class="mx-auto mt-4 flex items-center justify-between">
            <img class="absolute left-[50%] -top-14 translate-x-[-50%]" width="130" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif">
            <div class="flex justify-between w-full gap-3">
                <div class="flex flex-col items-center gap-2">
                    <h1 class="font-bold">Types</h1>
                    <p id="pokInfoType" class="flex flex-wrap w-[200px] justify-center gap-y-2"></p>
                </div>

                <div class="flex flex-col items-center gap-2">
                    <h1 class="font-bold">❌Weaknesses❌</h1>
                    <p id="pokInfoWK" class='flex flex-wrap w-[200px] justify-center gap-y-2'></p>
                </div>
            </div>
        </div>
        <h1 class="text-center mt-16 italic text-gray-500 flex items-center font-semibold">
            Its name ${pokemon.name}, its types: ${pokemon.type.join(", ").toLowerCase()} and its weaknesses: ${pokemon.weaknesses.join(", ").toLowerCase()}
        </h1>
        <div class="mx-auto">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id + 1}.png">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id + 2}.png">
        </div>
    `;

    appendTypes(pokemon.type, pokemonInfo.querySelector("#pokInfoType"))
    appendTypes(pokemon.weaknesses, pokemonInfo.querySelector("#pokInfoWK"))
}

function startFilter() {
    pokemonType.addEventListener('change', filterPokemons);
    pokemonName.addEventListener("input", filterPokemons);
    showLikedPoks.addEventListener('click', () => renderPokemons(likedArray, pokemonContainer));
    showSavedPoks.addEventListener('click', () => renderPokemons(savedArray, pokemonContainer));
}

function filterPokemons() {
    const typeValue = pokemonType.value.toLowerCase();
    const nameValue = pokemonName.value.toLowerCase().trim();

    const filteredPokemons = pokemons.filter(pokemon => {
        return (typeValue === "all" || typeValue === "" || pokemon.type.some(t => t.toLowerCase().includes(typeValue))) &&
               pokemon.name.toLowerCase().includes(nameValue) || String(pokemon.id).includes(String(nameValue).toLowerCase());
    });

    renderPokemons(filteredPokemons, pokemonContainer);
}

function updateArrays() {
    likedArray = pokemons.filter(pok => pok.isLike);
    savedArray = pokemons.filter(pok => pok.isSaved);
    likedLenght.textContent = likedArray.length;
    savedLenght.textContent = savedArray.length;
}

function setTypes(arr, type) {
    arr.forEach(pokemon => {
        pokemon.type.forEach(t => {
            if (!type.includes(t)) {
                type.push(t);
            }
        });
    });
}

function populateTypeDropdown(list, array) {
    array.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.innerHTML = type;
        list.append(option);
    });
}

// calling function
setTypes(pokemons, typesArray);
populateTypeDropdown(pokemonType, typesArray);
startFilter();
renderPokemons(pokemons, pokemonContainer);