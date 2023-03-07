const cards = document.getElementById("cards");

async function getCards() {
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=30")
        .then(function (response) { return response.json() })
        .then(function (response) {
            for (let index = 0; index < response.results.length; index++) {
                const card = document.createElement("div");
                const div = document.createElement("div");
                const div2 = document.createElement("div");
                const name = document.createElement("span");
                const type = document.createElement("p");
                const type2 = document.createElement("p");
                const img = document.createElement("img");

                card.setAttribute("class", "card flex-column");
                div.setAttribute("class", "flex-row");
                div2.setAttribute("class", "flex-column")
                name.innerText = response.results[index].name;
                type.setAttribute("class", "type flex-column");
                type2.setAttribute("class", "type flex-column");
                card.appendChild(name);

                getPokemons(response, type, type2, div, div2, img, card, index)
            }
            return response
        })
}

if (cards) {
    getCards()
}

function getTypes(response, type, type2, div2) {
    if (response.types.length > 1) {
        type.innerText = response.types[0].type.name;
        type2.innerText = response.types[1].type.name;
        div2.appendChild(type)
        div2.appendChild(type2)
    } else {
        type.innerText = response.types[0].type.name;
        div2.appendChild(type)
    }
}

function getColors(response, card) {
    if (response.types[0].type.name == "grass" ||
        response.types[0].type.name == "bug") {
        card.className = "card flex-column green"
    } else if (response.types[0].type.name == "fire") {
        card.className = "card flex-column red"
    } else if (response.types[0].type.name == "water" ||
        response.types[0].type.name == "ice") {
        card.className = "card flex-column blue"
    } else if (response.types[0].type.name == "normal") {
        card.className = "card flex-column white"
    } else if (response.types[0].type.name == "poison" ||
        response.types[0].type.name == "ghost" || response.types[0].type.name == "psychic") {
        card.className = "card flex-column purple"
    } else if (response.types[0].type.name == "electric") {
        card.className = "card flex-column yellow"
    } else if (response.types[0].type.name == "fairy") {
        card.className = "card flex-column pink"
    } else if (response.types[0].type.name == "ground" ||
        response.types[0].type.name == "rock" || response.types[0].type.name == "fighting") {
        card.className = "card flex-column brown"
    } else if (response.types[0].type.name == "dragon") {
        card.className = "card flex-column gold"
    } else if (response.types[0].type.name == "dark") {
        card.className = "card flex-column black"
    }
}

function getCard(response, card, img, div, div2) {
    img.setAttribute("src", response.sprites.front_shiny);
    div.appendChild(div2);
    div.appendChild(img);
    card.appendChild(div)
    cards.appendChild(card);
}

function getPokemons(response, type, type2, div, div2, img, card, index) {
    fetch(response.results[index].url)
        .then(function (response) { return response.json() })
        .then(function (response) {
            getTypes(response, type, type2, div2)
            getColors(response, card)
            getCard(response, card, img, div, div2)
            return response
        })
}

const pokedex = document.getElementById("pokedex");
if (pokedex) {
    pokedex.addEventListener("click", () => {
        // return window.location.href = "http://127.0.0.1:5500/pages/pokedex.html";
        return window.location.href = "bywillsilva.github.io/pokedex/pages/pokedex.html"
    })
}

const back = document.getElementById("back");
if (back) {
    back.addEventListener("click", () => {
        // return window.location.href = "http://127.0.0.1:5500/index.html";
        return window.location.href = "bywillsilva.github.io/pokedex";
    })
}

console.log(window.history.length)