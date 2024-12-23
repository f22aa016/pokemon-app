import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import { Card } from "./components/Card/Card";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loding, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      lordPokemon(res.results);
      // console.log(res);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

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

  // console.log(pokemonData);

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    // console.log(data);
    await lordPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    // console.log(data);
    await lordPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  return (
    <>
      <Navbar />
      <div className="App">
        {loding ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
