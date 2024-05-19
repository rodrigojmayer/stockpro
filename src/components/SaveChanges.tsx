import { useContext } from 'react';
import { Box,
         Modal, 
         Typography,
        } from '@mui/material';
import { OkButton,
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleSaveInternal } from '../Styles'
import { UserContext } from '../context/UserContext';


type SaveChangesProps = {
    openSaveChanges: boolean;
    closeSaveChanges: (newData?: boolean) => void;
    messageBeforeSave?: string;
}
export default function SaveChanges( props: SaveChangesProps) {
    const { openSaveChanges, closeSaveChanges, messageBeforeSave } = props;
    const { classes } = useStylesGlobal();
    const { user } = useContext<any>(UserContext);
    // console.log("props: ", props)

    return (
        <Modal
        className={classes.modal_external_background}
        open={openSaveChanges} 
        onClose={() => closeSaveChanges()}
        > 
            <form
                onKeyDown={(e:any) => {
                    if (e.key === "Enter") {
                        
                        e.preventDefault();
                        closeSaveChanges(true); // Call your save function
                        e.stopPropagation()
                    }
                }}
            >
                <Box sx={modalStyleSaveExternal}>
                    <Box 
                        sx={{ ...modalStyleSaveInternal }}
                        className={`${classes[`_${user.background_color}main_background_color` as keyof typeof classes]} ${classes[`_${user.background_color}modal_color` as keyof typeof classes]}`}
                    >
                        <Typography align="center" variant="h6" className={classes.title}>
                            Save changes?
                        </Typography>
                        <Typography align="center" >
                            {messageBeforeSave}
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
            </form>
        </Modal>
    )
}