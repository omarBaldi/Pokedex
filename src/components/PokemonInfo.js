import React from 'react';
import {useLocation} from "react-router-dom";


export default function About(props) {
    const data = useLocation();
    const { info: pokemonInfo } = data.state;

    return (
        <div>
            <ul>
                {
                    pokemonInfo.abilities.map((ability, index) => {
                        return (
                            <li key={index}>
                                {ability.ability.name}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
