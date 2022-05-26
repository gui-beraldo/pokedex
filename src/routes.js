import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home';

export function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route exaxt path="/" element={<Home />} />
			</Routes>
		</Router>
	);
}
