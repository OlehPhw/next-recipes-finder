import React, { useEffect, useState, Suspense } from 'react';
import { RecipeItem } from '../types/types';
import LoadingSpinner from './LoadingSpinner';

const Card = React.lazy(() => import('./Card'));

type Props = {
  query: string | null;
  cuisine: string | null;
  maxTime: string | null;
};

const RecipesList: React.FC<Props> = ({ query, cuisine, maxTime }) => {
  const [items, setItems] = useState<RecipeItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const cacheKey = `recipes-${query}-${cuisine}-${maxTime}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);

    if (
      cachedData &&
      cacheTimestamp &&
      Date.now() - parseInt(cacheTimestamp) < 60000
    ) {
      setItems(JSON.parse(cachedData));
      setIsLoading(false);
    } else {
      fetch(
        `${apiUrl}/recipes/complexSearch?query=${query}&cuisine=${cuisine}&maxReadyTime=${maxTime}&apiKey=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setItems(data.results);
          localStorage.setItem(cacheKey, JSON.stringify(data.results));
          localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
        })
        .catch((er) => setError(er.message))
        .finally(() => setIsLoading(false));
    }
  }, [apiKey, apiUrl, cuisine, maxTime, query]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-20">
        <LoadingSpinner />
      </div>
    );
  
  if (error) return <p>{error}</p>;

  return (
    <div
      className="flex flex-wrap justify-center items-center
    bg-[url('/images/wallpaper-recipes.jpg')] bg-cover bg-center  min-h-screen"
    >
      <Suspense fallback={<LoadingSpinner />}>
        {items &&
          items.map((item) => (
            <Card
              title={item.title}
              imgUri={item.image}
              recipeId={item.id}
              key={item.id}
            />
          ))}
      </Suspense>
    </div>
  );
};

export default RecipesList;
