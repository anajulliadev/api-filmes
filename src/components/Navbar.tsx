"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const current = searchParams.get("q") || "";
    setSearch(current);
  }, [searchParams]);

  const buscar = (e: React.FormEvent) => {
    e.preventDefault();

    const query = search.trim();

    if (query) {
      router.push(`/?q=${encodeURIComponent(query)}`);
      console.log("busca feita");
    } else {
      router.push("/");
      console.log("voltou pra home");
      setSearch("");
    }
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="flex flex-col items-center md:flex-row w-full justify-between px-10 py-5 bg-black">
        <button
          onClick={() => router.push("/")}
          className="font-bold text-xl text-white cursor-pointer"
        >
          TMDB MOVIES
        </button>
        <form className="flex gap-2 mt-3 md:mt-0" onSubmit={buscar}>
          <input
            placeholder="Buscar filme"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md border-red-300 outline-none px-2 py-1 text-gray-200"
          />
          <button
            type="submit"
            className=" text-white rounded-md border-red-300 border px-3 py-1 cursor-pointer hover:text-black hover:bg-red-300 transition duration-300"
          >
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
}
