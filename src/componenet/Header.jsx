import React from 'react'
import { Autocomplete } from "@react-google-maps/api"
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import useStyles from './styles1'
import { useState } from 'react'

function Header({setCoordinates}) {
    const classes = useStyles();
const[autocomplete,setAutocomplete]=useState(null);

const onLoad=(autoC)=> setAutocomplete(autoC);
const onPlaceChanged=()=>{
const lat=autocomplete.getPlace().geometry.location.lat();
const lng=autocomplete.getPlace().geometry.location.lng();

setCoordinates({lat,lng});
}


    return (

        <AppBar position="static"   style={{ background: '#2e7d32' }} >
            <Toolbar className={classes.toolbar }>
                <Typography varient="h5" className={classes.title}>
                    Travel App
                </Typography>
                <Box display="flex">
                    <Typography varient="h6" className={classes.title}>
                        Explore Places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} >
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />

                        </div>
                        <InputBase placeholder="Search.." classes={{ root: classes.inputRoot, input: classes.inputInput }}>

                        </InputBase>

                    </div>
                     </Autocomplete>
                </Box>

            </Toolbar>


        </AppBar>
    )
}

export default Header


