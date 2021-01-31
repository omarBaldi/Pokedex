/* eslint-disable */
import './App.css';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import InputBox from './components/Inputbox';
import Pokemon from './components/Pokemon';
import PokemonInfo from './components/PokemonInfo';
import { Route } from 'react-router-dom';
import { Container, Grid, Select, MenuItem } from '@material-ui/core';

function App() {

	const [pokemonToSearch, setPokemonToSearch] = useState('');
	const [pokemonsArray, setPokemonsArray] = useState([]);
	const [filteredPokemonsArray, setFilteredPokemonsArray] = useState([]);
	const [pokemonGen, setPokemonGen] = useState(null || 1);

	const handleInputChange = (e) => {
		const currentText = e.target.value;
		setPokemonToSearch(currentText);
	}

	const getPokemons = async () => {
		const response = await axios({
			method: 'GET',
			url: `https://pokeapi.co/api/v2/generation/${pokemonGen}`
		});
		const { pokemon_species: pokemons } = response.data;
		return pokemons
	}

	const handlePokemonGenChange = (e) => {
		const gen = e.target.value; 
		setPokemonGen(gen);
	};

	useEffect(() => {
		(async () => {
			const pokemonsList = await getPokemons();
			setPokemonsArray(pokemonsList);
			setFilteredPokemonsArray(pokemonsList);
		})();
	}, [pokemonGen]);


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

			<Select
				value={pokemonGen}
				onChange={($event) => handlePokemonGenChange($event)}
				>
					{
						[
							{
								title: 'First gen',
								value: 1
							},
							{
								title: 'Second gen',
								value: 2
							},
							{
								title: 'Third gen',
								value: 3
							},
							{
								title: 'Fourth gen',
								value: 4
							},
							{
								title: 'Fifth gen',
								value: 5
							},
							{
								title: 'Sixth gen',
								value: 6
							},
						].map((gen, index) => {
							return (
								<MenuItem key={index} value={gen.value}>{ gen.title }</MenuItem>
							)
						})
					}
			</Select>

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
