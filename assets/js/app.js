const cards = document.getElementById("cards");

async function getPokemons() {
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=54")
        .then(function (response) { return response.json() })
        .then(function (response) {

            for (let index = 0; index < response.results.length; index++) {
                const card = document.createElement("div");
                card.setAttribute("class", "card flex-column");

                const img = document.createElement("img");
                const name = document.createElement("span");
                const type = document.createElement("p");
                type.setAttribute("class", "type flex-column");
                const type2 = document.createElement("p");
                type2.setAttribute("class", "type flex-column");
                const div = document.createElement("div");
                div.setAttribute("class", "flex-row");
                const div2 = document.createElement("div");
                div2.setAttribute("class", "flex-column")
                name.innerText = response.results[index].name;
                card.appendChild(name);

                fetch(response.results[index].url)
                    .then(function (response) { return response.json() })
                    .then(function (response) {
                        if (response.types.length > 1) {
                            type.innerText = response.types[0].type.name;
                            type2.innerText = response.types[1].type.name;
                            div2.appendChild(type)
                            div2.appendChild(type2)
                        } else {
                            type.innerText = response.types[0].type.name;
                            div2.appendChild(type)
                        }

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

                        img.setAttribute("src", response.sprites.front_shiny);
                        div.appendChild(div2);
                        div.appendChild(img);
                        card.appendChild(div)
                        cards.appendChild(card);
                    })
            }
            return response
        })
}

getPokemons()