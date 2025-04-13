import axios from "axios";

const API_BASE_URL = "https://quran-api.santrikoding.com/api/surah";

export const getSurahList = async () => {
	try {
		const response = await axios.get(API_BASE_URL);
		// console.log("API Response:", response.data); // Debugging
		return response.data; // Periksa apakah data yang diambil sudah sesuai
	} catch (error) {
		console.error("Error fetching surah list:", error);
		return []; // Jika error, return array kosong agar tidak error di map()
	}
};
export const getSurahDetail = async (nomor) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/${nomor}`);
		return response.data;
	} catch (error) {
		console.error("erorr fetch surah list", error);
	}
};
