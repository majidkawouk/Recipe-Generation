"use client";
import Image from "next/image";
import { useState } from "react";

export default function Main() {
  const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  // Fetch recipes based on ingredients
  const fetchRecipes = async () => {
    if (!ingredients.trim()) return; // Prevent empty searches
    setIsLoading(true);
    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredients}&number=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data);
      setSelectedRecipe(null);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Fetch detailed recipe information
  const fetchRecipeDetails = async (recipeId) => {
    setIsLoading(true);
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div >
      {/* Hero Section */}
      <div className="relative w-full h-[400px]">
        <Image
          src="/nat.png"
          alt="nat"
          fill
          className="object-cover"
          priority // Prioritize loading the hero image
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold bg-black/50 p-4">
          Welcome To Find <br /> Recipes by Ingredients 
        </h1>
      </div>

      {/* cards */}
      <div className="flex justify-between border-y border-solid">
    <div className=" w-[45%]  text-lg  ">
    <img src="/sauce.png" alt="My Logo" />
    <h1 className="font-bold text-3xl">Basic And Delicious</h1>
<p>We teach you the best way to make delicious food even if you don't know how to cook.</p>

    </div>
    <div className="w-[45%] text-lg mb-10 ">
    <img src="/harvest.png" alt="My Logo" />
    <h1 className="font-bold text-3xl">available  Ingredients</h1>
<p>you can searh based on what you have in home.</p>

    </div>

    </div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center py-10 bg-gray-50">
        <h1 className="text-4xl font-bold text-green-800 mb-6">
          Find Recipes by Ingredients
        </h1>

        {/* Search Input and Button */}
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            className="border-2 border-green-600 rounded-lg p-2 w-80 text-gray-800 shadow-md focus:outline-none focus:border-green-700"
            placeholder="Enter ingredients (e.g., tomato, cheese)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && fetchRecipes()} // Allow Enter key to trigger search
          />
          <button
            className="mt-4 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition disabled:opacity-50"
            onClick={fetchRecipes}
            disabled={isLoading || !ingredients.trim()} // Disable button when loading or no input
          >
            {isLoading ? "Searching..." : "Search Recipes"}
          </button>
        </div>

        {/* Recipe List */}
        <div className="mt-8 w-full flex flex-wrap justify-center gap-6">
          {recipes.length > 0 && !selectedRecipe ? (
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white p-4 rounded-lg shadow-lg w-80 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-semibold text-green-700">
                  {recipe.title}
                </h2>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full rounded-lg mt-2"
                />
                <button
                  className="mt-3 bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
                  onClick={() => fetchRecipeDetails(recipe.id)}
                >
                  View Cooking Instructions
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-700">
              {recipes.length === 0 && !selectedRecipe
                ? "Enter ingredients and click search to find recipes."
                : ""}
            </p>
          )}
        </div>

        {/* Recipe Details Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
              <h2 className="text-2xl font-semibold text-green-700">
                {selectedRecipe.title}
              </h2>
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full rounded-lg mt-2"
              />
              <h3 className="text-xl text-black mt-4 bg-yellow-100 p-2 rounded">
                Cooking Instructions:
              </h3>
              {selectedRecipe.analyzedInstructions.length > 0 ? (
                <ol className="text-left list-decimal list-inside mt-2 text-gray-800">
                  {selectedRecipe.analyzedInstructions[0].steps.map((step) => (
                    <li key={step.number} className="mt-1">
                      {step.step}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-red-600">No detailed instructions available.</p>
              )}
              <button
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                onClick={() => setSelectedRecipe(null)}
              >
                Back to Recipes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}