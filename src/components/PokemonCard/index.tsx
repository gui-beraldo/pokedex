import { useEffect, useState } from 'react';
import { getPokemon } from 'services/gettingPokemons';
import { Card } from './Card';
import { PokemonType } from './PokemonType';

export function PokemonCard({ pokemonUrl }: any) {
	const [loading, setLoading] = useState<boolean>(true);
	const [pokemon, setPokemon] = useState<any>();
	const zeroPad = (num: any, places: any) => String(num).padStart(places, '0');

	useEffect(() => {
		async function fetchData() {
			let res: any = await getPokemon(pokemonUrl);
			setPokemon(res);
			setLoading(false);
		}
		fetchData();
	}, [pokemonUrl]);

	return (
		<>
			{loading ? (
				<Card />
			) : (
				<>
					<Card pokemonType={pokemon.types[0].type.name}>
						<div className="z-10 flex flex-col">
							<p className="before:content-['#'] font-bold text-xs leading-[1.2] text-[#17171b] opacity-60">
								{zeroPad(pokemon.id, 3)}
							</p>
							<p className="font-bold text-[26px] leading-[1.2] capitalize text-white">
								{pokemon.name}
							</p>
							<div className="flex">
								{pokemon.types.map((types: any) => {
									return (
										<PokemonType key={types.type.name} type={types.type.name} />
									);
								})}
							</div>
						</div>
						<div className="flex items-end">
							<img
								className="min-w-[130px] w-[130px] min-h-[130px] h-[130px] overflow-visible"
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
								alt=""
							/>
						</div>
					</Card>
				</>
			)}
		</>
	);
}
