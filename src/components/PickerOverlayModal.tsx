// import { Box,
//          Modal, 
//          Typography,
//         } from '@mui/material';
// import { 
//          CancelButton, 
//         } from './Buttons';
// import { useStylesGlobal, modalStyleSaveExternal } from '../Styles'
// // import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { PickerOverlay } from 'filestack-react';
// import { useContext } from 'react';
// import { FilestackContext } from '../context/FilestackContext';

// type PickerOverlayModalProps = {
//     showPicker: boolean;
//     closePickerOverlayModal: (newData?: boolean) => void;
//     PickerOverlayData: string
// }
// export default function PickerOverlayModal( props: PickerOverlayModalProps) {
//     const { showPicker, closePickerOverlayModal, PickerOverlayData } = props;
//     const { classes } = useStylesGlobal();
//     let title = ""
//     let subTitle = ""
//     const navigate = useNavigate()

//     const { filestack, deleteFilesStock } = useContext<any>(FilestackContext);
//     const apiKey = filestack[0].apikey;
//     const signature = filestack[0].signature;
//     const policy = "eyJleHBpcnkiOjI3NjI0NjAwMDB9"; // The policy is always the same for for all the files for the date 2057-07-16
//     const handleClosePickerOverlayModal = () => {

//         closePickerOverlayModal()            
//         if (PickerOverlayData === "expired_validation") {
//             navigate('/signup')
//         }
//     }

//     return (
//         <Modal
//         sx={{backgroundColor: 'rgba(0, 0, 0, .5)'}}
//         open={showPicker} 
//         onClose={() => handleClosePickerOverlayModal()}
//         > 
//             <form
//                 onKeyDown={(e:any) => {
//                     if (e.key === "Enter" || e.code === "Space") {
//                         e.preventDefault();
//                         handleClosePickerOverlayModal();
//                         e.stopPropagation() 
//                     }
//                 }}
//             >
//                 <Box sx={modalStyleSaveExternal}>
                        
                
//                     <Box className={classes.customZIndexTop}>
//                         <PickerOverlay
                       
//                             apikey={apiKey}
//                             // onUploadDone={(res) => console.log(res)}
//                             // onUploadDone={(res filesUploaded) => console.log(res.filesUploaded[0])}
//                             // onUploadDone={(res: any) => console.log(res.filesUploaded[0].url)}
                            
//                             // resizeParams={{
//                             // transformOptions={{
//                             //     clientOptions={{
//                                 // actionOptions={{
//                             // // compressParams={{
//                             //     transformations: {
//                             //         convert: { 
//                                 // convertTransform={ { 
//                                 //             output:{
//                                 //                 format: "webp"
//                                 //             } 
//                                 //         }}
//                         //             } 
//                             //     }
//                             // }}
                            
//                             // onSuccess={(
//                             //     transformations: {
//                             //         convert: { 
//                             //                 output:{
//                             //                     format: "webp"
//                             //                 } 
//                             //             } 
//                             //     }
//                             // }}

//                             // transformOptions= {{

//                             // }}

//                             onUploadDone={(res: any) => {
//                                 if(imageUrlHandle){
//                                     console.log("There is already the imageUrlHandle: ", imageUrlHandle)
//                                     // setUnsavedImages((prevImages: string[]) => [...prevImages, imageUrlHandle])
//                                     onHandleUnsavedImages(imageUrlHandle)
//                                 }
//                                 // console.log("res.filesUploaded[0]: ", res.filesUploaded[0])
//                                 // onSetImageUrlHandle(res.filesUploaded[0].url)
//                                 // onSetImageUrlHandle(`https://cdn.filestackcontent.com/${res.filesUploaded[0].handle}`)
//                                 // onSetImageUrlHandle(`https://cdn.filestackcontent.com/auto_image/${res.filesUploaded[0].handle}`)
//                                 onSetImageUrlHandle(`${res.filesUploaded[0].handle}`)
//                                 // onSetImageUrlHandle(`https://cdn.filestackcontent.com/resize=w:30/auto_image/compress/${res.filesUploaded[0].handle}`)
//                                 // handleShowPicker()
//                             }}
                            
//                             pickerOptions={{
//                                 onClose: () => {
//                                     handleShowPicker()
//                                 },
//                                 lang: "es",
//                                 accept: ["image/*"],
                               
//                             //     transformations: {
//                             //         convert: {
//                             //     output: {
//                             //         format: 'png',
//                             //         quality: 1,
//                             //         blob: false, // export file as blob or url
//                             //         name: null, // output file name if null name will be extracted from url or file element
//                             //       },
//                             //     }
//                             // }
//                                 // outputParams: {
//                                 //     format: 'webp'
//                                 // }
//                                 // maxSize:25,
//                                 // minifyJs:{

//                                 //     transform: {
//                                 //     output:{
    
//                                 //         format: 'webp'
//                                 //     }   
//                                 // }
                                        

//                                 // transformations: {
//                                 //     outformat: {
//                                 //         format: 'webp'
//                                 //     }
//                                 // }
//                                 // transformations: {
//                                 // //     compress:true
//                                 //     // convert: {
//                                 //     //     output:{
//                                 //     //         format: "webp"
//                                 //     //     }
//                                 //     // }
//                                 //     crop: {
//                                 //         aspectRatio: 1,
//                                 //         force: true
//                                 //       }
//                                 // },
//                                 // actionOptions: {

//                                 // },
//                                 // uploadConfig: {
//                                     // outputParams:{
//                                         // transformations: {
//                                             // output: {
//                                                         //  format: 'zip'
//                                                         //  }
//                                         //   }
//                                     // },
//                                 //     transformations: {
//                                             // output:{
//                                 //                 // format: "webp"
//                                 //             // }
//                                 //         } 
//                                 // transformOptions: {
//                                 // transformations: {
//                                             // convert: { 
//                                                     // output:{
//                                                         // format: "webp"
//                                     //                 } 
//                                     //             } 
//                                         // }
//                                 // }
//                                     // conversion: {
//                                     //     output: {
//                                     //         format: 'webp' // Specify the desired output format here
//                                     //     }
//                                     // }
                                
//                             }}
//                             // convert={{
//                             //     output:{
//                             //         format: "webp"
//                                 // }
//                             // }} 
//                             // Filelink ={{
//                             //     transformations: {
//                             //         crop: {
//                             //             aspectRatio: 16/9
//                             //         },
//                             //         convert: {
//                                         // output: {
//                                         //     format: 'webp' // Specify the desired output format here
//                                         // }
//                             //         }
//                             // //     }
//                             // }}

//                         />
//                     </Box>
//                 </Box>
//             </form>
//         </Modal>
//     )
// }