import { useState, useEffect, SetStateAction, Dispatch, useContext } from 'react';
import { Box, 
         Modal, 
         Typography, 
        } from '@mui/material';
import { CancelButton, OkButton } from './Buttons';
import { useStylesGlobal, modalStyleInternal, modalStyleExternal, modalStyleInternalConfirmTermsAndPrivacy } from '../Styles'
import { UserContext } from '../context/UserContext';
import { LanguageLabelsContext } from '../context/LanguageLabelsContext';

type ConfirmTermsAndPrivacyModalProps = {
    openConfirmTermsAndPrivacyModal: boolean;
    closeConfirmTermsAndPrivacyModal: (newData?: boolean) => void;
    handleSetTermsAndPrivacy:  Dispatch<SetStateAction<boolean>>;
}

// Mapping object
// languagechangessearch
const componentMap: { [key: string]: React.ComponentType } = {
    "EnglishTerms": EnglishTerms,
    "SpanishTerms": SpanishTerms,
    "DanishTerms": DanishTerms,
    "ItalianTerms": ItalianTerms,
    // Add more components here
};

export default function ConfirmTermsAndPrivacyModal( props: ConfirmTermsAndPrivacyModalProps) {
    const { openConfirmTermsAndPrivacyModal, closeConfirmTermsAndPrivacyModal, handleSetTermsAndPrivacy } = props;
    const { classes } = useStylesGlobal();
    const { user } = useContext<any>(UserContext);
    const { labelsConfirmTermsAndPrivacy } = useContext<any>(LanguageLabelsContext)
    const handleOkButton = async() => {
        handleSetTermsAndPrivacy(true)
        closeConfirmTermsAndPrivacyModal(true)
    };
    const handleCancel = async() => {
        handleSetTermsAndPrivacy(false)
        closeConfirmTermsAndPrivacyModal(true)
    };
    
    const TermsComponent = componentMap[labelsConfirmTermsAndPrivacy.terms] || null;
    
    return (
        <Modal
        className={classes.modal_external_background}
            open={openConfirmTermsAndPrivacyModal} 
            onClose={() => closeConfirmTermsAndPrivacyModal()}
        >
            <Box sx={modalStyleExternal}>
                <Box 
                    sx={{ ...modalStyleInternal }}
                    className={`${classes[`_${user.background_color}main_background_color` as keyof typeof classes]} ${classes[`_${user.background_color}modal_color` as keyof typeof classes]}`}
                >
                    <Box 
                        margin="5px"
                        component="div"
                        sx={{
                            maxHeight: "400px",
                            px: 1.5,
                            pb: 1.5,
                            bgcolor: (theme) =>
                            //   theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
                              theme.palette.mode === 'dark' ? '#101010' : 'rgb(255,255, 255, .1)',
                            color: (theme) =>
                            //   theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                theme.palette.mode === 'dark' ? 'grey.300' : 'rgb(255,255, 255, 1)',
                            border: '1px solid',
                            borderColor: (theme) =>
                            //   theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                                theme.palette.mode === 'dark' ? 'grey.800' : 'rgb(55,55, 55, 1)',
                            borderRadius: 3,
                            // overflow: 'hidden', // Hide any overflow
                            overflowY: 'auto', // Show scrollbar on hover
                            overflowX: 'hidden',
                            paddingRight: '20px',
                            scrollbarColor: 'rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
                            scrollbarWidth: 'thin', // Hide scrollbar for Firefox
                            '&:hover': {
                                scrollbarColor: 'rgba(0, 0, 0, .3) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
                                overflowY: 'auto', // Show scrollbar on hover
                                // paddingRight: '10px',
                                overflowX: 'hidden',
                            },
                            '& p': {
                                margin: '0',
                                fontSize: '1rem',
                                lineHeight: '1.4rem', 
                            },
                            '& ul, li, ol': {
                                margin: '0',
                                marginLeft: '10px',
                                fontSize: '1rem',
                                lineHeight: '1.4rem', 
                            },
                            '& h2, h3, h4, h5': {
                                margin: '10px 0 5px 0',
                            },
                            '& h5': {
                                fontSize: '1.2rem',
                            },
                        }}
                    >
                        {/* <EnglishTerms/> */}
                        {/* <SpanishTerms/> */}
                        { TermsComponent && <TermsComponent/> }
                    </Box>
                    <Box className={classes.finishButtons}>
                        <CancelButton
                            clicked={() => handleCancel()}
                        />
                        <OkButton
                            clicked={() => handleOkButton()}
                        />
                    </Box> 
                </Box>
            </Box>
        </Modal>
    )
}

function EnglishTerms() {
    return (
        <>
            <h2>Privacy Policy</h2>
            <p>Last updated: March 11, 2024</p>
            <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
            <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank">Privacy Policy Generator</a>.</p>
            <h3>Interpretation and Definitions</h3>
            <h4>Interpretation</h4>
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            <h4>Definitions</h4>
            <p>For the purposes of this Privacy Policy:</p>
            <ul>
                <li>
                    <p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
                </li>
                <li>
                    <p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
                </li>
                <li>
                    <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to StockPro.</p>
                </li>
                <li>
                    <p><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</p>
                </li>
                <li>
                    <p><strong>Country</strong> refers to:  Denmark</p>
                </li>
                <li>
                    <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
                </li>
                <li>
                    <p><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
                </li>
                <li>
                    <strong>Service</strong> refers to the Website.
                </li>
                <li>
                    <p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p>
                </li>
                <li>
                    <p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
                </li>
                <li>
                    <p><strong>Website</strong> refers to StockPro, accessible from <a href="https://stockpro-deploy.onrender.com/" rel="external nofollow noopener" target="_blank">https://stockpro-deploy.onrender.com/</a></p>
                </li>
                <li>
                    <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
                </li>
            </ul>
            <h3>Collecting and Using Your Personal Data</h3>
            <h4>Types of Data Collected</h4>
            <h5>Personal Data</h5>
            <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
            <ul>
                <li>
                    <p>Email address</p>
                </li>
                <li>
                    <p>First name and last name</p>
                </li>
                <li>
                <p>Usage Data</p>
                </li>
            </ul>
            <h5>Usage Data</h5>
            <p>Usage Data is collected automatically when using the Service.</p>
            <p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
            <p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
            <p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
            <h5>Tracking Technologies and Cookies</h5>
            <p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</p>
            <ul>
                <li><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</li>
                <li><strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</li>
            </ul>
            <p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. You can learn more about cookies on <a href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies" target="_blank">TermsFeed website</a> article.</p>
            <p>We use both Session and Persistent Cookies for the purposes set out below:</p>
            <ul>
                <li>
                    <p><strong>Necessary / Essential Cookies</strong></p>
                    <p>Type: Session Cookies</p>
                    <p>Administered by: Us</p>
                    <p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
                </li>
                <li>
                    <p><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
                    <p>Type: Persistent Cookies</p>
                    <p>Administered by: Us</p>
                    <p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
                </li>
                <li>
                    <p><strong>Functionality Cookies</strong></p>
                    <p>Type: Persistent Cookies</p>
                    <p>Administered by: Us</p>
                    <p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
                </li>
            </ul>
            <p>For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.</p>
            <h4>Use of Your Personal Data</h4>
            <p>The Company may use Personal Data for the following purposes:</p>
            <ul>
                <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
                <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
                <li><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
                <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
                <li><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</li>
                <li><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
                <li><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</li>
                <li><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</li>
            </ul>
            <p>We may share Your personal information in the following situations:</p>
            <ul>
                <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service,  to contact You.</li>
                <li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
                <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
                <li><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
                <li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</li>
                <li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</li>
            </ul>
            <h4>Retention of Your Personal Data</h4>
            <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
            <p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
            <h4>Transfer of Your Personal Data</h4>
            <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
            <p>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
            <p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
            <h4>Delete Your Personal Data</h4>
            <p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
            <p>Our Service may give You the ability to delete certain information about You from within the Service.</p>
            <p>You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.</p>
            <p>Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.</p>
            <h4>Disclosure of Your Personal Data</h4>
            <h5>Business Transactions</h5>
            <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
            <h5>Law enforcement</h5>
            <p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
            <h5>Other legal requirements</h5>
            <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
            <ul>
                <li>Comply with a legal obligation</li>
                <li>Protect and defend the rights or property of the Company</li>
                <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>Protect the personal safety of Users of the Service or the public</li>
                <li>Protect against legal liability</li>
            </ul>
            <h4>Security of Your Personal Data</h4>
            <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
            <h3>Children's Privacy</h3>
            <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</p>
            <p>If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</p>
            <h3>Links to Other Websites</h3>
            <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
            <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
            <h3>Changes to this Privacy Policy</h3>
            <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
            <p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
            <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            <h3>Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, You can contact us:</p>
            <ul>
                <li>By email: stockpro.assistance@gmail.com</li>
            </ul>
        </>
    )
}

