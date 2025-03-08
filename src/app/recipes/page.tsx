'use client';

import { useSearchParams } from 'next/navigation';
import RecipesList from '../components/RecipesList';

const Recipes = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const cuisine = searchParams.get('cuisine');
  const maxTime = searchParams.get('maxTime');

  return (
    <div>
      <div
        className="w-[100vw] h-[50px] bg-gray-500 flex justify-center items-center
        md:h-[100px]"
      >
        <h1 className="text-2xl md:text-5xl font-bold text-white border-b-1 border-b-white p-1">
          Recipes page
        </h1>
      </div>
      <RecipesList query={query} cuisine={cuisine} maxTime={maxTime} />
    </div>
  );
};

export default Recipes;
