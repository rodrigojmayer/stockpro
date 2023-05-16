import { makeStyles } from 'tss-react/mui';
import { Box,
         Modal, 
         Typography,
        } from '@mui/material';
import { OkButton,
         CancelButton, 
        } from './Buttons';

const useStyles = makeStyles()({
    finishButtons: {
        display: "flex",
        justifyContent:  "center",
        gap: 20,
        margin: "20px",
    },
})
const style = {
    position: 'absolute',
    display: "flex",
    justifyContent: "center",
    top: "40%",
    width: "100%",
    overflowX: "hidden",
};
const style2 = {
    top: 74,
    width: "220px",
    backgroundColor: "rgb(45,72, 91, 1)",
    borderRadius: "10px",
    margin: "auto",
    padding: "3px",
    color: "white",
    overflow: "scroll",
    overflowX: "hidden",
};
type SaveChangesProps = {
    openSaveChanges: boolean;
    closeSaveChanges: (newData?: boolean) => void;
}
export default function SaveChanges( props: SaveChangesProps) {
    const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStyles();

    return (
        <Modal
        open={openSaveChanges} 
        onClose={() => closeSaveChanges()}
        > 
            <Box sx={style}>
                <Box sx={style2}>
                    <Typography align="center" variant="h6">
                        Save changes?
                    </Typography>
                    <Box className={classes.finishButtons}>
                        <CancelButton
                        clicked={() => closeSaveChanges(false)}
                        />
                        <OkButton
                        clicked={() => closeSaveChanges(true)}
                        />
                    </Box> 
                </Box>
            </Box>
        </Modal>
    )
}