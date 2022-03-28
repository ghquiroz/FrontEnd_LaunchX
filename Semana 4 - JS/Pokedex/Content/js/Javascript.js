
const fetchPokemon = () => {
	const pokeName = document.getElementById("pokeName");
	const name = pokeName.value;
	const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

	fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("../Content/img/pokemonwho.jpg")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            const namepoke = document.getElementById("namepokemon");
            namepoke.innerHTML ="#"+data.id+ " "+data.name;
            pokeTypes(data.types);
            pokeAbilities(data.abilities);
            pokeMoves(data.moves);
            pokeEstadisticas(data.stats);
        }
    });
}
const fetchPokemonID = () => {
	const pokeID = document.getElementById("pokeID");
	const id = pokeID.value;
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

	fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("../Content/img/pokemonwho.jpg")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
        	console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            const namepoke = document.getElementById("namepokemon");
            namepoke.innerHTML ="#"+data.id+ " "+data.name;
            pokeTypes(data.types);
            pokeAbilities(data.abilities);
            pokeMoves(data.moves);
            pokeEstadisticas(data.stats);
        }
    });
}


const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeimg");
    pokePhoto.src = url;
}

const pokeTypes = (data) =>{
	const typepoke = document.getElementById("types");
	typepoke.innerHTML ='<span class="title">Types:</span>';
	let types=" ";
	for(type of data){
		types += " "  + type.type.name;
	}
	typepoke.innerHTML +=types+"<br/>";
}

const pokeAbilities = (data) =>{
	var title = document.createElement('span');
	title.innerText = "Abilities:";
    title.classList.add('title');
    document.getElementById("abilities").appendChild(title);
	for(ability of data){
		var item = document.createElement('span');
        item.innerText = ability.ability.name;
        item.classList.add('text');
        item.classList.add('col-2');
        document.getElementById("abilities").appendChild(item);
	}
}
const pokeMoves = (data) =>{
	var title = document.createElement('span');
	title.innerText = "Moves:";
    title.classList.add('title');
    document.getElementById("moves").appendChild(title);
	for(move of data){
		var item = document.createElement('span');
        item.innerText = move.move.name;
        item.classList.add('col-4');
        item.classList.add('text');
        document.getElementById("moves").appendChild(item);
	}
}
const pokeEstadisticas = (data) =>{
	var name = [];
    var statval = [];
	for (stat of data) {
        name.push(stat.stat.name);
        statval.push(stat.base_stat);
    }
	const ctx = document.getElementById('barChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: name,
            datasets: [{
                label: 'Points',
                data: statval,
                backgroundColor: '#1B8AC6'
            }]
        },
        options: {
        	responsive: true,
        	plugins: {
        		legend: {
        			position: 'top',
        		},
        		title: {
        			display: true,
        			text: 'Estadisticas',
        			color: '#F7D90C'
        		}
        	}
        }
	});
}
