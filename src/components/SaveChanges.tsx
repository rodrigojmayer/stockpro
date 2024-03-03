import { Box,
         Modal, 
         Typography,
        } from '@mui/material';
import { OkButton,
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleSaveInternal } from '../Styles'


type SaveChangesProps = {
    openSaveChanges: boolean;
    closeSaveChanges: (newData?: boolean) => void;
    messageBeforeSave?: string;
}
export default function SaveChanges( props: SaveChangesProps) {
    const { openSaveChanges, closeSaveChanges, messageBeforeSave } = props;
    const { classes } = useStylesGlobal();
    // console.log("props: ", props)

    return (
        <Modal
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
                    <Box sx={modalStyleSaveInternal}>
                        <Typography align="center" variant="h6">
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