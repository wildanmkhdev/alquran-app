import React, { useEffect, useState, useRef } from "react"; 
import { getSurahList } from "../services/api"; 
import { Link } from "react-router-dom"; 

// Komponen utama SurahList
const SurahList = () => {
  // State untuk menyimpan daftar surah
  const [surahs, setSurahs] = useState([]);
  // State untuk menyimpan daftar surah yang sudah difilter
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  // State untuk menunjukkan apakah data masih dimuat
  const [loading, setLoading] = useState(true);
  // State untuk menangani error jika ada masalah dalam pengambilan data
  const [error, setError] = useState(null);
  // State untuk menyimpan kata kunci pencarian
  const [searchTerm, setSearchTerm] = useState("");
  // Ref untuk menyimpan instance Fuse.js jika tersedia
  const fuseRef = useRef(null);
//useRef digunakan di sini untuk menyimpan instance Fuse.js agar: ✅ Tidak menyebabkan re-render saat pencarian terjadi.
// ✅ Instance tetap ada selama komponen aktif.
// ✅ Tidak dibuat ulang setiap kali komponen di-render.
// useRef itu kayak memori kecil yang bisa nyimpen data tanpa bikin komponen re-render. Jadi, kalau kita butuh nyimpen sesuatu yang tetap ada di antara render ulang tapi gak mau bikin UI berubah

  useEffect(() => {
    (async () => {
      try {
        const data = await getSurahList(); // Ambil data surah dari API
        setSurahs(data); // Simpan data surah ke state
        setFilteredSurahs(data); // Inisialisasi filteredSurahs dengan data asli
        
        // Jika Fuse.js tersedia di window, buat instance Fuse untuk pencarian fuzzy
        if (window.Fuse) {
					// data di sini ambil dari state data di atas
          fuseRef.current = new window.Fuse(data, {
            keys: ["nama_latin", "arti", "nomor", "nama"], // Kolom yang akan dicari
            threshold: 0.1, // Sensitivitas pencarian
            ignoreLocation: true, // Abaikan lokasi pencocokan
            includeScore: true, // Sertakan skor relevansi
          });
        }
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); // Set loading ke false setelah proses selesai
      }
    })();
  }, []); 

  // useEffect untuk menangani perubahan pada searchTerm dan update daftar surah yang difilter
  useEffect(() => {
    setFilteredSurahs(
      searchTerm && fuseRef.current // Jika ada kata kunci pencarian dan Fuse tersedia
        ? fuseRef.current.search(searchTerm).map(({ item }) => item) // Gunakan Fuse.js untuk pencarian fuzzy
        : surahs // Jika tidak, tampilkan daftar surah asli
    );
  }, [searchTerm, surahs]); // Jalankan efek ini setiap kali searchTerm atau surahs berubah

  if (loading) return <div className="text-center text-teal-800">Sabar ya ahli surga🥰....</div>;

  if (error) return <div className="text-center text-red-500">{error}</div>;
 
  if (!filteredSurahs.length) return <div className="text-center text-gray-500">Surah tidak ditemukan</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="font-bold text-3xl sm:text-4xl text-center mb-8 text-teal-600">Daftar Surah</h1>
      {/* Input pencarian surah */}
      <input
        type="search"
        className="w-full p-4 text-sm text-teal-600 border border-gray-200 rounded-3xl"
        placeholder="Cari Surah....."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* Grid daftar surah */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
        {filteredSurahs.map((surah) => (
          <Link
            to={`/surah/${surah.nomor}`} // Navigasi ke halaman detail surah berdasarkan nomor
            key={surah.nomor}
            className="bg-white shadow-sm rounded-lg p-5 text-center border border-gray-100 hover:scale-105"
          >
            <div className="flex justify-between items-center mb-3">
              {/* Nomor surah */}
              <div className="w-8 h-8 rounded-full border border-green-300 text-sm font-bold text-green-500 flex items-center justify-center">
                {surah.nomor}
              </div>
              {/* Kategori surah: Makkiyah atau Madaniyyah */}
              <div className="text-xs text-teal-600 bg-teal-50 rounded-full px-2 py-1">
                {surah.tempat_turun === "mekah" ? "Makkiyah" : "Madaniyyah"}
              </div>
            </div>
            {/* Nama surah dalam tulisan Arab */}
            <div className="text-xl text-teal-600 mb-1 font-arabic">{surah.nama}</div>
            {/* Nama surah dalam latin */}
            <h2 className="text-xl font-semibold mb-1">{surah.nama_latin}</h2>
            {/* Arti nama surah */}
            <p className="text-sm text-gray-500 mb-2">{surah.arti}</p>
            
            {/* Informasi jumlah ayat dan tombol baca surah */}
            <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500">{surah.jumlah_ayat} Ayat</div>
              <div className="text-teal-600 text-sm font-medium">Baca Surah</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SurahList; // Ekspor komponen agar dapat digunakan di tempat lain
