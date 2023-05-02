
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


import { makeStyles } from 'tss-react/mui';


const useStyles = makeStyles()({
    appbar: {
        // backgroundColor: "warning",
        // backgroundColor: "red",
        height: "64px",
        // width: `calc(100% - 100px) !important`,
    },
    toolbar: {
        height: "64px",
    },
    page: {
        // backgroundColor: "blue",
    }
})


type MyComponentProps = React.PropsWithChildren<{}>;

export default function Layout({ children}: MyComponentProps) {
    
    const { classes } = useStyles()


    return (
        <div>
            <AppBar className={classes.appbar}>
                <Toolbar >
                    <Typography variant= "h6" >StockPro</Typography>

                </Toolbar>
            </AppBar>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>

        </div>
    )
};
