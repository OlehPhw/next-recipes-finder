export interface RecipeItem {
  id: number;
  title: string;
  image: string;
}

export interface Recipe {
  title: string;
  extendedIngredients: object[];
  image: string;
}

type Measures = {
  us: {
    amount: number;
    unitShort: string;
    unitLong: string;
  };
  metric: {
    amount: number;
    unitShort: string;
    unitLong: string;
  };
};

export type Ingredient = {
  aisle: string;
  amount: number;
  consistency: "SOLID" | "LIQUID";
  id: number;
  image: string;
  measures: Measures;
  meta: object[];
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  unit: string;
};
