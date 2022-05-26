module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx,json}'],
	theme: {
		extend: {
			backgroundImage: {
				PokemonCard: "url('/src/assets/bg/Pokeball.svg')",
				BugIcon: "url('/src/assets/pokemonTypeIcon/Bug.svg')",
			},
		},
	},
	plugins: [],
};
