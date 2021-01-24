import './App.css';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import InputBox from './components/Inputbox';
import Pokemon from './components/Pokemon';
import PokemonInfo from './components/PokemonInfo';
import { Route } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';

function App() {

	const [pokemonToSearch, setPokemonToSearch] = useState('');
	const [pokemonsArray, setPokemonsArray] = useState([]);
	const [filteredPokemonsArray, setFilteredPokemonsArray] = useState([]);

	const handleInputChange = (e) => {
		const currentText = e.target.value;
		setPokemonToSearch(currentText);
	}

	const getPokemons = async () => {
		const response = await axios({
			method: 'GET',
			url: 'https://pokeapi.co/api/v2/pokemon?limit=7'
		})
		
		const { results } = response.data;
		return results;
	}  

	useEffect(() => {
		(async () => {
		const pokemonsList = await getPokemons();
		setPokemonsArray(pokemonsList);
		setFilteredPokemonsArray(pokemonsList);
		})();
	}, []);

	useMemo(() => {
		if (!pokemonToSearch) {
			return setFilteredPokemonsArray(pokemonsArray);
		}

		const searchForPokemon = pokemonsArray.filter(pokemon => pokemon.name.includes(pokemonToSearch));
		setFilteredPokemonsArray(searchForPokemon);

	}, [pokemonToSearch])

	return (
		<Container>

			<InputBox onChangePokemon={handleInputChange} />

			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Grid container justify="center">
						{
							filteredPokemonsArray.map((pokemon, index) => {
								return (
									<div key={index}>
										<Pokemon pokemon={pokemon} />
									</div>
								)
							})
						}
					</Grid>
				</Grid>
			</Grid>

			<Route exact path="/pokemon/:name" component={PokemonInfo} />

		</Container>
	);
}

export default App;
