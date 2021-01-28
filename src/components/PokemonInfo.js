/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Drawer, Card, Typography, List, ListItem, Divider, IconButton, Tooltip } from '@material-ui/core';
import { Star as StarFull, StarBorderOutlined as StarEmpty } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ChartStats from './Chart';

const useStyles = makeStyles({
    root: {
      minWidth: 500,
      height: 'inherit',
      textAlign: 'center',
      position: 'relative'
    },
    abilitiesContainer: {
        width: '100%',
    },
    imagePokemon: {
        minWidth: 150,
        marginBottom: -25
    },
    starIcon: {
        position: 'absolute',
        top: 10,
        right: 25,
    },
    starShiny: {
        color: 'yellow'
    }
  });

export default function About(props) {

    const classes = useStyles();
    const data = useLocation();
    const { info: pokemonInfo } = data.state;
    const [showSidebar, setShowSideBar] = useState(false);
    const [shiny, setShiny] = useState(false);

    const pokemonChartData = {
        numbers: pokemonInfo.stats.map(stat => stat.base_stat),
        labels: pokemonInfo.stats.map(stat => stat.stat.name)
    };

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

                <Tooltip title={!shiny ? 'Show shiny version' : 'Show normal version'}>
                    <IconButton 
                        disableRipple={true} 
                        disableFocusRipple={true} 
                        onClick={() => setShiny(!shiny)} 
                        className={`
                            ${classes.starIcon}
                            ${shiny ? `${classes.starShiny}` : null}
                        `}
                    >
                        {!shiny ? <StarEmpty /> : <StarFull className={classes.starIcon.starFull}/>}
                    </IconButton>
                </Tooltip>

                <img 
                    src={shiny ? pokemonInfo.sprites.front_shiny : pokemonInfo.sprites.front_default} 
                    alt="" 
                    className={classes.imagePokemon}
                ></img >

                <Typography variant="h4">
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

                <ChartStats data={pokemonChartData.numbers} label={pokemonChartData.labels} />
            </Card>
        </Drawer>
    )
}
