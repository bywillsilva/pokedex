const cards = document.getElementById("cards");
const cards2 = document.getElementById("cards2");

if (cards) {
    getCards()
}

async function getCards() {
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then(function (response) { return response.json() })
        .then(function (response) {
            for (let index = 0; index < response.results.length; index++) {
                let card = document.createElement("div");
                let div = document.createElement("div");
                let div2 = document.createElement("div");
                let name = document.createElement("span");
                let type = document.createElement("p");
                let type2 = document.createElement("p");
                let img = document.createElement("img");

                card.setAttribute("class", "card flex-column");
                div.setAttribute("class", "flex-row");
                div2.setAttribute("class", "flex-column")
                name.innerText = response.results[index].name;
                type.setAttribute("class", "type flex-column");
                type2.setAttribute("class", "type flex-column");
                card.appendChild(name);

                getPokemons(response, type, type2, div, div2, img, card, index, cards)
            }
            return response
        })
}

async function getPokemons(response, type, type2, div, div2, img, card, index, cardNumber) {
    await fetch(response.results[index].url)
        .then(function (response) { return response.json() })
        .then(function (response) {
            getTypes(response, type, type2, div2,)
            getColors(response, card)
            getCard(response, card, img, div, div2, cardNumber)
            return response
        })
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

function getCard(response, card, img, div, div2, cardNumber) {
    img.setAttribute("src", response.sprites.front_shiny);
    div.appendChild(div2);
    div.appendChild(img);
    card.appendChild(div)
    cardNumber.appendChild(card);
}

const input = document.getElementById("input");
const search = document.getElementById("search");
const error = document.getElementById("error");

if (input) {
    input.addEventListener("keypress", async () => {
        cards2.textContent = ""
        if (input.value != "") {
            await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
                .then(function (response) { return response.json() })
                .then(function (response) {
                    let names = [];
                    for (let index = 0; index < response.results.length; index++) {
                        if (String(response.results[index].name).includes(input.value)) {
                            names.push(response.results[index].name)

                            let card = document.createElement("div");
                            let div = document.createElement("div");
                            let div2 = document.createElement("div");
                            let name = document.createElement("span");
                            let type = document.createElement("p");
                            let type2 = document.createElement("p");
                            let img = document.createElement("img");

                            card.setAttribute("class", "card flex-column");
                            div.setAttribute("class", "flex-row");
                            div2.setAttribute("class", "flex-column")
                            name.innerText = response.results[index].name;
                            type.setAttribute("class", "type flex-column");
                            type2.setAttribute("class", "type flex-column");
                            card.appendChild(name);

                            getPokemons(response, type, type2, div, div2, img, card, index, cards2)
                        }
                    }
                    if (names.length < 1) {
                        error.className = "error-active flex-column"
                        setTimeout(() => {
                            error.className = "error flex-column"
                        }, 3000)
                    }
                    names = [];
                })
        }
    })
}