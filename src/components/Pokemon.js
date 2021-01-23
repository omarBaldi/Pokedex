import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Pokemon(props) {
    const { name } = props.pokemon;
    const [pokemonData, setPokemonData] = useState();

    const getPokemon = async () => {
        const response = await axios({
          method: 'GET',
          url: `https://pokeapi.co/api/v2/pokemon/${name}`
        })
        
        return response.data;
    }  
    
    useEffect(() => {
        (async () => {
            const pokemonData = await getPokemon();
            setPokemonData(pokemonData);
        })();
    }, [])

    return (
        <>
            {
                pokemonData &&
                <div>
                    <img src={pokemonData.sprites.front_default}></img>
                    <Link 
                        to={{
                            pathname: `/pokemon/${name}`,
                            state: {info: pokemonData}
                        }}
                    >
                        {name}
                    </Link>
                </div>
            }
        </>
    )
}


