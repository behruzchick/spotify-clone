import React, { useEffect, useState } from 'react'
import { Button, Form, Navbar } from 'react-bulma-components'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer, InputLabel, List, MenuItem, Select } from '@mui/material'
import './Header.css'
import SearchResults from '../SearchReults/SearchResults';
const Header = ({ accessToken }) => {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("artist");
    const [data, setData] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artist, setArtists] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [apiUrl,setApiUrl] = useState(0);

    
    const handleSumbit = async(e) => {
        // e.preventDefault();
        axios
            .get(`https://api.spotify.com/v1/search?query=${value}&type=${type}&locale=ru-RU%2Cru%3Bq%3D0.9%2Cen-US%3Bq%3D0.8%2Cen%3Bq%3D0.7%2Cuz%3Bq%3D0.6&offset=${apiUrl}&limit=20`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }   
            }).then((res) => {
                console.log(res);
                setData(res.data);
            }).catch((e) => {
                console.log(e);
            })
    }

    useEffect(() => {
        if(!value || !type ){
            return;
        }else{
            handleSumbit();
        }
    } , [apiUrl])

    const handleChange = (e) => {
        console.log(type);
        setType(e.target.value)
    }

    const handlePrev = (url) => {
        console.log(apiUrl);
        setApiUrl((offset) => offset - 20);
    } 
    const handleNext = (url) => {
        console.log(apiUrl);
        setApiUrl((offset) => offset + 20);
    } 
    return (
        <Navbar className='header-navbar'>
            <Drawer
                anchor='top'
                open={open}
                className='search-drawer'
            >
                <List className='drawer-list'>
                    <Form.Control style={{ marginLeft: '10px' }} className='form' onKeyDown={e => { if (e.key === 'Enter') { handleSumbit() } else { console.log("Validated") } }}>
                        <Form.Control fullwidth style={{ marginLeft: '10px' }}>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={"album"} onClick={() => setType("album")}>Albums</MenuItem>
                                <MenuItem value={"artist"} onClick={() => setType("artist")}>Artists</MenuItem>
                            </Select>
                        </Form.Control >
                        <Form.Input className='drawer-search-input' onChange={(e) => setValue(e.target.value)} placeholder='Search' />
                        <Button onClick={handleSumbit}>Sumbit</Button>
                    </Form.Control>
                    <CloseIcon style={{ marginRight: '10px', cursor: "pointer" }} onClick={() => setOpen(false)} />
                </List>
                <SearchResults albums={albums} playlists={playlist} artists={artist} data={data} />
                <div className="btns">
                    <Button onClick={handlePrev}>Prev</Button>
                    <Button onClick={handleNext}>Next</Button>
                </div>
            </Drawer>
            <Navbar.Brand>
                <Navbar.Item href='/'>Spotify clone</Navbar.Item>
            </Navbar.Brand>
            <Navbar>
                <SearchIcon onClick={() => setOpen(true)} sx={{ color: 'white', cursor: "pointer" }} />
            </Navbar>
        </Navbar>
    )
}

export default Header