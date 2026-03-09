import { useState, useEffect } from "react";
import type { Cocktail as CocktailType } from "../types/cocktails";
import { api } from "../../lib/api/api";
import "./style.css";

interface CocktailProps {
  id?: string;
  cocktail?: CocktailType;
}

export const Cocktail = ({ id, cocktail: paramCocktail }: CocktailProps) => {
  const [cocktail, setCocktail] = useState<CocktailType | null>(paramCocktail || null);

  useEffect(() => {
    if (paramCocktail) {
      setCocktail(paramCocktail);
      return;
    }

    if (id) {
      api.get(`lookup.php?i=${id}`).then((res) => {
        setCocktail(res.data.drinks?.[0] || null);
      });
    }
  }, [id, paramCocktail]);

  if (!cocktail) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="characterContainer">    
        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <div className="characterDataContainer">
        <p><strong>Nombre:</strong> {cocktail.strDrink}</p>
        <p><strong>Alcoholic:</strong> {cocktail.strAlcoholic}</p>
        <p><strong>Tags:</strong> {cocktail.strTags}</p>
      </div>
    </div>
  );
};