function SpanishTerms() {
    return (
        <>
            <h2>Política de Privacidad</h2>
            <p>Última actualización: 11 de Marzo de 2024</p>
            <p>Esta Política de Privacidad describe nuestras políticas y procedimientos sobre la recopilación, uso y divulgación de su información cuando utiliza el Servicio y le informa sobre sus derechos de privacidad y cómo la ley lo protege.</p>
            <p>Utilizamos sus datos personales para proporcionar y mejorar el servicio. Al utilizar el servicio, Usted acepta la recopilación y el uso de información de acuerdo con esta Política de Privacidad. Esta Política de Privacidad ha sido creada con la ayuda de <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank">Generador de Políticas de Privacidad</a>.</p>
            <h3>Interpretación y definiciones</h3>
            <h4>Interpretación</h4>
            <p>Las palabras cuya letra inicial está en mayúscula tienen significados definidos bajo las siguientes condiciones. Las siguientes definiciones tendrán el mismo significado independientemente de que aparezcan en singular o en plural.</p>
            <h4>Definiciones</h4>
            <p>Para los efectos de esta Política de Privacidad:</p>
            <ul>
                <li>
                    <p><strong>Cuenta</strong> significa una cuenta única creada para que Usted acceda a nuestro Servicio o partes de nuestro Servicio.</p>
                </li>
                <li>
                    <p><strong>Afiliado</strong> significa una entidad que controla, es controlada por o está bajo control compun con una parte, donde &quot;controlar&quot; significa propiedad del 50% o más de las acciones, participación accionaria u otros valores con derecho a botar para la elección de directores u otra autoridad administrativa.</p>
                </li>
                <li>
                    <p><strong>Compañía</strong> (denominada &quot;la Compañía&quot;, &quot;Nosotros&quot; o &quot;Nuestro&quot; en este Acuerdo) se refiere a StockPro.</p>
                </li>
                <li>
                    <p><strong>Cookies</strong> son pequeños archivos que se colocan en su computadora, dispositivo móvil o cualquier otro dispositivo por un sitio web, que contiene los detalles de su historial de navegación en ese sitio web entre sus muchos usos.</p>
                </li>
                <li>
                    <p><strong>País</strong> se refiere a:  Denmark</p>
                </li>
                <li>
                    <p><strong>Dispositivo</strong> significa cualquier dispositivo que pueda acceder al Servicio, como una computadora, un teléfono celular o una tableta digital.</p>
                </li>
                <li>
                    <p><strong>Información personal</strong> es cualquier información que se relaciona con un individuo identificado o identificable.</p>
                </li>
                <li>
                    <strong>Servicio</strong> se refiere al sitio web.
                </li>
                <li>
                    <p><strong>Proveedor de servicio</strong> significa cualquier persona física o jurídica que procese los datos por cuenta de la Compañía. Se refiere a empresas de terceros o personas empleadas por la Compañía para facilitar el Servicio, para proporcionar el Servicio en nombre de la Compañía, para realizar servicios relacionados con el Servicio o para ayudar a la Compañía a analizar cómo se utiliza el Servicio.</p>
                </li>
                <li>
                    <p><strong>Datos de uso</strong> se refiere a datos recopilados automáticamente, ya sea generado por el uso del Servicio o por la propia infraestructura del Servicio (por ejemplo, la duración de una visita a la página).</p>
                </li>
                <li>
                    <p><strong>Sitio web</strong> se refiere a StockPro, accesible desde <a href="https://stockpro-deploy.onrender.com/" rel="external nofollow noopener" target="_blank">https://stockpro-deploy.onrender.com/</a></p>
                </li>
                <li>
                    <p><strong>Tu</strong> significa la persona que accede o utiliza el Servicio, o la compañía, u otra entidad legal en nombre de la cual dicha persona accede o utiliza el Servicio, según corresponda.</p>
                </li>
            </ul>
            <h3>Recopilación y uso de sus datos personales</h3>
            <h4>Tipos de datos recopilados</h4>
            <h5>Información personal</h5>
            <p>Mientras usa nuestro servicio, Es posible que le solicitemos que nos proporcione cierta información de identificación personal que pueda usarse para contactarlo o identificarlo. La información de identificación personal puede incluir, entre otras:</p>
            <ul>
                <li>
                    <p>Dirección de correo electrónico</p>
                </li>
                <li>
                    <p>Nombre y apellido</p>
                </li>
                <li>
                <p>Datos de uso</p>
                </li>
            </ul>
            <h5>Datos de uso</h5>
            <p>Los datos de uso se recopilan automáticamente cuando se utiliza el Servicio.</p>
            <p>Los datos de uso pueden incluir información como la dirección de protocolo de Internet de su dispositivo (p.ej. dirección IP), tipo de navegador, versión del navegador, las páginas de nuestro Servicio que usted visita, la hora y fecha de su visita, el tiempo pasado en esas páginas, identificadores únicos de dispositivos y otros datos de diagnóstico.</p>
            <p>Cuando accede al Servicio mediante o a través de un dispositivo móvil, podemos recopilar cierta información automáticamente, incluyendo, entre otros, el tipo de dispositivo móvil que utiliza, la identificación única de su dispositivo móvil, la dirección IP de su dispositivo móvil, su sistema operativo móvil, el tipo de navegador de Internet móvil que utiliza, identificadores únicos de dispositivo y otros datos de diagnóstico.</p>
            <p>También podemos recopilar información que su navegador envía cada vez que visita nuestro Servicio o cuando accede al Servicio mediante un dispositivo móvil.</p>
            <h5>Tecnologías de seguimiento y cookies</h5>
            <p>Utilizamos cookies y tecnologías de seguimiento similares para rastrear la actividad en Nuestro Servicio y almacenar cierta información. Las tecnologías de seguimiento utilizadas son balizas, etiquetas y scripts para recopilar y rastrear información y mejorar y analizar Nuestro Servicio. Las tecnologías que utilizamos pueden incluir:</p>
            <ul>
                <li><strong>Cookies o cookies del navegador.</strong> Una cookie es un pequeño archivo colocado en su dispositivo. Puede indicarle a su navegador que rechace todas las cookies o que indique cuándo se envía una cookie. Sin embargo, si no acepta las cookies, es posible que no pueda utilizar algunas partes de nuestro Servicio. A menos que haya ajustado la configuración de su navegador para que rechace cookies, nuestro Servicio puede utilizar cookies.</li>
                <li><strong>Balizas web.</strong> Ciertas secciones de nuestro Servicio y nuestros correos electrónicos pueden contener pequeños archivos electrónicos conocidos como balizas web (también conocidos como gifs transparentes, etiquetas de píxel y gifs de un solo píxel) que permiten a la Compañía, por ejemplo, contar los usuarios que han visitado esas páginas. o abrió un correo electrónico y para otras estadísticas relacionadas con el sitio web (por ejemplo, registrar la popularidad de una determinada sección y verificar la integridad del sistema y del servidor).</li>
            </ul>
            <p>Las cookies pueden ser &quot;Persistentes&quot; o de &quot;Sesión&quot;. Las cookies persistentes permanecen en su computadora personal o dispositivo móvil cuando se desconecta, mientras que las cookies de sesión se eliminan tan pronto como cierra su navegador web. Puede obtener más información sobre las cookies en el artículo <a href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies" target="_blank">sitio web TermsFeed</a>.</p>
            <p>Utilizamos cookies de sesión y persistentes para los fines que se detallan a continuación:</p>
            <ul>
                <li>
                    <p><strong>Cookies necesarias/esenciales</strong></p>
                    <p>Tipo: Cookies de sesión</p>
                    <p>Administrado por: Nosotros</p>
                    <p>Propósito: Estas cookies son esenciales para brindarle los servicios disponibles a través del sitio web y permitirle utilizar algunas de sus funciones. Ayudan a autenticar a los usuarios y evitar el uso fraudulento de cuentas de usuario. Sin estas Cookies, no se pueden proporcionar los servicios que ha solicitado y solo utilizamos estas Cookies para brindarle esos servicios.</p>
                </li>
                <li>
                    <p><strong>Política de Cookies / Aviso de Aceptación de Cookies</strong></p>
                    <p>Type: Persistent Cookies</p>
                    <p>Administered by: Us</p>
                    <p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
                </li>
                <li>
                    <p><strong>Cookies de funcionalidad</strong></p>
                    <p>Tipo: Cookies persistentes</p>
                    <p>Administrado por: Nosotros</p>
                    <p>Propósito: Estas cookies nos permiten recordar las elecciones que realiza cuando utiliza el sitio web, como recordar sus datos de inicio de sesión o su preferencia de idioma. El propósito de estas Cookies es brindarle una experiencia más personal y evitar que tenga que volver a ingresar sus preferencias cada vez que utiliza el sitio web.</p>
                </li>
            </ul>
            <p>Para obtener más información sobre las cookies que utilizamos y sus opciones con respecto a las cookies, visite nuestra Política de Cookies o la sección de Cookies de nuestra Política de Privacidad.</p>
            <h4>Uso de sus datos personales</h4>
            <p>La Empresa podrá utilizar Datos Personales para los siguientes fines:</p>
            <ul>
                <li><strong>Para proporcionar y mantener nuestro Servicio</strong>, incluso para monitorear el uso de nuestro Servicio.</li>
                <li><strong>Para administrar su cuenta:</strong> para gestionar su registro como usuario del Servicio. Los Datos Personales que usted proporciona pueden darle acceso a diferentes funcionalidades del Servicio que están disponibles para Usted como usuario registrado..</li>
                <li><strong>Para la ejecución de un contrato:</strong> el desarrollo, cumplimiento y realización del contrato de compra de los productos, artículos o servicios que Usted haya adquirido o de cualquier otro contrato con Nosotros a través del Servicio.</li>
                <li><strong>Para contactarte:</strong> Para contactarlo por correo electrónico, llamadas telefónicas, SMS u otras formas equivalentes de comunicación electrónica, como notificaciones push de una aplicación móvil sobre actualizaciones o comunicaciones informativas relacionadas con las funcionalidades, productos o servicios contratados, incluidas las actualizaciones de seguridad, cuando sea necesario o razonable. para su implementación.</li>
                <li><strong>Para proporcionarte</strong> con noticias, ofertas especiales e información general sobre otros bienes, servicios y eventos que ofrecemos que son similares a los que ya compró o sobre los que ya realizó consultas, a menos que haya optado por no recibir dicha información.</li>
                <li><strong>Para gestionar sus solicitudes:</strong> Para atender y gestionar sus solicitudes dirigidas a nosotros.</li>
                <li><strong>Para transferencias de negocios:</strong> Podemos utilizar su información para evaluar o llevar a cabo una fusión, desinversión, reestructuración, reorganización, disolución u otra venta o transferencia de algunos o todos nuestros activos, ya sea como empresa en funcionamiento o como parte de una quiebra, liquidación o procedimiento similar. en el que los datos personales que tenemos sobre los usuarios de nuestro servicio se encuentran entre los activos transferidos.</li>
                <li><strong>Para otros fines</strong>: Podemos utilizar Su información para otros fines, como análisis de datos, identificación de tendencias de uso, determinación de la efectividad de nuestras campañas promocionales y para evaluar y mejorar nuestro Servicio, productos, servicios, marketing y su experiencia.</li>
            </ul>
            <p>Podemos compartir su información personal en las siguientes situaciones:</p>
            <ul>
                <li><strong>Con proveedores de servicios:</strong> Podemos compartir su información personal con proveedores de servicios para monitorear y analizar el uso de nuestro servicio y comunicarnos con usted.</li>
                <li><strong>Para transferencias de negocios:</strong> Podemos compartir o transferir su información personal en relación con, o durante las negociaciones de, cualquier fusión, venta de activos de la Compañía, financiamiento o adquisición de todo o una parte de Nuestro negocio a otra compañía.</li>
                <li><strong>Con afiliados:</strong> Podemos compartir su información con nuestros afiliados, en cuyo caso exigiremos a dichos afiliados que respeten esta Política de privacidad. Las afiliadas incluyen nuestra empresa matriz y cualquier otra subsidiaria, socios de empresas conjuntas u otras empresas que controlamos o que están bajo control común con nosotros.</li>
                <li><strong>Con socios comerciales:</strong> Podemos compartir su información con nuestros socios comerciales para ofrecerle ciertos productos, servicios o promociones.</li>
                <li><strong>Con otros usuarios:</strong> Cuando comparte información personal o interactúa de otro modo en las áreas públicas con otros usuarios, dicha información puede ser vista por todos los usuarios y puede distribuirse públicamente afuera.</li>
                <li><strong>Con tu consentimiento</strong>: Podemos divulgar su información personal para cualquier otro propósito con su consentimiento.</li>
            </ul>
            <h4>Conservación de sus datos personales</h4>
            <p>La Compañía conservará sus datos personales solo durante el tiempo que sea necesario para los fines establecidos en esta Política de privacidad. Conservaremos y utilizaremos sus datos personales en la medida necesaria para cumplir con nuestras obligaciones legales (por ejemplo, si debemos conservar sus datos para cumplir con las leyes aplicables), resolver disputas y hacer cumplir nuestros acuerdos y políticas legales.</p>
            <p>La Compañía también conservará los Datos de uso para fines de análisis interno. Los datos de uso generalmente se conservan durante un período de tiempo más corto, excepto cuando estos datos se utilizan para fortalecer la seguridad o mejorar la funcionalidad de nuestro servicio, o estamos legalmente obligados a conservar estos datos durante períodos de tiempo más largos.</p>
            <h4>Transferencia de sus datos personales</h4>
            <p>Su información, incluidos los Datos Personales, es procesada en las oficinas operativas de la Compañía y en cualquier otro lugar donde se encuentren las partes involucradas en el procesamiento. Significa que esta información puede transferirse y mantenerse en computadoras ubicadas fuera de Su estado, provincia, país u otra jurisdicción gubernamental donde las leyes de protección de datos pueden diferir de las de Su jurisdicción.</p>
            <p>Su consentimiento a esta Política de Privacidad seguido de Su envío de dicha información representa Su aceptación de esa transferencia.</p>
            <p>La Compañía tomará todas las medidas razonablemente necesarias para garantizar que Sus datos sean tratados de forma segura y de acuerdo con esta Política de Privacidad y no se realizará ninguna transferencia de Sus Datos Personales a una organización o país a menos que existan controles adecuados establecidos, incluida la seguridad de Tus datos y otra información personal.</p>
            <h4>Elimina tus datos personales</h4>
            <p>Tiene derecho a eliminar o solicitar que le ayudemos a eliminar los datos personales que hemos recopilado sobre usted.</p>
            <p>Nuestro Servicio puede brindarle la posibilidad de eliminar cierta información sobre Usted desde dentro del Servicio.</p>
            <p>Puede actualizar, modificar o eliminar Su información en cualquier momento iniciando sesión en Su Cuenta, si tiene una, y visitando la sección de configuración de la cuenta que le permite administrar Su información personal. También puede comunicarse con nosotros para solicitar acceso, corregir o eliminar cualquier información personal que nos haya proporcionado.</p>
            <p>Sin embargo, tenga en cuenta que es posible que necesitemos conservar cierta información cuando tengamos una obligación legal o una base legal para hacerlo.</p>
            <h4>Divulgación de sus datos personales</h4>
            <h5>Transacciones de negocios</h5>
            <p>Si la Compañía está involucrada en una fusión, adquisición o venta de activos, sus datos personales pueden ser transferidos. Le avisaremos antes de que sus datos personales se transfieran y queden sujetos a una política de privacidad diferente.</p>
            <h5>Cumplimiento de la ley</h5>
            <p>En determinadas circunstancias, es posible que se le solicite a la Compañía que revele sus datos personales si así lo exige la ley o en respuesta a solicitudes válidas de autoridades públicas (por ejemplo, un tribunal o una agencia gubernamental).</p>
            <h5>Otros requisitos legales</h5>
            <p>La Compañía puede divulgar sus datos personales de buena fe cuando considere que dicha acción es necesaria para:</p>
            <ul>
                <li>Cumplir con una obligación legal</li>
                <li>Proteger y defender los derechos o bienes de la Empresa</li>
                <li>Prevenir o investigar posibles irregularidades en relación con el Servicio</li>
                <li>Proteger la seguridad personal de los Usuarios del Servicio o del público</li>
                <li>Proteger contra responsabilidad legal</li>
            </ul>
            <h4>Seguridad de sus datos personales</h4>
            <p>La seguridad de sus datos personales es importante para nosotros, pero recuerde que ningún método de transmisión a través de Internet o método de almacenamiento electrónico es 100 % seguro. Si bien nos esforzamos por utilizar medios comercialmente aceptables para proteger sus datos personales, no podemos garantizar su seguridad absoluta.</p>
            <h3>Privacidad de los niños</h3>
            <p>Nuestro Servicio no está dirigido a personas menores de 13 años. No recopilamos conscientemente información de identificación personal de ninguna persona menor de 13 años. Si usted es padre o tutor y sabe que su hijo nos ha proporcionado datos personales, por favor Contáctenos. Si nos damos cuenta de que hemos recopilado datos personales de cualquier persona menor de 13 años sin verificación del consentimiento de los padres, tomamos medidas para eliminar esa información de nuestros servidores.</p>
            <p>Si necesitamos confiar en el consentimiento como base legal para procesar Su información y Su país requiere el consentimiento de uno de sus padres, podemos requerir el consentimiento de Sus padres antes de recopilar y usar esa información.</p>
            <h3>Enlaces a otros sitios web</h3>
            <p>Nuestro Servicio puede contener enlaces a otros sitios web que no son operados por Nosotros. Si hace clic en el enlace de un tercero, será dirigido al sitio de ese tercero. Le recomendamos encarecidamente que revise la Política de privacidad de cada sitio que visite.</p>
            <p>No tenemos control ni asumimos ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de sitios o servicios de terceros.</p>
            <h3>Cambios a esta Política de Privacidad</h3>
            <p>Podemos actualizar Nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página.</p>
            <p>Le informaremos por correo electrónico y/o un aviso destacado en Nuestro Servicio, antes de que el cambio entre en vigor y actualizaremos la &quot;última fetcha de actualización&quot; en la parte superior de esta Política de Privacidad.</p>
            <p>Se le recomienda revisar esta Política de Privacidad periódicamente para detectar cualquier cambio. Los cambios a esta Política de Privacidad entran en vigencia cuando se publican en esta página.</p>
            <h3>Contacta con nosotros</h3>
            <p>Si tiene alguna pregunta sobre esta Política de Privacidad, puede contactarnos:</p>
            <ul>
                <li>Por correo electrónico: stockpro.assistance@gmail.com</li>
            </ul>
        </>
    )
}

