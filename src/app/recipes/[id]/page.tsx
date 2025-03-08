'use client';

import { Ingredient, Recipe } from '@/app/types/types';
import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LoadingSpinner from '@/app/components/LoadingSpinner';

const RecipeDetails = React.lazy(
  () => import('@/app/components/RecipeDetails')
);

const RecipePage = () => {
  const [data, setData] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const params = useParams();
  const recipeId = params.id as string;

  const title = data?.title;
  const extendedIngredients = data?.extendedIngredients as Ingredient[];
  const image = data?.image;

  useEffect(() => {
    fetch(`${apiUrl}/recipes/${recipeId}/information?apiKey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((er) => setError(er.message))
      .finally(() => setIsLoading(false));
  }, [apiKey, apiUrl, params, recipeId]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-20">
        <LoadingSpinner />
      </div>
    );

  if (error) return <p>{error}</p>;

  if (!title || !extendedIngredients || !image) return <p>Recipe not found.</p>;

  return (
    <div
      className="bg-gradient-to-br from-white via-blue-200 to-blue-500 w-[100vw] h-[100%] min-h-screen
    flex justify-center items-center"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <RecipeDetails
          title={title}
          extendedIngredients={extendedIngredients}
          image={image}
        />
      </Suspense>
    </div>
  );
};

export default RecipePage;
