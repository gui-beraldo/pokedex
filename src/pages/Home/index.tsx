import { PokemonCard } from 'components/PokemonCard';
import { useEffect, useState } from 'react';
import { getAllPokemon } from 'services/gettingPokemons';
import { Header } from './components/Header';

export function Home() {
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
		<div className="mx-10">
			<Header />
			<h1 className="text-[32px] leading-10 font-bold text-[#17171B]">
				Pokédex
			</h1>
			<p className="text-base mt-[10px] leading-[20px] text-[#747476]">
				Search for Pokémon by name or using the National Pokédex number.
			</p>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<div>
					<div>
						<button onClick={prev}>Prev</button>
						<button onClick={next}>Next</button>
					</div>
					{pokemonList.map((pokemonUrl): any => {
						return <PokemonCard key={pokemonUrl} pokemonUrl={pokemonUrl} />;
					})}
				</div>
			)}
		</div>
	);
}
