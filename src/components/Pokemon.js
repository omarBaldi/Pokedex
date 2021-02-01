/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, IconButton, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RotateIcon from '@material-ui/icons/RotateRight';

const useStyles = makeStyles({
    root: {
        maxWidth: 350,
        minHeight: 400,
        position: 'relative'
    },
    button: {
        position: 'absolute',
        bottom: 0,
        borderRadius: 0,
        border: 'none',
        borderTop: '1px solid lightgrey',
        color: '#222',
        '&:hover': {
            background: "lightgrey",
        },
    },
    iconRotate: {
        position: 'absolute',
        top: 0,
        right: 10
    },
    chipGroup: {
        marginBottom: 20,
        marginTop: 20,
        '& > *': {
            marginRight: 5,
        },
    }
});

export default function Pokemon(props) {
    const classes = useStyles();
    const { name } = props.pokemon;
    const [pokemonData, setPokemonData] = useState();
    const [pokemonBack, setPokemonBack] = useState(false);

    const getPokemon = async () => {
        const response = await axios({
          method: 'GET',
          url: `https://pokeapi.co/api/v2/pokemon/${name}`
        })
        
        return response.data;
    } 

    const getPokemonDescription = async (currentURL) => {
        const response = await axios({
            method: 'GET',
            url: currentURL
        })

        const { flavor_text_entries: allLanguageDescriptions } = response.data;
        const descriptionEN = allLanguageDescriptions.find((x => x.language.name === 'en'));
          
        return descriptionEN.flavor_text
    };
    
    useEffect(() => {
        (async () => {
            const pokemonData = await getPokemon();
            const pokemonDescription = await getPokemonDescription(pokemonData.species.url);
            pokemonData["pokemonDescription"] = pokemonDescription;
            setPokemonData(pokemonData);
        })();
    }, [name])

    return (
        <Box mt={3} mr={2} ml={2} mb={5}>
            {
                pokemonData &&
                <Card className={classes.root}>
                    <img src={!pokemonBack ? pokemonData.sprites.front_default : pokemonData.sprites.back_default} alt=""></img>
                    <CardContent>
                        <IconButton className={classes.iconRotate} onClick={() => setPokemonBack((value) => !value)}>
                            <RotateIcon />
                        </IconButton>
                        <Typography variant="h4">
                            #{pokemonData.id}
                        </Typography>
                        <Typography gutterBottom variant="h5">
                            { 
                                `
                                    ${name.split('')[0].toUpperCase() + name.slice(1)}
                                ` 
                            }
                        </Typography>
                        <div className={classes.chipGroup}>
                            {
                                pokemonData.types.map((type, index) => {
                                    return (
                                        <Chip key={index} label={type.type.name} mr={2}/>
                                    )
                                })
                            }
                        </div>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {pokemonData.pokemonDescription}
                        </Typography>
                    </CardContent>
                    <Link 
                        to={{
                            pathname: `/pokemon/${name}`,
                            state: {info: pokemonData}
                        }}
                    >
                        <Button
                            size="large"
                            className={classes.button}
                            fullWidth={true}
                            variant="outlined"
                        >
                            View info
                        </Button>
                    </Link>
                </Card>
            }
        </Box>
    )
}


