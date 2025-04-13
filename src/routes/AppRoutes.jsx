// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router";
import SurahList from "../components/SurahList";
import SurahDetail from "../components/SurahDetail";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<SurahList />} />
			<Route path="/surah/:nomor" element={<SurahDetail></SurahDetail>} />
		</Routes>
	);
};

export default AppRoutes;
