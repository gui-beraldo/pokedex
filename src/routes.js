import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home';
import { PokemonPage } from 'pages/PomemonPage';

export function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route exaxt path="/" element={<Home />} />
				<Route exaxt path="/:pokemonName" element={<PokemonPage />} />
			</Routes>
		</Router>
	);
}
