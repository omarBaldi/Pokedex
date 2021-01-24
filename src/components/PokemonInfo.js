import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Drawer } from '@material-ui/core'

export default function About(props) {

    const data = useLocation();
    const { info: pokemonInfo } = data.state;
    const [showSidebar, setShowSideBar] = useState(false);

    useEffect(() => {
        changeSideBarValue(true);
    }, [pokemonInfo]);

    const changeSideBarValue = (open) => {
        setShowSideBar(open);

        if (!open) {
            return props.history.goBack();
        }
    };

    return (
        <Drawer open={showSidebar} onClose={() => changeSideBarValue(false)}>
            <h4>Show pokemon info for {pokemonInfo.name} </h4>
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
        </Drawer>
    )
}
