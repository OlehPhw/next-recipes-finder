import React from 'react';
import Image from 'next/image';
import { Ingredient } from '../types/types';

type Props = {
  title: string;
  extendedIngredients: Ingredient[];
  image: string;
};

const RecipeDetails: React.FC<Props> = ({
  title,
  extendedIngredients,
  image,
}) => {

  return (
    <div
      className="flex flex-col justify-center items-center m-[50px] 
      bg-amber-50 w-[200px] h-auto p-2.5 border-1 border-gray rounded-2xl
      md:w-[400px]"
    >
      <h1 className="text-xl text-center font-bold md:text-2xl">{title}</h1>
      {image && (
        <div>
          <Image src={image} alt="recipe-image" width={500} height={500} />
        </div>
      )}
      <h2 className="text-0.5xl font-semibold md:text-xl">How to cook</h2>
      <div className="">
        <ol className="flex justify-between items-center flex-wrap ">
          {extendedIngredients?.map((item) => (
            <li key={item.id} className="w-[40%] border-b-1 p-0.5 m-1">
              <p className="text-xs md:text-base">{item.original}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetails;