function DanishTerms() {
    return (
        <>
            <h2>Privatlivspolitik</h2>
            <p>Sidst opdateret: 11. marts 2024</p>
            <p>Denne privatlivspolitik beskriver vores politikker og procedurer vedrørende indsamling, brug og videregivelse af dine oplysninger, når du bruger tjenesten, og fortæller dig om dine privatlivsrettigheder og hvordan loven beskytter dig.</p>
            <p>Vi bruger dine personlige data til at levere og forbedre tjenesten. Ved at bruge tjenesten accepterer du indsamlingen og brugen af oplysninger i overensstemmelse med denne privatlivspolitik. Denne privatlivspolitik er oprettet med hjælp fra <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank">Privacy Policy Generator</a>.</p>
            <h3>Fortolkning og definitioner</h3>
            <h4>Fortolkning</h4>
            <p>Ordene, hvor den første bogstav er med stort, har betydninger defineret under de følgende betingelser. De følgende definitioner skal have samme betydning, uanset om de optræder i ental eller flertal.</p>
            <h4>Definitioner</h4>
            <p>I denne privatlivspolitik betyder:</p>
            <ul>
                <li>
                    <p><strong>Konto</strong> betyder en unik konto, der er oprettet til dig for at få adgang til vores tjeneste eller dele af vores tjeneste.</p>
                </li>
                <li>
                    <p><strong>Tilknyttet virksomhed</strong> betyder en enhed, der kontrollerer, kontrolleres af eller er under fælles kontrol med en part, hvor "kontrol" betyder ejerskab af 50% eller mere af aktierne, egenkapitalen eller andre værdipapirer med stemmeret ved valg af direktører eller anden ledende myndighed.</p>
                </li>
                <li>
                    <p><strong>Virksomhed</strong> (refereret til som enten "virksomheden", "vi", "os" eller "vores" i denne aftale) refererer til StockPro.</p>
                </li>
                <li>
                    <p><strong>Cookies</strong> er små filer, der placeres på din computer, mobile enhed eller enhver anden enhed af et websted, der indeholder detaljerne om din browserhistorik på det websted blandt dets mange anvendelser.</p>
                </li>
                <li>
                    <p><strong>Land</strong> refererer til: Danmark</p>
                </li>
                <li>
                    <p><strong>Enhed</strong> betyder enhver enhed, der kan få adgang til tjenesten, såsom en computer, en mobiltelefon eller en digital tablet.</p>
                </li>
                <li>
                    <p><strong>Personlige data</strong> er enhver information, der relaterer til en identificeret eller identificerbar person.</p>
                </li>
                <li>
                    <strong>Tjeneste</strong> refererer til hjemmesiden.</li>
                <li>
                    <p><strong>Tjenesteudbyder</strong> betyder enhver fysisk eller juridisk person, der behandler dataene på vegne af virksomheden. Det refererer til tredjepartsfirmaer eller enkeltpersoner ansat af virksomheden til at lette tjenesten, til at levere tjenesten på vegne af virksomheden, til at udføre tjenester relateret til tjenesten eller til at hjælpe virksomheden med at analysere, hvordan tjenesten bruges.</p>
                </li>
                <li>
                    <p><strong>Brugsdata</strong> refererer til data indsamlet automatisk, enten genereret ved brug af tjenesten eller fra selve tjenestens infrastruktur (for eksempel varigheden af et sidebesøg).</p>
                </li>
                <li>
                    <p><strong>Hjemmeside</strong> refererer til StockPro, tilgængelig fra <a href="https://stockpro-deploy.onrender.com/" rel="external nofollow noopener" target="_blank">https://stockpro-deploy.onrender.com/</a></p>
                </li>
                <li>
                    <p><strong>Du</strong> betyder den person, der får adgang til eller bruger tjenesten, eller virksomheden, eller anden juridisk enhed på vegne af hvilken sådan person får adgang til eller bruger tjenesten, alt efter hvad der er relevant.</p>
                </li>
            </ul>
            <h3>Indsamling og brug af dine personlige data</h3>
            <h4>Typer af data indsamlet</h4>
            <h5>Personlige data</h5>
            <p>Mens du bruger vores tjeneste, kan vi bede dig om at give os visse personligt identificerbare oplysninger, der kan bruges til at kontakte eller identificere dig. Personligt identificerbare oplysninger kan omfatte, men er ikke begrænset til:</p>
            <ul>
                <li>
                    <p>Email adresse</p>
                </li>
                <li>
                    <p>Fornavn og efternavn</p>
                </li>
                <li>
                    <p>Brugsdata</p>
                </li>
            </ul>
            <h5>Brugsdata</h5>
            <p>Brugsdata indsamles automatisk, når du bruger tjenesten.</p>
            <p>Brugsdata kan omfatte information såsom din enheds Internet Protocol adresse (f.eks. IP-adresse), browsertype, browserversion, de sider af vores tjeneste, som du besøger, tidspunktet og datoen for dit besøg, tiden brugt på disse sider, unikke enhedsidentifikatorer og andre diagnostiske data.</p>
            <p>Når du får adgang til tjenesten via eller gennem en mobilenhed, kan vi automatisk indsamle visse oplysninger, herunder, men ikke begrænset til, typen af mobilenhed, du bruger, din mobile enheds unikke ID, IP-adressen på din mobile enhed, dit mobile operativsystem, typen af mobil internetbrowser, du bruger, unikke enhedsidentifikatorer og andre diagnostiske data.</p>
            <p>Vi kan også indsamle oplysninger, som din browser sender, når du besøger vores tjeneste, eller når du får adgang til tjenesten via eller gennem en mobilenhed.</p>
            <h5>Sporingsteknologier og cookies</h5>
            <p>Vi bruger cookies og lignende sporingsteknologier til at spore aktiviteten på vores tjeneste og gemme visse oplysninger. Sporingsteknologier, der bruges, er beacons, tags og scripts til at indsamle og spore oplysninger og til at forbedre og analysere vores tjeneste. De teknologier, vi bruger, kan omfatte:</p>
            <ul>
                <li><strong>Cookies eller browser-cookies.</strong> En cookie er en lille fil placeret på din enhed. Du kan instruere din browser til at afvise alle cookies eller til at angive, hvornår en cookie sendes. Men hvis du ikke accepterer cookies, kan du muligvis ikke bruge nogle dele af vores tjeneste. Medmindre du har justeret dine browserindstillinger, så de afviser cookies, kan vores tjeneste bruge cookies.</li>
                <li><strong>Web beacons.</strong> Visse sektioner af vores tjeneste og vores emails kan indeholde små elektroniske filer kendt som web beacons (også refereret til som clear gifs, pixel tags og single-pixel gifs), der tillader virksomheden, for eksempel at tælle brugere, der har besøgt disse sider eller åbnet en email og til andre relaterede websitestatistikker (for eksempel optagelse af populariteten af en bestemt sektion og verificering af system- og serverintegritet).</li>
            </ul>
            <p>Cookies kan være &quot;vedvarende&quot; eller &quot;sessions&quot; cookies. Vedvarende cookies forbliver på din personlige computer eller mobile enhed, når du går offline, mens sessions-cookies slettes, så snart du lukker din webbrowser. Du kan lære mere om cookies på <a href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies" target="_blank">TermsFeed website</a> artikel.</p>
            <p>Vi bruger både sessions- og vedvarende cookies til de formål, der er angivet nedenfor:</p>
            <ul>
                <li>
                    <p><strong>Nødvendige / essentielle cookies</strong></p>
                    <p>Type: Sessions-cookies</p>
                    <p>Administreret af: Os</p>
                    <p>Formål: Disse cookies er essentielle for at give dig tjenester tilgængelige gennem hjemmesiden og for at give dig mulighed for at bruge nogle af dens funktioner. De hjælper med at autentificere brugere og forhindre bedragerisk brug af bruger-konti. Uden disse cookies kan de tjenester, du har bedt om, ikke leveres, og vi bruger kun disse cookies til at levere dig disse tjenester.</p>
                </li>
                <li>
                    <p><strong>Cookies politik / Meddelelse om accept af cookies</strong></p>
                    <p>Type: Vedvarende cookies</p>
                    <p>Administreret af: Os</p>
                    <p>Formål: Disse cookies identificerer, om brugere har accepteret brugen af cookies på hjemmesiden.</p>
                </li>
                <li>
                    <p><strong>Funktionalitets-cookies</strong></p>
                    <p>Type: Vedvarende cookies</p>
                    <p>Administreret af: Os</p>
                    <p>Formål: Disse cookies giver os mulighed for at huske valg, du foretager, når du bruger hjemmesiden, såsom at huske dine login-oplysninger eller sprogpræference. Formålet med disse cookies er at give dig en mere personlig oplevelse og undgå, at du skal indtaste dine præferencer igen hver gang du bruger hjemmesiden.</p>
                </li>
            </ul>
            <p>For mere information om de cookies, vi bruger, og dine valg vedrørende cookies, besøg venligst vores cookiepolitik eller afsnittet om cookies i vores privatlivspolitik.</p>
            <h4>Brug af dine personlige data</h4>
            <p>Virksomheden kan bruge personlige data til følgende formål:</p>
            <ul>
                <li><p><strong>At levere og vedligeholde vores tjeneste</strong>, herunder for at overvåge brugen af vores tjeneste.</p></li>
                <li><p><strong>At administrere din konto:</strong> at administrere din registrering som bruger af tjenesten. De personlige data, du leverer, kan give dig adgang til forskellige funktionaliteter af tjenesten, der er tilgængelige for dig som registreret bruger.</p></li>
                <li><p><strong>Til udførelse af en kontrakt:</strong> udviklingen, overholdelsen og indgåelsen af købsaftalen for de produkter, varer eller tjenester, du har købt eller af enhver anden kontrakt med os gennem tjenesten.</p></li>
                <li><p><strong>At kontakte dig:</strong> at kontakte dig via email, telefonopkald, SMS eller andre tilsvarende former for elektronisk kommunikation, såsom push-meddelelser fra en mobilapplikation vedrørende opdateringer eller informative meddelelser relateret til funktionaliteter, produkter eller kontrakterede tjenester, herunder sikkerhedsopdateringer, når det er nødvendigt eller rimeligt for deres implementering.</p></li>
                <li><p><strong>At give dig nyheder,</strong> specialtilbud og generelle oplysninger om andre varer, tjenester og begivenheder, som vi tilbyder, der ligner dem, du allerede har købt eller spurgt om, medmindre du har valgt ikke at modtage sådan information.</p></li>
                <li><p><strong>At håndtere dine anmodninger:</strong> at deltage i og håndtere dine anmodninger til os.</p></li>
                <li><p><strong>Til forretningsoverførsler:</strong> Vi kan bruge dine oplysninger til at evaluere eller gennemføre en fusion, afhændelse, omstrukturering, reorganisering, opløsning eller andet salg eller overførsel af nogle eller alle vores aktiver, hvad enten det er som en going concern eller som led i konkurs, likvidation eller lignende procedurer, hvor personlige data, der opbevares af os om vores tjenestebrugere, er blandt de overførte aktiver.</p></li>
                <li><p><strong>Til andre formål</strong>: Vi kan bruge dine oplysninger til andre formål, såsom dataanalyse, identificering af brugstendenser, bestemmelse af effektiviteten af vores salgsfremmende kampagner og for at evaluere og forbedre vores tjeneste, produkter, tjenester, markedsføring og din oplevelse.</p></li>
            </ul>
            <p>Vi kan dele dine personlige oplysninger i følgende situationer:</p>
            <ul>
                <li><strong>Med tjenesteudbydere:</strong> Vi kan dele dine personlige oplysninger med tjenesteudbydere for at overvåge og analysere brugen af vores tjeneste, for at kontakte dig.</li>
                <li><strong>For forretningsoverførsler:</strong> Vi kan dele eller overføre dine personlige oplysninger i forbindelse med eller under forhandlinger om enhver fusion, salg af virksomhedens aktiver, finansiering eller erhvervelse af hele eller en del af vores forretning til en anden virksomhed.</li>
                <li><strong>Med tilknyttede virksomheder:</strong> Vi kan dele dine oplysninger med vores tilknyttede virksomheder, i hvilket tilfælde vi vil kræve, at disse tilknyttede virksomheder respekterer denne privatlivspolitik. Tilknyttede virksomheder omfatter vores moderselskab og enhver anden datterselskaber, joint venture-partnere eller andre virksomheder, som vi kontrollerer eller som er under fælles kontrol med os.</li>
                <li><strong>Med forretningspartnere:</strong> Vi kan dele dine oplysninger med vores forretningspartnere for at tilbyde dig visse produkter, tjenester eller kampagner.</li>
                <li><strong>Med andre brugere:</strong> når du deler personlige oplysninger eller på anden måde interagerer i de offentlige områder med andre brugere, kan sådanne oplysninger ses af alle brugere og kan offentliggøres udenfor.</li>
                <li><strong>Med dit samtykke</strong>: Vi kan videregive dine personlige oplysninger til ethvert andet formål med dit samtykke.</li>
            </ul>
            <h4>Opbevaring af dine personlige data</h4>
            <p>Virksomheden vil kun opbevare dine personlige data så længe som nødvendigt for de formål, der er angivet i denne privatlivspolitik. Vi vil opbevare og bruge dine personlige data i det omfang, det er nødvendigt for at overholde vores juridiske forpligtelser (for eksempel, hvis vi er forpligtet til at opbevare dine data for at overholde gældende love), løse tvister og håndhæve vores juridiske aftaler og politikker.</p>
            <p>Virksomheden vil også opbevare brugsdata til interne analyseformål. Brugsdata opbevares generelt i en kortere periode, undtagen når disse data bruges til at styrke sikkerheden eller for at forbedre funktionaliteten af vores tjeneste, eller vi er juridisk forpligtet til at opbevare disse data i længere tidsperioder.</p>
            <h4>Overførsel af dine personlige data</h4>
            <p>Dine oplysninger, herunder personlige data, behandles på virksomhedens operatørers kontorer og andre steder, hvor de parter, der er involveret i behandlingen, befinder sig. Det betyder, at disse oplysninger kan overføres til - og opbevares på - computere uden for din stat, provins, land eller anden statslig jurisdiktion, hvor databeskyttelseslovene kan afvige fra dem, der gælder i din jurisdiktion.</p>
            <p>Dit samtykke til denne privatlivspolitik efterfulgt af din indsendelse af sådanne oplysninger repræsenterer din accept af den overførsel.</p>
            <p>Virksomheden vil tage alle de nødvendige skridt for at sikre, at dine data behandles sikkert og i overensstemmelse med denne privatlivspolitik, og ingen overførsel af dine personlige data vil finde sted til en organisation eller et land, medmindre der er passende kontroller på plads, herunder sikkerheden af dine data og andre personlige oplysninger.</p>
            <h4>Slet dine personlige data</h4>
            <p>Du har ret til at slette eller anmode om, at vi hjælper med at slette de personlige data, som vi har indsamlet om dig.</p>
            <p>Vores tjeneste kan give dig mulighed for at slette visse oplysninger om dig fra tjenesten.</p>
            <p>Du kan til enhver tid opdatere, ændre eller slette dine oplysninger ved at logge ind på din konto, hvis du har en, og besøge afsnittet med kontoindstillinger, der giver dig mulighed for at administrere dine personlige oplysninger. Du kan også kontakte os for at anmode om adgang til, rette eller slette alle personlige oplysninger, som du har givet os.</p>
            <p>Bemærk dog, at vi muligvis skal opbevare visse oplysninger, når vi har en juridisk forpligtelse eller et lovligt grundlag for at gøre det.</p>
            <h4>Videregivelse af dine personlige data</h4>
            <h5>Forretningsmæssige transaktioner</h5>
            <p>Hvis virksomheden er involveret i en fusion, erhvervelse eller salg af aktiver, kan dine personlige data overføres. Vi vil give besked, før dine personlige data overføres og bliver underlagt en anden privatlivspolitik.</p>
            <h5>Retshåndhævelse</h5>
            <p>Under visse omstændigheder kan virksomheden blive forpligtet til at videregive dine personlige data, hvis det kræves ved lov eller som svar på gyldige anmodninger fra offentlige myndigheder (f.eks. en domstol eller en myndighed).</p>
            <h5>Andre juridiske krav</h5>
            <p>Virksomheden kan videregive dine personlige data i god tro, at sådan handling er nødvendig for at:</p>
            <ul>
                <li>Overholde en juridisk forpligtelse</li>
                <li>Beskytte og forsvare virksomhedens rettigheder eller ejendom</li>
                <li>Forebygge eller undersøge mulige forseelser i forbindelse med tjenesten</li>
                <li>Beskytte den personlige sikkerhed for brugere af tjenesten eller offentligheden</li>
                <li>Beskytte mod juridisk ansvar</li>
            </ul>
            <h4>Sikkerhed af dine personlige data</h4>
            <p>Sikkerheden af dine personlige data er vigtig for os, men husk, at ingen transmissionsmetode over internettet eller elektronisk lagringsmetode er 100% sikker. Selvom vi bestræber os på at bruge kommercielt acceptable midler til at beskytte dine personlige data, kan vi ikke garantere dens absolutte sikkerhed.</p>
            <h3>Børns privatliv</h3>
            <p>Vores tjeneste henvender sig ikke til nogen under 13 år. Vi indsamler ikke bevidst personligt identificerbare oplysninger fra nogen under 13 år. Hvis du er forælder eller værge, og du er klar over, at dit barn har givet os personlige data, bedes du venligst kontakt os. Hvis vi bliver opmærksomme på, at vi har indsamlet personlige data fra nogen under 13 år uden bekræftelse af forældrenes samtykke, tager vi skridt til at fjerne disse oplysninger fra vores servere.</p>
            <p>Hvis vi er nødt til at stole på samtykke som et juridisk grundlag for at behandle dine oplysninger, og dit land kræver samtykke fra en forælder, kan vi kræve din forælders samtykke, før vi indsamler og bruger disse oplysninger.</p>
            <h3>Links til andre websteder</h3>
            <p>Vores service kan indeholde links til andre websteder, der ikke drives af os. Hvis du klikker på et tredjepartslink, vil du blive dirigeret til denne tredjeparts websted. Vi anbefaler dig på det kraftigste at gennemgå fortrolighedspolitikken for hvert websted, du besøger.</p>
            <p>Vi har ingen kontrol over og påtager os intet ansvar for indholdet, privatlivspolitikker eller praksis på nogen tredjeparts websteder eller tjenester.</p>
            <h3>Ændringer i denne privatlivspolitik</h3>
            <p>Vi kan opdatere vores privatlivspolitik fra tid til anden. Vi vil underrette dig om eventuelle ændringer ved at offentliggøre den nye privatlivspolitik på denne side.</p>
            <p>Vi giver dig besked via e-mail og/eller en fremtrædende meddelelse om vores service, før ændringen træder i kraft, og opdaterer &quot;Sidst opdateret&quot; dato øverst i denne privatlivspolitik.</p>
            <p>Du rådes til at gennemgå denne fortrolighedspolitik med jævne mellemrum for eventuelle ændringer. Ændringer til denne privatlivspolitik træder i kraft, når de offentliggøres på denne side.</p>
            <h3>Kontakt os</h3>
            <p>Hvis du har spørgsmål til denne privatlivspolitik, kan du kontakte os:</p>
            <ul>
                <li>Via email: stockpro.assistance@gmail.com</li>
            </ul>
        </>
    )
}

