import * as React from 'react';
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { MenuButton } from './Buttons';
import MenuOptions from './MenuOptions';
import Fields from './Fields';
import Alerts from './Alerts';
import Profile from './Profile';
import { ColumnData, DataMenuOptions } from '../types';
import Preferences from './Preferences';
import Users from './Users';

const useStyles = makeStyles()({
    appbar: {
        position: "fixed",
        left: 0,
        bottom: 0,
        backgroundColor: "rgb(18, 35, 46, 1)",
        height: "64px",
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
        padding: "12px !important",
        margin: "0",

    },
    footer: {
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
const INITIAL_MENU_OPTIONS = {
    fields: false,
    alerts: false,
    massive: false,
    users: false,
    profile: false,
    preferences: false
}
type MyComponentProps = React.PropsWithChildren<{}>;

interface LayoutProps {
    // columns: ColumnData[]
    columnsDefault: ColumnData[]
    columnsCustom: ColumnData[]
    idColumnsTableOrder: Number[]
    // columnsHiddenFields: ColumnData[]
    children: React.ReactNode
    // showCreataddButtonShoweStock: boolean
  }


// export default function Layout( {children, columnsDefault, columnsCustom, idColumnsTableOrder, showCreateStock}: LayoutProps) {
export default function Layout( 
    {   children, 
        columnsDefault, 
        columnsCustom, 
        idColumnsTableOrder
    }: LayoutProps) {
    // export default function Layout( {children, columns}: MyComponentProps) {
    const breakpointLG = useMediaQuery('(min-width:1024px)');
    const { classes } = useStyles()
    const [test, setTest] = useState(false)
    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = () => setOpenMenu(true);
    const handleCloseMenu = () => setOpenMenu(false);
    const [openOptions, setOpenOptions] = useState<DataMenuOptions>(INITIAL_MENU_OPTIONS);

    
  
    const handleOpenOptions = (newData:  {option: string, open: boolean}) => {
            setOpenOptions({...openOptions, [newData.option]: newData.open});
    }
    const handleCloseOptions = () => {
        for(const [key, value] of Object.entries(openOptions)) {
            if (value){
                setOpenOptions({ ...openOptions, [key]: false})
                break;
            }
        }
    }
    
    useEffect(() => {
        // console.log("Layout columns: ", columns)
    }, [openMenu])
    return (
        <div>
            <MenuOptions
                 open={openMenu} 
                 handleClose={handleCloseMenu} 
                 onData = {handleOpenOptions}
            /> 
            <Fields 
                open={openOptions.fields} 
                handleClose={handleCloseOptions}  
            /> 
            <Alerts
                 open={openOptions.alerts} 
                 handleClose={handleCloseOptions} 
            /> 
            <Profile
                open={openOptions.profile}
                handleClose={handleCloseOptions} 
            />
            <Preferences
                open={openOptions.preferences}
                handleClose={handleCloseOptions} 
            />
            <Users
                open={openOptions.users}
                handleClose={handleCloseOptions} 
            />
            <AppBar className={classes.appbar}
                sx={{ top: (breakpointLG?0:"auto"), bottom: 0 }}
                >  
                <Toolbar >
                    <Typography variant= "h6" className={classes.logo}>
                        StockPro
                        {test}
                    </Typography>
                    <MenuButton
                    onDataChanged={handleOpenMenu}
                    ></MenuButton>
                </Toolbar>
            </AppBar>
            <Container className={classes.page}
                sx={{
                    minHeight: `calc(100vh - ${(breakpointLG?"32px":"96px")})` }}
            >
                <div className={(breakpointLG?classes.toolbar:"")}></div>
                {children}
            </Container>
        </div>
    )
};