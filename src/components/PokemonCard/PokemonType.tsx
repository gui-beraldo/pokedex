import Pokemon from '../../PokemonType.json';

export function PokemonType(props: any) {
	const type = Pokemon[props.type];

	return (
		<div
			className={
				(type === undefined ? 'bg-zinc-300' : type.badgeClass) +
				' p-[5.5px_5.5px_5.5px_25px] mr-[5px] rounded-[3px] bg-no-repeat bg-[length:15px_15px] bg-[center_left_5px]'
			}
		>
			<p className="text-white font-medium text-xs capitalize">{props.type}</p>
		</div>
	);
}
