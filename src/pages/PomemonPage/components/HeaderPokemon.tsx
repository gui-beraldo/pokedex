import { PokemonCard } from 'components/PokemonCard';
import { PokemonType } from 'components/PokemonType';
import { useNavigate } from 'react-router-dom';

export function HeaderPokemon({ pokemon }: any) {
	const navigate = useNavigate();
	const zeroPad = (num: any, places: any) => String(num).padStart(places, '0');

	function returnPage() {
		navigate(-1);
	}

	return (
		<nav className="h-[265px] bg-zinc-500">
			<div className="h-[105px] flex items-center">
				<button onClick={returnPage}>Voltar</button>
			</div>
			<div className="flex items-center justify-start">
				<div className="flex items-end mr-[25px]">
					<img
						className="bg-bgPokemon min-w-[125px] w-[125px] min-h-[125px] h-[125px] overflow-visible"
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
						alt=""
					/>
				</div>
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
			</div>
		</nav>
	);
}
