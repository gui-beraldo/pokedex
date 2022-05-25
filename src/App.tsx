import { PokemonCard } from 'components/PokemonCard';
import { useEffect, useState } from 'react';
import { getAllPokemon } from 'services/gettingPokemons';

export default function App() {
	const allPokemonUrl = 'https://pokeapi.co/api/v2/pokemon';
	const [loading, setLoading] = useState(true);
	const [nextUrl, setNextUrl] = useState<any>('next');
	const [previousUrl, setPreviousUrl] = useState<any>('previous');
	const [pokemonList, setPokemonList] = useState<any[]>([]);

	useEffect(() => {
		async function fetchData() {
			let res: any = await getAllPokemon(allPokemonUrl);
			setNextUrl(res.next);
			setPreviousUrl(res.previous);
			await loadingList(res.results);
			setLoading(false);
		}
		fetchData();
	}, []);

	const loadingList = async (data: any) => {
		let _pokemonList: any = await Promise.all(
			data.map(async (pokemon: any) => {
				return pokemon.url;
			})
		);
		setPokemonList(_pokemonList);
	};

	const next = async () => {
		setLoading(true);
		let data: any = await getAllPokemon(nextUrl!);
		await loadingList(data.results);
		setNextUrl(data.next);
		setPreviousUrl(data.previous);
		setLoading(false);
	};

	const prev = async () => {
		if (!previousUrl) return;
		setLoading(true);
		let data: any = await getAllPokemon(previousUrl);
		await loadingList(data.results);
		setNextUrl(data.next);
		setPreviousUrl(data.previous);
		setLoading(false);
	};

	return (
		<>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<>
					<div>
						<button onClick={prev}>Prev</button>
						<button onClick={next}>Next</button>
					</div>
					{pokemonList.map((pokemonUrl): any => {
						return <PokemonCard key={pokemonUrl} pokemonUrl={pokemonUrl} />;
					})}
				</>
			)}
		</>
	);
}
