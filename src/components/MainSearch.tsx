import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { LanguageLabelsContext } from '../context/LanguageLabelsContext';

interface Props {
    setSearchQuery: (value: string) => void;
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "10px",
    backgroundColor: alpha(theme.palette.common.white, 0.55),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.65),
    },
    marginLeft: 0,
    width: '97%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
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
    width: 'calc(100% - 45px)',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `1em`,
        transition: theme.transitions.create('width'),
        // [theme.breakpoints.up('sm')]: {
            // '&:focus': {
                // width: '20ch',
            // },
        // },
    },
}));



export default function MainSearch ({ setSearchQuery }: Props) {
    const { labelsMainSearch } = useContext<any>(LanguageLabelsContext)

    return(
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                // placeholder="Global search..."
                placeholder={labelsMainSearch.global_search}
                onChange={(e:any) => setSearchQuery(e.target.value)}
                // inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    )
}