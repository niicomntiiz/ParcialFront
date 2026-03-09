"use client"
import { useEffect, useState } from "react";
import type { Cocktail as CocktailType } from "./types/cocktails";
import { api } from "../lib/api/api";

import { Cocktail } from "./components/cocktail"; 
import "./page.css"
import Link from "next/link";
import { useRouter } from "next/navigation";

const App = () => {
  const [search, setSearch] = useState("margarita");
  const [cocktails, setCocktails] = useState<CocktailType[]>([]);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    api.get(`search.php?s=${search}`).then((e) => {
      setCocktails(e.data.drinks || []);
    }).catch((e) => {
      setError(`Error cargando los datos: ${e.message ? e.message : e}`);
    }).finally(() => {
      setLoading(false);
    });
  }, [search]);

  const cocktailAleatorio = async () => {
    try {
      const res = await api.get("random.php");
      if (res.data.drinks && res.data.drinks.length > 0) {
        const randomId = res.data.drinks[0].idDrink;
        router.push(`/pagCocktail/${randomId}`);
      }
    } catch (err) {
      console.error("Error obteniendo el cocktail aleatorio", err);
    }
  };

  return (
    <div className="mainContainer">
      <button className="BotonAleatorio" onClick={cocktailAleatorio}>
        Dime algo bonito
      </button>

      {loading && <h1>Loading...</h1>}
      {error && <h2>{error}</h2>}
      
      <div className="cocktailsContainer">
        {!loading && cocktails.map((c) => (
          <Link key={c.idDrink} href={`/pagCocktail/${c.idDrink}`}>
            <Cocktail cocktail={c} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default App;