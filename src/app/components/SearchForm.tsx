'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

const SearchForm: React.FC = () => {
  const [query, setQuery] = useState('');
  const [trimmedquery, setTrimmedQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxTime, setMaxTime] = useState('');

  const router = useRouter();

  const cuisines = ['Italian', 'Mexican', 'Chinese', 'European'];

  const isButtonDisabled = !trimmedquery && !cuisine && !maxTime;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const queryParams = new URLSearchParams({
      query: trimmedquery,
      cuisine: cuisine,
      maxTime: maxTime.toString(),
    }).toString();

    router.push(`/recipes?${queryParams}`);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    const trimmed = e.target.value.trim().toLowerCase();
    setTrimmedQuery(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-xs md:w-2xl h-auto border rounded-2xl p-1 flex flex-col 
      justify-center items-center text-xl md:text-3xl bg-white"
    >
      <div className="flex flex-col items-center mb-1 md:mb-2.5">
        <label htmlFor="query">Recipe Query:</label>
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={handleOnChange}
          placeholder="Search"
          className="text-center border border-gray-300 bg-gray-100 text-sm 
            md:text-xl"
        />
      </div>

      <div className="flex flex-col items-center mb-1 md:mb-2.5">
        <label htmlFor="cuisine">Cuisine:</label>
        <select
          id="cuisine"
          name="cuisine"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="text-center border border-gray-300 bg-gray-100 
            text-gray-500 text-sm md:text-xl"
        >
          <option value="">Select Cuisine</option>
          {cuisines.map((cuisineOption, index) => (
            <option key={index} value={cuisineOption}>
              {cuisineOption}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center mb-1 md:mb-2.5">
        <label htmlFor="maxTime" className="text-sm md:text-3xl">
          Max Preparation Time (minutes):
        </label>
        <input
          type="number"
          id="maxTime"
          name="maxTime"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value)}
          min="0"
          placeholder="Choose quantity"
          className="text-center border border-gray-300 bg-gray-100 
            text-gray-500 text-sm md:text-xl"
        />
      </div>

      <button
        type="submit"
        disabled={isButtonDisabled}
        className={`border border-blue-600 bg-emerald-300 rounded-lg text-sm 
          md:text-xl p-0.5 md:p-1.5 px-4 md:px-10 cursor-pointer
          hover:shadow-[0_0_5px_5px_rgba(59,130,246,0.5)] hover:shadow-blue-300/50 transition-all duration-500 
          ${isButtonDisabled ? 'bg-gray-400/50 text-black/50 pointer-events-none border-gray-400/50' : ''}`}
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
