"use client";

import { movieType } from "@/types/movieType";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.trim() ?? "";

  const [filmes, setFilmes] = useState<movieType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      setLoading(true);

      const base = "https://api.themoviedb.org/3";

      const url = q
        ? `${base}/search/movie?api_key=${
            process.env.NEXT_PUBLIC_TMDB_API_KEY
          }&language=pt-BR&query=${encodeURIComponent(q)}`
        : `${base}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        setFilmes(data.results || []);
      } catch (e) {
        console.log("Erro ao carregar filmes: " + e);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [q]);

  const IMG = process.env.NEXT_PUBLIC_TMDB_IMG_BASE;

  return (
    <div className="bg-gray-200">
      <div className="text-center font-black pt-3">Home</div>
      <div className="text-center font-bold mt-5">
        {q ? `Resultados para "${q}"` : "Filmes Populares"}
      </div>

      {loading && (
        <p className="text-center text-red-600 py-3">Carregando...</p>
      )}

      {!loading && filmes.length === 0 && (
        <p className="text-center text-red-600 py-3">Filmes não encontrados!</p>
      )}

      {/*filmes listagem*/}
      <div className="grid grid-cols-2 md:grid-cols-4 px-10 py-10 gap-10">
        {filmes.map((filme) => {
          const src = filme.poster_path
            ? `${IMG}/w300${filme.poster_path}`
            : "/no-image.svg";
          return (
            <div
              key={filme.id}
              className="flex flex-col justify-center items-center "
            >
              <Image
                src={src}
                alt={filme.title}
                width={300}
                height={500}
                className="rounded-[30px]"
              />
              <div className="mt-2 font-semibold text-center h-12 overflow-hidden">
                {filme.title}
              </div>
              <Link
                href={`/filme/${filme.id}`}
                className="bg-amber-400 font-semibold py-3 px-5 mt-2 rounded-full hover:bg-red-400 transition duration-300"
              >
                Saiba mais
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
