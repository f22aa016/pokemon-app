import React from "react";

export const Card = ({pokemon}) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
        <div>タイプ</div>
        {pokemon.types.map((type) => {
            return (
                <div>
                    <span className="typename">{type.type.name}</span>
                </div>
            )
        })}
    </div>
  );
};
