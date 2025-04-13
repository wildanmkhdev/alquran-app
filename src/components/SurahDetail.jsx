import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSurahDetail } from "../services/api";

const SurahDetail = () => {
  const Navigate = useNavigate();
  const { nomor } = useParams();
  const [surahD, setSurahD] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk navigasi ke surah sebelumnya
  const goToPrevSurah = () => {
    if (nomor > 1) {
      Navigate(`/surah/${parseInt(nomor) - 1}`);
    }
  };

  // Fungsi untuk navigasi ke surah berikutnya
  const goToNextSurah = () => {
    if (nomor < 114) {
      Navigate(`/surah/${parseInt(nomor) + 1}`);
    }
  };

  // Fungsi untuk kembali ke daftar surah
  const goToSurahList = () => {
    Navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSurahDetail(nomor);
        console.log("API response:", data); // Debugging
        setSurahD(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
        setLoading(false);
      }
    };
    fetchData();
  }, [nomor]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-xl  text-teal-800 text-center">Sabar y ahli surga🥰....</div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-xl text-red-500">{error}</div>
    </div>
  );

  if (!surahD) return null;

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header navigasi */}
      <div className="flex justify-between items-center py-6">
        <button 
          onClick={goToSurahList}
          className="flex items-center text-teal-600 hover:text-teal-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Daftar Surah
        </button>
        
        <div className="flex items-center">
          <button
            onClick={goToPrevSurah}
            disabled={nomor <= 1}
            // mati ketika nomor kurang dari 1
            className={`mx-2 text-teal-600 ${nomor <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-teal-800'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {}
          </button>
          <span className="mx-2 text-gray-500">-</span>
          <button
            onClick={goToNextSurah}
            disabled={nomor >= 114}
            className={`mx-2 text-teal-600 ${nomor >= 114 ? 'opacity-50 cursor-not-allowed' : 'hover:text-teal-800'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            
          </button>
        </div>
        
        {/* <button className="text-teal-600 hover:text-teal-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button> */}
      </div>

      {/* Judul surah dan navigasi */}
      <div className="flex justify-center items-center mb-6">
        <button className="mx-2 text-teal-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        </button>
        <h2 className="text-xl text-teal-600">{surahD.nama_latin}</h2>
        <span className="mx-4 text-gray-400">|</span>
        <span className="text-xl">{nomor}</span>
        <button className="mx-2 text-teal-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        </button>
      </div>

      {/* Konten surah */}
      <div className="bg-white rounded-lg  p-1 text-center">
        {/* Nama surah dalam Arab */}
        <div className="text-2xl font-arabic mb-2 text-blue-800 opacity-70">
          {surahD.nama}
        </div>
        
        {/* Nama surah dalam Latin */}
        <h1 className="text-2xl font-bold mb-1">{surahD.nama_latin}</h1>
        
        {/* Info surah */}
        <p className="text-gray-500 mb-8">
          {surahD.tempat_turun} · {surahD.jumlah_ayat} Ayat
        </p>

        {/* Ayat-ayat */}
        <div className="space-y-8">
          {surahD.ayat && surahD.ayat.map((ayat) => (
            <div key={ayat.nomor} className="pb-4 border-b border-gray-100">
              {/* Nomor ayat dalam lingkaran */}
              <div className="relative mb-2 text-start">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-green-300 text-sm font-bold text-green-500">
                  {ayat.nomor}
                </span>
              </div>
              
              {/* Teks Arab */}
              <p className="text-2xl font-arabic leading-loose mb-4 px-4 text-end">
                {ayat.ar.replace(/<[^>]+>/g, "")}
              </p>
              
              {/* Transliterasi */}
             
              
              {/* Terjemahan Indonesia */}
              <p className="text-gray-600 mb-2 text-base px-4 text-start">
                {ayat.idn}
              </p>
            </div>
          ))}
        </div>
        
        {/* Audio player jika ada */}
        {surahD.audio && (
          <div className="mt-8">
            <audio controls className="w-full">
              <source src={surahD.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurahDetail;