import React, { useState, useEffect } from 'react';
import { Fab } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    iconButton: {
        position: 'fixed',
        bottom: 15,
        right: 15
    },
});

export default function ScrollTopButton() {

    const [hideButton, sethideButton] = useState(false);
    const classes = useStyles();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (!hideButton && window.pageYOffset > 10000) {
                sethideButton(true)
            } else if (hideButton && window.pageYOffset <= 10000) {
                sethideButton(false)
            }
        });
    },)

    return (
        <>
            <Fab color="primary" onClick={scrollToTop} className={classes.iconButton} style={{ display: hideButton ? 'flex' : 'none' }}>
                <ArrowUpward />
            </Fab>
        </>
    )
}
