import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        maxWidth: 350,
        minHeight: 300,
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
    }
});

export default function Pokemon(props) {
    const classes = useStyles();
    const { name } = props.pokemon;
    const [pokemonData, setPokemonData] = useState();

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
                    <img src={pokemonData.sprites.front_default}></img>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            { 
                                `
                                    ${name.split('')[0].toUpperCase() + name.slice(1)}
                                ` 
                            }
                        </Typography>
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
                            to={{
                                pathname: `/pokemon/${name}`,
                                state: {info: pokemonData}
                            }}
                        >
                            View info
                        </Button>
                    </Link>
                </Card>
            }
        </Box>
    )
}


