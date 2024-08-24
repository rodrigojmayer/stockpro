import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { MenuButton, PlusButton, UpdateButton } from './Buttons';
import MenuOptions from './MenuOptions';
// import Fields from './Fields';
// import Alerts from './Alerts';
import Profile from './Profile';
import { ColumnData, Data, DataMenuOptions } from '../types';
import Preferences from './Preferences';
import Users from './Users';
import MainSearch from './MainSearch';
import { useStylesGlobal } from '../Styles';
// import MassiveUpdateStock from './MassiveUpdateStock';
import { UserContext } from '../context/UserContext';

const INITIAL_MENU_OPTIONS = {
    fields: false,
    alerts: false,
    massive: false,
    users: false,
    profile: false,
    preferences: false
}
type MyComponentProps = React.PropsWithChildren<{}>;

interface ModalsGroupProps {
    // columns: ColumnData[]
    columnsDefault: ColumnData[]
    columnsCustom: ColumnData[]
    idColumnsTableOrder: Number[]
    data: Data[]
    // columnsHiddenFields: ColumnData[]
    children: React.ReactNode
    // showCreataddButtonShoweStock: boolean
    setSearchQuery: (value: string) => void;
    openMassiveUpdateStock: (value: string) => void;
    disabledUpdateButton: boolean;
    openCreateStock: () => void;
  }


// export default function ModalsGroup( {children, columnsDefault, columnsCustom, idColumnsTableOrder, showCreateStock}: ModalsGroupProps) {
export default function ModalsGroup( 
    {   children, 
        columnsDefault, 
        columnsCustom, 
        idColumnsTableOrder,
        data,
        setSearchQuery,
        openMassiveUpdateStock,
        disabledUpdateButton,
        openCreateStock,
    }: ModalsGroupProps) {
    // export default function ModalsGroup( {children, columns}: MyComponentProps) {
    const breakpointLG = useMediaQuery('(min-width:1024px)');
    const { classes } = useStylesGlobal()
    const { user } = useContext<any>(UserContext);
    const [test, setTest] = useState(false)
    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = () => setOpenMenu(true);
    const handleCloseMenu = () => setOpenMenu(false);
    const [openOptions, setOpenOptions] = useState<DataMenuOptions>(INITIAL_MENU_OPTIONS);
    // const [ searchQuery, setSearchQuery ] = useState("")
    
  
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
    
    // useEffect(() => {
    //     // console.log("ModalsGroup columns: ", columns)
    // }, [openMenu])
    return (
        <div>
            <MenuOptions
                 open={openMenu} 
                 handleClose={handleCloseMenu} 
                 onData = {handleOpenOptions}
            /> 
            {/* <Fields 
                open={openOptions.fields} 
                handleClose={handleCloseOptions}  
            />  */}
            {/* <Alerts 
                 open={openOptions.alerts} 
                 handleClose={handleCloseOptions} 
            />  */}
            {/* <MassiveUpdateStock
                open={openOptions.massive}
                handleClose={handleCloseOptions} 
                data={data} 
            /> */}
            <Users
                open={openOptions.users}
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
            <AppBar 
                // className={`${classes.menu_appbar} ${classes._0main_background_colorDD}`}
                // className={`${classes.menu_appbar} ${classes[`_${user.background_color}main_background_colorDD` as keyof typeof classes]}`}
                className={`${classes.menu_appbar} ${classes[`_${user.background_color}main_background_colorDD` as keyof typeof classes]} ${classes[`_${user.background_color}main_colorDD` as keyof typeof classes]}`}
                sx={{ top: (breakpointLG?0:"auto"), bottom: 0 }}
            >  
                <Toolbar >
                    <Grid container  >
                        <Grid item xs={10} md={3} lg={2}  sx={{ marginTop: "7px"}}>
                            <Typography variant= "h6" className={classes.menu_logo}>
                                StockPro (Beta)
                                {test}
                            </Typography>
                        </Grid>
                        <Grid item xs={0} md={8} lg={9} >
                            {/* <Container sx={{ marginTop: "7px", display: (breakpointLG?"block":"none") }}>
                                <MainSearch setSearchQuery={setSearchQuery} />
                            </Container> */}
                            <Container 
                                maxWidth="md" 
                                style={{padding: "0"}} 
                                sx={{ marginTop: "7px", display: (breakpointLG?"block":"none") }}
                            >
                                <Grid container>
                                    <Grid item xs={1} >
                                        <UpdateButton
                                            clicked={()=>openMassiveUpdateStock("update")}
                                            disabled={disabledUpdateButton}
                                        />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <MainSearch setSearchQuery={setSearchQuery} />
                                    </Grid>
                                    <Grid item xs={1} >
                                        <PlusButton
                                            clicked={openCreateStock}
                                        />
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                        <Grid item xs={2} md={1} >
                            <MenuButton
                                onDataChanged={handleOpenMenu}
                            ></MenuButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Container className={classes.menu_page}
                sx={{
                    minHeight: `calc(100vh - ${(breakpointLG?"32px":"96px")})` }}
            >
                <div className={(breakpointLG?classes.menu_toolbar:"")}></div>
                {children}
            </Container>
        </div>
    )
};