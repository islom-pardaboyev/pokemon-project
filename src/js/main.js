"use strict";

const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
};

let typesArray = [];

let pokemonContainer = document.querySelector("#pokemonContainer");
let pokemonInfo = document.querySelector("#pokemonInfo");
let pokemonType = document.querySelector("#pokemonType");
let pokemonName = document.querySelector('#pokemonName');
let likedLenght = document.querySelector("#likedLenght");
let savedLenght = document.querySelector("#savedLenght");

function renderPokemons(arr, list) {
    list.innerHTML = "";

    arr.forEach(pokemon => {
        let div = document.createElement("div");
        div.className = "bg-main w-[200px] group pb-3 text-center rounded-full";
        div.innerHTML = `
            <img src="${pokemon.img}" width="100px" class="-mt-10 mx-auto group-hover:scale-125 transition-all duration-200" alt="${pokemon.name}">
            <p class="mt-1 text-main-100 font-bold text-lg">#${pokemon.id}</p>
            <h1 class="font-bold text-xl mb-2">${pokemon.name}</h1>
            <p class="flex items-center justify-center">${pokemon.type.join(", ")}</p>
            <div class="flex items-center text-lg justify-center gap-2 my-2">
                <i id="likedBtn" class="fa-solid cursor-pointer ${pokemon.isLike ? "text-red-600" : ""} fa-heart"></i>
                <i id="savedBtn" class="fa-solid cursor-pointer ${pokemon.isSaved ? "text-cyan-400" : ""} fa-bookmark"></i>
            </div>
        `;
    
        div.addEventListener("click", () => {
            pokemonInfo.innerHTML = `
                <div class="flex items-center justify-between">
                    <p class="p-1 bg-gray-300/80 rounded-md font-medium border border-gray-400">${pokemon.height}</p>
                    <p class="p-1 bg-gray-300/80 rounded-md font-medium border border-gray-400">${pokemon.weight}</p>
                </div>
                <p class="text-center font-medium text-gray-500 my-10">#${pokemon.id}</p>
                <h1 class="text-center font-bold text-xl">${pokemon.name}</h1>
                <div class="mx-auto mt-4 flex items-center justify-between">
                    <img class="absolute left-[50%] -top-14 translate-x-[-50%]" width="130" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif">
                    <div class="flex justify-between w-full">
                        <div class="flex flex-col items-center gap-2">
                            <h1 class="font-bold">Types</h1>
                            <p>${pokemon.type.join(" ")}</p>
                        </div>

                        <div class="flex flex-col items-center gap-2">
                            <h1 class="font-bold">❌Weaknesses❌</h1>
                            <p>${pokemon.weaknesses.join(" ")}</p>
                        </div>
                    </div>
                </div>
                <h1 class="text-center mt-16 italic text-gray-500 flex items-center font-semibold">
                    Its name ${pokemon.name}, its types: ${pokemon.type.join(", ").toLowerCase()} and its weaknesses: ${pokemon.weaknesses.join(", ").toLowerCase()}
                </h1>
            `;
        });

        list.append(div);
    });
}

function startFilter() {
    pokemonType.addEventListener('change', () => {
        let value = pokemonType.value.toLowerCase();
        if (value === "all") {
            renderPokemons(pokemons, pokemonContainer);
        } else {
            const filter = pokemons.filter(pokemon => 
                pokemon.type.some(t => t.toLowerCase().includes(value))
            );
            renderPokemons(filter, pokemonContainer);
        }
    });

    pokemonName.addEventListener("input", () => {
        let value = pokemonName.value.toLowerCase().trim();
        const filter = pokemons.filter(pokemon => 
            pokemon.name.toLowerCase().includes(value)
        );
        renderPokemons(filter, pokemonContainer);
    });
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
    list.innerHTML = '<option value="all" selected>All Types</option>';
    array.forEach(type => {
        let option = document.createElement('option');
        option.value = type;
        option.innerHTML = type;
        list.append(option);
    });
}

// Initialize the application
setTypes(pokemons, typesArray);
populateTypeDropdown(pokemonType, typesArray);
startFilter();
renderPokemons(pokemons, pokemonContainer);