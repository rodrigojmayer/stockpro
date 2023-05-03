import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Container } from '@mui/material';
import { makeStyles } from 'tss-react/mui';


import { MenuButton } from './Buttons';


const useStyles = makeStyles()({
    appbar: {
        position: "fixed",
        left: 0,
        bottom: 0,
        backgroundColor: "rgb(18, 35, 46, 1)",
        // backgroundColor: "red",
        height: "64px",
        // width: `calc(100% - 100px) !important`,
        display: "flex",
        justifyContent: "center",
    },
    toolbar: {
        height: "64px",
        margin: "auto",
    },
    logo: {
        flexGrow: 1,
    },
    page: {
        // backgroundColor: "red",
            // overflowX: "hidden",
        // position: "relative",
        padding: "12px !important",
        margin: "0",

    },
    footer: {
        // position: "fixed",
        // position: "absolute",
        // bottom: 0,
        left: 0,
        bottom:  '64px',
        color: "white",
        backgroundColor: "rgb(255, 47, 47, .25)",
        height: "32px",
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
})


type MyComponentProps = React.PropsWithChildren<{}>;

export default function Layout({ children}: MyComponentProps) {
    const breakpointLG = useMediaQuery('(min-width:1024px)');

    const { classes } = useStyles()

    console.log(useStyles)

    return (
        <div>
            <AppBar className={classes.appbar}
                sx={{ top: (breakpointLG?0:"auto"), bottom: 0 }}
                >
                <Toolbar >
                    <Typography variant= "h6" className={classes.logo}>
                        StockPro
                    </Typography>
                    
                    <MenuButton></MenuButton>
                </Toolbar>
            </AppBar>
            <Container className={classes.page}
                sx={{
                    minHeight: `calc(100vh - ${(breakpointLG?"32px":"96px")})` }}
            >
                <div className={(breakpointLG?classes.toolbar:"")}></div>
                {children}
            </Container>
            <Typography 
                className={classes.footer}
                sx={{ marginBottom: (breakpointLG?"0":"64px") }}
            >
                Footer
            </Typography>
        </div>
    )
};