function ItalianTerms() {
    return (
        <>
            <h2>Informativa sulla Privacy</h2>
            <p>Ultimo aggiornamento: 11 marzo 2024</p>
            <p>Questa Informativa sulla Privacy descrive le nostre politiche e procedure sulla raccolta, l'uso e la divulgazione delle tue informazioni quando utilizzi il Servizio e ti informa sui tuoi diritti alla privacy e su come la legge ti protegge.</p>
            <p>Utilizziamo i tuoi dati personali per fornire e migliorare il Servizio. Utilizzando il Servizio, accetti la raccolta e l'uso delle informazioni in conformità con questa Informativa sulla Privacy. Questa Informativa sulla Privacy è stata creata con l'aiuto del <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank">Generatore di Informative sulla Privacy</a>.</p>
            <h3>Interpretazione e Definizioni</h3>
            <h4>Interpretazione</h4>
            <p>Le parole di cui l'iniziale è maiuscola hanno significati definiti nelle seguenti condizioni. Le seguenti definizioni avranno lo stesso significato indipendentemente dal fatto che appaiano al singolare o al plurale.</p>
            <h4>Definizioni</h4>
            <p>Ai fini della presente Informativa sulla Privacy:</p>
            <ul>
                <li>
                    <p><strong>Account</strong> significa un <strong>account</strong> unico creato per te per accedere al nostro Servizio o a parti del nostro Servizio.</p>
                </li>
                <li>
                    <p><strong>Affiliato</strong> significa un'entità che controlla, è controllata o è sotto il controllo comune di una parte, dove il "controllo" significa possedere il 50% o più delle azioni, interessi azionari o altri titoli con diritto di voto per l'elezione di amministratori o altra autorità di gestione.</p>
                </li>
                <li>
                    <p><strong>Società</strong> (indicata come "la Società", "Noi" o "Nostro" in questo Accordo) si riferisce a StockPro.</p>
                </li>
                <li>
                    <p><strong>Cookie</strong> sono piccoli file che vengono inseriti sul tuo computer, dispositivo mobile o qualsiasi altro dispositivo da un sito web, contenenti dettagli della tua cronologia di navigazione su quel sito tra i suoi molti usi.</p>
                </li>
                <li>
                    <p><strong>Paese</strong> si riferisce a: Danimarca</p>
                </li>
                <li>
                    <p><strong>Dispositivo</strong> significa qualsiasi dispositivo che può accedere al Servizio come un computer, un telefono cellulare o un tablet digitale.</p>
                </li>
                <li>
                    <p><strong>Dati Personali</strong> è qualsiasi informazione che si riferisce a una persona fisica identificata o identificabile.</p>
                </li>
                <li>
                    <strong>Servizio</strong> si riferisce al Sito Web.
                </li>
                <li>
                    <p><strong>Fornitore di Servizi</strong> significa qualsiasi persona fisica o giuridica che elabora i dati per conto della Società. Si riferisce a società terze o individui impiegati dalla Società per facilitare il Servizio, per fornire il Servizio per conto della Società, per svolgere servizi relativi al Servizio o per assistere la Società nell'analisi di come viene utilizzato il Servizio.</p>
                </li>
                <li>
                    <p><strong>Dati di Utilizzo</strong> si riferisce ai dati raccolti automaticamente, sia generati dall'uso del Servizio o dall'infrastruttura del Servizio stessa (ad esempio, la durata di una visita a una pagina).</p>
                </li>
                <li>
                    <p><strong>Sito Web</strong> si riferisce a StockPro, accessibile da <a href="https://stockpro-deploy.onrender.com/" rel="external nofollow noopener" target="_blank">https://stockpro-deploy.onrender.com/</a></p>
                </li>
                <li>
                    <p><strong>Tu</strong> significa l'individuo che accede o utilizza il Servizio, o la società, o altra entità giuridica per conto della quale tale individuo accede o utilizza il Servizio, come applicabile.</p>
                </li>
            </ul>
            <h3>Raccolta e Utilizzo dei Tuoi Dati Personali</h3>
            <h4>Tipi di Dati Raccolti</h4>
            <h5>Dati Personali</h5>
            <p>Durante l'utilizzo del Nostro Servizio, potremmo chiederti di fornirci alcune informazioni personali identificabili che possono essere utilizzate per contattarti o identificarti. Le informazioni personali identificabili possono includere, ma non sono limitate a:</p>
            <ul>
                <li>
                    <p>Indirizzo email</p>
                </li>
                <li>
                    <p>Nome e cognome</p>
                </li>
                <li>
                    <p>Dati di Utilizzo</p>
                </li>
            </ul>
            <h5>Dati di Utilizzo</h5>
            <p>I Dati di Utilizzo sono raccolti automaticamente durante l'uso del Servizio.</p>
            <p>I Dati di Utilizzo possono includere informazioni come l'indirizzo IP del Tuo Dispositivo, il tipo di browser, la versione del browser, le pagine del nostro Servizio che visiti, l'orario e la data della Tua visita, il tempo trascorso su quelle pagine, identificatori unici del dispositivo e altri dati diagnostici.</p>
            <p>Quando accedi al Servizio tramite un dispositivo mobile, potremmo raccogliere automaticamente alcune informazioni, inclusi, ma non limitati a, il tipo di dispositivo mobile che utilizzi, l'ID unico del tuo dispositivo mobile, l'indirizzo IP del tuo dispositivo mobile, il sistema operativo del tuo dispositivo mobile, il tipo di browser Internet mobile che utilizzi, identificatori unici del dispositivo e altri dati diagnostici.</p>
            <p>Potremmo anche raccogliere informazioni che il tuo browser invia ogni volta che visiti il nostro Servizio o quando accedi al Servizio tramite un dispositivo mobile.</p>
            <h5>Tecnologie di Tracciamento e Cookies</h5>
            <p>Utilizziamo i Cookies e tecnologie di tracciamento simili per monitorare l'attività sul Nostro Servizio e memorizzare alcune informazioni. Le tecnologie di tracciamento utilizzate sono beacon, tag e script per raccogliere e tracciare informazioni e per migliorare e analizzare il Nostro Servizio. Le tecnologie che utilizziamo possono includere:</p>
            <ul>
                <li><strong>Cookies o Cookies del Browser.</strong> Un cookie è un piccolo file collocato sul Tuo Dispositivo. Puoi istruirlo per rifiutare tutti i Cookies o per indicare quando un Cookie viene inviato. Tuttavia, se non accetti i Cookies, potresti non essere in grado di utilizzare alcune parti del nostro Servizio. A meno che tu non abbia modificato le impostazioni del tuo browser in modo che rifiuti i Cookies, il nostro Servizio potrebbe utilizzare Cookies.</li>
                <li><strong>Web Beacons.</strong> Alcune sezioni del nostro Servizio e le nostre email possono contenere piccoli file elettronici noti come web beacons (noti anche come clear gifs, pixel tags e single-pixel gifs) che permettono alla Società, ad esempio, di contare gli utenti che hanno visitato quelle pagine o aperto un'email e per altre statistiche correlate al sito web (ad esempio, registrare la popolarità di una determinata sezione e verificare l'integrità del sistema e del server).</li>
            </ul>
            <p>I Cookies possono essere &quot;Persistenti&quot; o &quot;Sessione&quot;. I Cookies Persistenti rimangono sul Tuo computer personale o dispositivo mobile quando sei offline, mentre i Cookies di Sessione vengono eliminati non appena chiudi il browser web. Puoi saperne di più sui cookies nell'articolo <a href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies" target="_blank">del sito TermsFeed</a>.</p>
            <p>Utilizziamo sia i Cookies di Sessione che quelli Persistenti per le finalità indicate di seguito:</p>
            <ul>
                <li>
                    <p><strong>Cookie Necessari / Essenziali</strong></p>
                    <p>Tipo: Cookie di Sessione</p>
                    <p>Amministrato da: Noi</p>
                    <p>Scopo: Questi Cookie sono essenziali per fornirti i servizi disponibili tramite il Sito e per permetterti di utilizzare alcune delle sue funzionalità. Aiutano ad autenticare gli utenti e a prevenire l'uso fraudolento degli account utente. Senza questi Cookie, i servizi che hai richiesto non possono essere forniti, e utilizziamo questi Cookie solo per fornirti tali servizi.</p>
                </li>
                <li>
                    <p><strong>Cookie di Accettazione della Politica / Notifica dei Cookie</strong></p>
                    <p>Tipo: Cookie Persistenti</p>
                    <p>Amministrato da: Noi</p>
                    <p>Scopo: Questi Cookie identificano se gli utenti hanno accettato l'uso dei cookie sul Sito.</p>
                </li>
                <li>
                    <p><strong>Cookie di Funzionalità</strong></p>
                    <p>Tipo: Cookie Persistenti</p>
                    <p>Amministrato da: Noi</p>
                    <p>Scopo: Questi Cookie ci permettono di ricordare le scelte che fai quando utilizzi il Sito, come ad esempio ricordare i dettagli di accesso o le preferenze di lingua. Lo scopo di questi Cookie è fornirti un'esperienza più personalizzata e evitare che tu debba reinserire le tue preferenze ogni volta che utilizzi il Sito.</p>
                </li>
            </ul>
            <p>Per ulteriori informazioni sui cookie che utilizziamo e le tue opzioni riguardo ai cookie, ti preghiamo di visitare la nostra Politica sui Cookie o la sezione Cookie della nostra Politica sulla Privacy.</p>
            <h4>Utilizzo dei Tuoi Dati Personali</h4>
            <p>La Società può utilizzare i Dati Personali per i seguenti scopi:</p>
            <ul>
                <li><strong>Per fornire e mantenere il nostro Servizio</strong>, inclusa la monitorizzazione dell'uso del nostro Servizio.</li>
                <li><strong>Per gestire il Tuo Account:</strong> per gestire la tua registrazione come utente del Servizio. I Dati Personali che fornisci possono darti accesso a diverse funzionalità del Servizio disponibili per te come utente registrato.</li>
                <li><strong>Per l'esecuzione di un contratto:</strong> lo sviluppo, la conformità e l'esecuzione del contratto di acquisto per i prodotti, articoli o servizi che hai acquistato o di qualsiasi altro contratto con Noi tramite il Servizio.</li>
                <li><strong>Per contattarti:</strong> Per contattarti via email, telefonate, SMS o altre forme equivalenti di comunicazione elettronica, come le notifiche push di un'app mobile riguardanti aggiornamenti o comunicazioni informative relative alle funzionalità, prodotti o servizi contrattati, comprese le aggiornamenti di sicurezza, quando necessario o ragionevole per la loro implementazione.</li>
                <li><strong>Per fornirti</strong> notizie, offerte speciali e informazioni generali su altri beni, servizi ed eventi che offriamo simili a quelli che hai già acquistato o richiesto, a meno che tu non abbia scelto di non ricevere tali informazioni.</li>
                <li><strong>Per gestire le tue richieste:</strong> Per accogliere e gestire le tue richieste a Noi.</li>
                <li><strong>Per trasferimenti aziendali:</strong> Possiamo utilizzare le tue informazioni per valutare o condurre una fusione, una dismissione, una ristrutturazione, una riorganizzazione, una liquidazione o altra vendita o trasferimento di alcuni o tutti i nostri beni, sia come attività continuativa che come parte di una procedura di fallimento, liquidazione o simile, in cui i Dati Personali detenuti da Noi sui nostri utenti del Servizio sono tra i beni trasferiti.</li>
                <li><strong>Per altri scopi</strong>: Possiamo utilizzare le tue informazioni per altri scopi, come l'analisi dei dati, l'identificazione delle tendenze di utilizzo, la determinazione dell'efficacia delle nostre campagne promozionali e per valutare e migliorare il nostro Servizio, prodotti, servizi, marketing e la tua esperienza.</li>
            </ul>
            <p>Possiamo condividere le tue informazioni personali nelle seguenti situazioni:</p>
            <ul>
                <li><strong>Con Fornitori di Servizi:</strong> Possiamo condividere le tue informazioni personali con i Fornitori di Servizi per monitorare e analizzare l'uso del nostro Servizio e per contattarti.</li>
                <li><strong>Per trasferimenti aziendali:</strong> Possiamo condividere o trasferire le tue informazioni personali in relazione a, o durante le trattative di, qualsiasi fusione, vendita di beni aziendali, finanziamento o acquisizione di tutto o parte del nostro business da parte di un'altra azienda.</li>
                <li><strong>Con Affiliati:</strong> Possiamo condividere le tue informazioni con i nostri affiliati, nel qual caso richiederemo a tali affiliati di rispettare questa Politica sulla Privacy. Gli affiliati includono la nostra società madre e qualsiasi altra controllata, partner di joint venture o altre aziende che controlliamo o che sono sotto il nostro controllo comune.</li>
                <li><strong>Con partner commerciali:</strong> Possiamo condividere le tue informazioni con i nostri partner commerciali per offrirti determinati prodotti, servizi o promozioni.</li>
                <li><strong>Con altri utenti:</strong> quando condividi informazioni personali o interagisci pubblicamente con altri utenti, tali informazioni possono essere visualizzate da tutti gli utenti e potrebbero essere distribuite pubblicamente all'esterno.</li>
                <li><strong>Con il Tuo consenso:</strong> Possiamo divulgare le tue informazioni personali per qualsiasi altro scopo con il tuo consenso.</li>
            </ul>
            <h4>Trasferimento dei Tuoi Dati Personali</h4>
            <p>Le tue informazioni, inclusi i Dati Personali, sono elaborate presso gli uffici operativi della Società e in qualsiasi altro luogo dove le parti coinvolte nel trattamento sono situate. Ciò significa che queste informazioni possono essere trasferite a — e mantenute su — computer situati al di fuori del tuo stato, provincia, paese o altra giurisdizione governativa dove le leggi sulla protezione dei dati possono differire da quelle della tua giurisdizione.</p>
            <p>Il tuo consenso a questa Politica sulla Privacy seguito dalla tua comunicazione di tali informazioni rappresenta la tua accettazione di tale trasferimento.</p>
            <p>La Società prenderà tutte le misure ragionevolmente necessarie per garantire che i tuoi dati siano trattati in modo sicuro e in conformità con questa Politica sulla Privacy e nessun trasferimento dei Tuoi Dati Personali avverrà verso un'organizzazione o un paese a meno che non siano in atto controlli adeguati, inclusa la sicurezza dei tuoi dati e altre informazioni personali.</p>

            <h4>Eliminazione dei Tuoi Dati Personali</h4>
            <p>Hai il diritto di eliminare o richiedere che ti assistiamo nell'eliminazione dei Dati Personali che abbiamo raccolto su di te.</p>
            <p>Il nostro Servizio può offrirti la possibilità di eliminare alcune informazioni su di te all'interno del Servizio.</p>
            <p>Puoi aggiornare, modificare o eliminare le tue informazioni in qualsiasi momento accedendo al Tuo Account, se ne hai uno, e visitando la sezione delle impostazioni dell'account che ti consente di gestire le tue informazioni personali. Puoi anche contattarci per richiedere l'accesso, la correzione o l'eliminazione di qualsiasi informazione personale che hai fornito a Noi.</p>
            <p>Si prega di notare, tuttavia, che potremmo dover conservare determinate informazioni quando abbiamo un obbligo legale o una base giuridica per farlo.</p>

            <h4>Divulgazione dei Tuoi Dati Personali</h4>
            <h5>Transazioni Aziendali</h5>
            <p>Se la Società è coinvolta in una fusione, acquisizione o vendita di beni, i Tuoi Dati Personali possono essere trasferiti. Forniremo una notifica prima che i Tuoi Dati Personali siano trasferiti e diventino soggetti a una diversa Politica sulla Privacy.</p>

            <h5>Forze dell'Ordine</h5>
            <p>In determinate circostanze, la Società potrebbe essere tenuta a divulgare i Tuoi Dati Personali se richiesto dalla legge o in risposta a richieste valide da parte delle autorità pubbliche (ad es. un tribunale o un'agenzia governativa).</p>

            <h5>Altri Requisiti Legali</h5>
            <p>La Società può divulgare i Tuoi Dati Personali in buona fede ritenendo che tale azione sia necessaria per:</p>
            <ul>
                <li>Adempiere a un obbligo legale</li>
                <li>Proteggere e difendere i diritti o i beni della Società</li>
                <li>Prevenire o indagare su possibili illeciti in relazione al Servizio</li>
                <li>Proteggere la sicurezza personale degli Utenti del Servizio o del pubblico</li>
                <li>Proteggere da responsabilità legali</li>
            </ul>
            <h4>Sicurezza dei Tuoi Dati Personali</h4>
            <p>La sicurezza dei Tuoi Dati Personali è importante per Noi, ma ricorda che nessun metodo di trasmissione su Internet o metodo di archiviazione elettronica è al 100% sicuro. Sebbene ci sforziamo di utilizzare mezzi commercialmente accettabili per proteggere i Tuoi Dati Personali, non possiamo garantire la loro sicurezza assoluta.</p>

            <h3>Privacy dei Bambini</h3>
            <p>Il Nostro Servizio non si rivolge a persone di età inferiore ai 13 anni. Non raccogliamo consapevolmente informazioni personali identificabili da nessuno sotto i 13 anni. Se sei un genitore o un tutore e sei a conoscenza che tuo figlio ci ha fornito Dati Personali, ti preghiamo di contattarci. Se veniamo a conoscenza che abbiamo raccolto Dati Personali da qualcuno sotto i 13 anni senza verifica del consenso dei genitori, adottiamo misure per rimuovere tali informazioni dai Nostri server.</p>
            <p>Se dobbiamo fare affidamento sul consenso come base legale per il trattamento delle tue informazioni e il tuo paese richiede il consenso di un genitore, potremmo richiedere il consenso del tuo genitore prima di raccogliere e utilizzare tali informazioni.</p>

            <h3>Collegamenti ad Altri Siti Web</h3>
            <p>Il Nostro Servizio potrebbe contenere collegamenti ad altri siti web che non sono gestiti da Noi. Se clicchi su un collegamento di terze parti, sarai indirizzato al sito di quella terza parte. Ti consigliamo vivamente di esaminare la Politica sulla Privacy di ogni sito che visiti.</p>
            <p>Non abbiamo controllo e non ci assumiamo alcuna responsabilità per il contenuto, le politiche sulla privacy o le pratiche di siti o servizi di terze parti.</p>

            <h3>Modifiche a Questa Politica sulla Privacy</h3>
            <p>Potremmo aggiornare la nostra Politica sulla Privacy di tanto in tanto. Ti informeremo di eventuali modifiche pubblicando la nuova Politica sulla Privacy su questa pagina.</p>
            <p>Ti informeremo via email e/o con un avviso prominente sul Nostro Servizio, prima che il cambiamento diventi effettivo e aggiorneremo la data di "Ultimo aggiornamento" in cima a questa Politica sulla Privacy.</p>
            <p>Ti consigliamo di esaminare periodicamente questa Politica sulla Privacy per eventuali cambiamenti. Le modifiche a questa Politica sulla Privacy sono efficaci quando vengono pubblicate su questa pagina.</p>

            <h3>Contattaci</h3>
            <p>Se hai domande riguardo a questa Politica sulla Privacy, puoi contattarci:</p>
            <ul>
                <li>Via email: stockpro.assistance@gmail.com</li>
            </ul>
        </>
    )
}