import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPokemon } from 'services/gettingPokemons';
import { HeaderPokemon } from './components/HeaderPokemon';

export function PokemonPage() {
	const [loading, setLoading] = useState(true);
	const { pokemonName } = useParams();
	const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
	const [pokemon, setPokemon] = useState<any>();

	useEffect(() => {
		async function fetchData() {
			let res: any = await getPokemon(pokemonUrl);
			setPokemon(res);
			setLoading(false);
		}
		fetchData();
	}, []);

	return (
		<>
			{loading ? (
				<div>Loading</div>
			) : (
				<>
					<HeaderPokemon pokemon={pokemon} />
					<div>PokeId:{pokemon.id}</div>
					<div>PokeName:{pokemon.name}</div>
				</>
			)}
		</>
	);
}
