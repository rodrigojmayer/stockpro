import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

interface Props {
    setSearchQuery: (value: string) => void;
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    // borderRadius: theme.shape.borderRadius,
    borderRadius: "10px",
    backgroundColor: alpha(theme.palette.common.white, 0.55),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.65),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '333px',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
padding: theme.spacing(0, 2),
height: '100%',
position: 'absolute',
right: 0,
pointerEvents: 'none',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
color: 'inherit',
'& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `1em`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    width: '12ch',
    '&:focus': {
        width: '20ch',
    },
    },
},
}));



export default function MainSearch ({ setSearchQuery }: Props) {

    const [searchTerm, setSearchTerm] = useState('');

    // const handleSearchChange = (event: any) => {
    //     const term = event.target.value;
    //     setSearchTerm(term);
    //     setSearchQuery(term);
    // }
    // console.log("main search:")
    

    return(
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Global search..."
                onChange={(e) => setSearchQuery(e.target.value)}
                // inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    )
}