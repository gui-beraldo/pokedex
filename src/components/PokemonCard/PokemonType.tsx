import Pokemon from '../../PokemonType.json';

export function PokemonType(props: any) {
	const type = Pokemon[props.type];

	return (
		<div
			className={
				(type === undefined ? 'bg-zinc-300' : type.bgClass) +
				' p-[5.5px] rounded-[3px]'
			}
		>
			<p className="text-white font-medium text-xs capitalize">{props.type}</p>
		</div>
	);
}
