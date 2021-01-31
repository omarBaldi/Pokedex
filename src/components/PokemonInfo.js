/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { 
    Drawer,
    Card, CardContent, 
    Typography, 
    List, ListItem, ListItemIcon, ListItemText,
    Divider, 
    IconButton, 
    Tooltip,
    Box
} from '@material-ui/core';
import { Star as StarFull, StarBorderOutlined as StarEmpty, SubdirectoryArrowRight as Arrow } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ChartStats from './Chart';

const useStyles = makeStyles({
    root: {
      minWidth: 500,
      maxWidth: 550,
      height: 'inherit',
      textAlign: 'center',
      position: 'relative',
      overflowY: 'scroll'
    },
    abilitiesContainer: {
        width: '100%',
    },
    imagePokemon: {
        minWidth: 130,
        marginBottom: -25
    },
    starIcon: {
        position: 'absolute',
        top: 10,
        right: 25,
    },
    starShiny: {
        color: 'yellow'
    },
    cardStyle: {
        minWidth: 130,
        maxHeight: 95,
        height: 'auto',
        borderRadius: '25px',
        boxShadow: '1px 1px 2px 1px #888888'
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

                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    m={4}
                >
                    {
                        [
                            {
                                title: 'Height',
                                data: pokemonInfo.height
                            },
                            {
                                title: 'Weight',
                                data: pokemonInfo.weight
                            },
                            {
                                title: 'Experience',
                                data: pokemonInfo.base_experience
                            }
                        ].map((item, index) => {
                            return (
                                <Box key={index} mr={2} ml={2}>
                                    <Card className={classes.cardStyle}>
                                        <CardContent>
                                            <Typography gutterBottom color="textSecondary">
                                                {item.title}
                                            </Typography>
                                            <Typography gutterBottom variant="h5">
                                                {item.data}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>  
                            )
                        })
                    }
                </Box>

                <Divider />

                
                <Box mb={8}>
                    <List>
                        <Box textAlign="left" mb={4} ml={2}>
                            <Typography variant="h5">Pokemon abilities</Typography>
                        </Box>

                        {
                            pokemonInfo.abilities.map((ability, index) => {
                                return (
                                    <Box  key={index} ml={7}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Arrow />
                                            </ListItemIcon>
                                        
                                            <ListItemText>
                                                <Typography variant="h5">
                                                    {ability.ability.name}
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>
                                        {/* Insert pokemon ability description */}
                                    </Box>
                                )
                            })
                        }
                    </List>
                </Box>

                <ChartStats data={pokemonChartData.numbers} label={pokemonChartData.labels} />
            </Card>
        </Drawer >
    )
}
