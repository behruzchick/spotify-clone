import React, { useState } from 'react'
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import './SearchResults.css'
import { Heading } from 'react-bulma-components';
import { useNavigate } from 'react-router-dom';
const SearchResults = ({ data, albums, playlists, artists }) => {
    const navigate = useNavigate();
    console.log(data);
    return (
        <ImageList className='result-wrappe' cols={4}>
            {
                data.albums ? <Heading className='search-result-heading'>Albums</Heading> : <Heading className='search-result-heading'>Artists</Heading>
            }
            {
                data.albums ? data.albums.items.map((item) => (
                    <div onClick={() => navigate(`/album/track/${item.id}`)} className='item-block' key={item.id}>
                        <img src={item.images[1]?.url} alt="" />
                        <b style={{ color: "white" }} className='list-block-name'>{item.name}</b>
                    </div>
                )) :
                    data.artists ? data.artists.items.map((item) => (
                        <div onClick={() => navigate(`/artist/${item.id}`)} className='item-block'  key={item.id}>
                            <div className="item-block-image-wrapper">
                                <img src={item.images[2]?.url} alt="" />
                            </div>
                            <div className="item-block-info">
                                <b style={{ color: "white" }} className='list-block-name'>{item.name}</b>
                                <span style={{ color: "white" }}>Followers: <span></span>{item.followers.total}</span>
                            </div>
                        </div>
                    )) : null
            }
        </ImageList>
    )
}

export default SearchResults