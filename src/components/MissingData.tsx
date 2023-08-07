import { Box,
         Modal, 
         Typography,
        } from '@mui/material';
import { OkButton,
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleMissingDataInternal } from '../Styles'


type MissingDataProps = {
    openMissingData: boolean;
    closeMissingData: (newData?: boolean) => void;
}
export default function MissingData( props: MissingDataProps) {
    const { openMissingData, closeMissingData } = props;
    const { classes } = useStylesGlobal();

    return (
        <Modal
        open={openMissingData} 
        onClose={() => closeMissingData()}
        > 
            <Box sx={modalStyleSaveExternal}>
                <Box sx={modalStyleMissingDataInternal}>
                    <Typography align="center" variant="h6">
                        Missing required data
                    </Typography>
                    <Typography align="center" >
                        Name*
                    </Typography>
                    <Box className={classes.finishButtons}>
                        <CancelButton
                        clicked={() => closeMissingData(false)}
                        />
                    </Box> 
                </Box>
            </Box>
        </Modal>
    )
}