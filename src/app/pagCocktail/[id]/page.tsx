"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api/api";
import type { Cocktail } from "../../types/cocktails";
import styles from "./style.module.css";

const Page = () => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    api.get(`lookup.php?i=${id}`)
      .then(res => {
        setCocktail(res.data.drinks?.[0] || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
  if (!cocktail) return <h1>No encontrado</h1>;

  const validIngredients: string[] = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail];
    if (ingredient && ingredient.trim() !== "") {
      validIngredients.push(ingredient as string);
    }
  }

  return (
    <div className={styles.detailContainer}>
      <h1>{cocktail.strDrink}</h1>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} style={{ maxWidth: "300px" }} />

      <h2>Detalles del Cocktail</h2>

      <h3>Categoría:</h3>
      <p>{cocktail.strCategory}</p>

      <h3>Alcohólico</h3>
      <p>{cocktail.strAlcoholic}</p>

      <h3>Vaso necesario:</h3>
      <p>{cocktail.strGlass}</p>

      <h2>Instrucciones</h2>
      <p>{cocktail.strInstructions}</p> 

      <h2>Ingredientes</h2>
      <p>
        {validIngredients.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </p>
    </div>
  );
};

export default Page;