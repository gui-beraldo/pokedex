import { useEffect, useState } from 'react';
import { getPokemon } from 'services/gettingPokemons';
import { Card } from './Card';

export function PokemonCard({ pokemonUrl }: any) {
	const [loading, setLoading] = useState<boolean>(true);
	const [pokemon, setPokemon] = useState<any>();

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
							<p className="font-bold text-xs leading-[1.2]">{pokemon.id}</p>
							<p className="font-bold text-[26px] leading-[1.2] capitalize text-white">
								{pokemon.name}
							</p>
							<div>
								{pokemon.types.map((types: any) => {
									return <div key={types.type.name}>{types.type.name}</div>;
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
