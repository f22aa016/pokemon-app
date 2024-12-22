import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import { Card } from "./components/Card";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loding, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() =>{
    const fetchPokemonData = async() => {
      let res = await getAllPokemon(initialURL); 
      lordPokemon(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  }, [])

  const lordPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon)
        let pokemonRecoad = getPokemon(pokemon.url);
        return pokemonRecoad;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);
  return <div className="App">
    {loding ? (
      <h1>ロード中・・・</h1>
    ) : (
      <>
      <div className="pokemonCardContainer">
        {pokemonData.map((pokemon, i) => {
          return <Card key={i} pokemon={pokemon}/>
        })}
      </div>
      </>
    )
    }
  </div>;
}

export default App;
