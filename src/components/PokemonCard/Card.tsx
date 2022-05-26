import PokemonType from '../../PokemonType.json';

export function Card(props: any) {
	const type = PokemonType[props.pokemonType];

	return (
		<div
			className={
				(type === undefined ? 'bg-zinc-300' : type.bgClass) +
				' flex h-[115px] justify-between mt-[30px] pl-5 pt-5 pb-[10px] pr-[10px] rounded-[10px] bg-PokemonCard bg-no-repeat bg-right drop-shadow-xl'
			}
		>
			{props.children}
		</div>
	);
}
