import React, { useEffect, useState } from 'react';
import Recipe from './recipe.js';
import './App.css';

function App() {
  const App_ID = "d16bf546";
  const APP_KEY = "f12fc370aa647ac2de6a2e0b2799cbf5";


  const [recipes, setrecipe] = useState([]);
  const [search, setsearch] = useState('')
  const [query, setquery] = useState('chiken')
  useEffect(() => {
     call();
  }, [query])
  const call = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setrecipe(data.hits)
  
  }

  const updateSearch = e =>{
    setsearch(e.target.value)
  }

  const getSearch = e =>{
    e.preventDefault();
    setquery(search)
    setsearch('')
  }
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form"> 
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="receips">
      {recipes.map(recipe=>(
        <Recipe key={recipe.recipe.label} title={recipe.recipe.label}
         Calories={recipe.recipe.calories.toFixed()} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
     
    </div>
  );
}

export default App;
