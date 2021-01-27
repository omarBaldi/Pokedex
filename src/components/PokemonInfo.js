import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Drawer, Card, Typography, List, ListItem, Divider  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChartStats from './Chart';

const useStyles = makeStyles({
    root: {
      minWidth: 600,
      height: 'inherit',
      textAlign: 'center'
    },
    abilitiesContainer: {
        width: '100%',
    },
  });

export default function About(props) {

    const classes = useStyles();
    const data = useLocation();
    const { info: pokemonInfo } = data.state;
    const [showSidebar, setShowSideBar] = useState(false);

    const pokemonStatsArray = pokemonInfo.stats.map(stat => stat.base_stat);

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
            <Card className={classes.root}>

                <Typography variant="h3">
                    {pokemonInfo.name}
                </Typography>

                <Divider />

                <List >
                    <Typography variant="h5">Pokemon abilities</Typography>
                    {
                        pokemonInfo.abilities.map((ability, index) => {
                            return (
                                <ListItem key={index}>
                                    <Typography variant="h5">
                                        {ability.ability.name}
                                    </Typography>
                                </ListItem>
                            )
                        })
                    }
                </List>

                <Divider />


                <p>Experience: {pokemonInfo.base_experience}</p>
                <p>Height: {pokemonInfo.height}</p>
                <ul>
                    Stats
                    {
                        pokemonInfo.stats.forEach((stat, index) => {
                            /* return (
                                <li key={index}>
                                    {stat.stat.name}
                                    -
                                    {stat.base_stat}
                                </li>
                            ) */
                        })
                    }
                </ul>
                <ChartStats data={pokemonStatsArray} />
                <img src={pokemonInfo.sprites.front_shiny} alt="" className={classes.imagePokemon}></img >
            </Card>
        </Drawer>
    )
}
