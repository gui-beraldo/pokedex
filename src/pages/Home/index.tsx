import { PokemonCard } from 'components/PokemonCard';
import { Card } from 'components/PokemonCard/Card';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPokemon } from 'services/gettingPokemons';
import { HeaderHome } from './components/HeaderHome';

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
				return pokemon;
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
		<div className="bg-bgHome bg-no-repeat">
			<div className="mx-10">
				<HeaderHome />
				<h1 className="text-[32px] leading-10 font-bold text-[#17171B]">
					Pokédex
				</h1>
				<p className="text-base mt-[10px] leading-[20px] text-[#747476]">
					Search for Pokémon by name or using the National Pokédex number.
				</p>
				<div className="mt-[25px] flex items-center justify-center p-4 rounded-[10px] bg-[#F2F2F2]">
					<input
						className="w-full bg-SearchIcon bg-[length:16px] bg-no-repeat pl-[20px] bg-transparent text-[12px] leading-[16px]"
						type="text"
						placeholder="What Pokémon are you looking for?"
					/>
				</div>
				<div className="mt-[20px] flex items-center justify-center">
					<button
						className="bg-zinc-500 rounded mx-1 p-1 text-sm text-white"
						onClick={prev}
					>
						Prev
					</button>
					<button
						className="bg-zinc-500 rounded mx-1 p-1 text-sm text-white"
						onClick={next}
					>
						Next
					</button>
				</div>
				{loading ? (
					<Card />
				) : (
					pokemonList.map((pokemon): any => {
						return (
							<Link key={pokemon.id} to={`/${pokemon.name}`}>
								<PokemonCard pokemonUrl={pokemon.url} />
							</Link>
						);
					})
				)}
			</div>
		</div>
	);
}
