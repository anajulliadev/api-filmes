"use client";

import { MovieDetailsType } from "@/types/movieDetailsType";
import { MoveLeft, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Filme() {
  const { id } = useParams<{ id: string }>();

  const [filme, setFilme] = useState<MovieDetailsType | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function carregar() {
      setLoading(true);
      const base = "https://api.themoviedb.org/3";
      const url = `${base}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR&append_to_response=credits`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setFilme(data || null);
      } catch (e) {
        console.log("erro: " + e);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [id]);

  const IMG = process.env.NEXT_PUBLIC_TMDB_IMG_BASE;

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="px-10 py-5">
        <Link
          href="/"
          className="hover:underline flex items-center gap-2 justify-center"
        >
          <MoveLeft size={12} />
          home
        </Link>
      </div>
      <div className="text-center font-black pt-3">
        Detalhes do Filme: {filme?.title}
      </div>

      {loading && (
        <p className="text-center text-red-600 py-3">Carregando...</p>
      )}

      <div className="flex gap-10 mt-10 justify-center">
        <div>
          <Image
            src={
              filme?.poster_path
                ? `${IMG}/w300${filme.poster_path}`
                : "/no-image.svg"
            }
            alt={filme?.title ? `${filme.title}` : "Título não encontrado"}
            width={300}
            height={500}
            className="rounded-[30px]"
          />
        </div>

        <div>
          <p className="max-w-lg font-bold mt-5">Sinopse</p>
          <p className="mt-2 max-w-lg">{filme?.overview}</p>
          <div className="flex gap-2 mt-3">
            <p className="font-semibold">Lançamento:</p>
            {filme?.release_date?.slice(0, 4)}
          </div>
          <div className="flex gap-2 mt-3">
            <p className="font-semibold">Lançamento:</p>
            {filme?.release_date?.slice(0, 4)}
          </div>
          <div className="flex gap-2 mt-3 items-center">
            <p className="font-semibold">Nota:</p>
            {filme?.vote_average?.toFixed(1)} <Star size={12} />
          </div>
          <div className="flex gap-2 mt-3 items-center">
            <p className="font-semibold">Direção:</p>
          </div>
          <div className="flex gap-2 mt-3 items-center">
            <p className="font-semibold">Gêneros:</p>
          </div>
        </div>
      </div>
    </div>
  );
}
