import { Box,
         Modal, 
         Typography,
        } from '@mui/material';
import { OkButton,
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleSaveInternal } from '../styles'


type SaveChangesProps = {
    openSaveChanges: boolean;
    closeSaveChanges: (newData?: boolean) => void;
}
export default function SaveChanges( props: SaveChangesProps) {
    const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStylesGlobal();

    return (
        <Modal
        open={openSaveChanges} 
        onClose={() => closeSaveChanges()}
        > 
            <Box sx={modalStyleSaveExternal}>
                <Box sx={modalStyleSaveInternal}>
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