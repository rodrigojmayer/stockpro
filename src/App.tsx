import { useEffect, useState } from 'react'
// import './App.css'
import List from './components/List'
import { Container, Typography, Grid } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { OkButton, CancelButton, PlusButton } from './components/Buttons';
import Layout from './components/Layout';
import MainSearch from './components/MainSearch';


interface Sub {
  nick: string
  avatar: string
  subMonths: number
  description?: string
}

interface AppState {
  subs: Array<Sub>
  newSubsNumber: number
}
const INITIAL_STATE = [
  {
    nick: 'dapelu',
    subMonths: 3,
    avatar: 'https://i.pravatar.cc/150?u=dapelu',
    description: 'Dapelu hace de moderador a veces'
  },
  {
    nick: 'sergio_serrano',
    subMonths: 7,
    avatar: 'https://i.pravatar.cc/150?u=sergio_serrano'
  }
]

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Asap Condensed"',
    ].join(','),
    fontSize: 20,
  },
});



function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([])
  const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>(0)

  useEffect(() => {
    setSubs(INITIAL_STATE)
  }, [])


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout>
          <Container maxWidth="md" style={{padding: "0"}} >
            <Grid container>
              <Grid item xs={10} >
                <MainSearch/>
              </Grid>
              <Grid item xs={2} >
                <PlusButton/>
              </Grid>
            </Grid>
          </Container>
          

          <Typography 
            color="secondary"  
          >
            First example
          </Typography>
          <Typography 
            color="secondary"  
          >
            -<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>-<br/>
          </Typography>







          
          <CancelButton/>
          <OkButton/>

        </Layout>
      </ThemeProvider>
      
      
    </div>
  )
}

export default App
