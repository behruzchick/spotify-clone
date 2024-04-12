import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Button, Card } from 'react-bulma-components'
import './Albums.css'
import { useNavigate } from 'react-router-dom'
const Albums = ({ accessToken }) => {
  const [albums, setAlbums] = useState([]);
  const [apiUrl, setApiUrl] = useState(0)
  const navigate = useNavigate();
  // console.log(accessToken);

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/browse/featured-playlists?offset=${apiUrl}&limit=20&locale=ru-RU%2Cru%3Bq%3D0.9%2Cen-US%3Bq%3D0.8%2Cen%3Bq%3D0.7%2Cuz%3Bq%3D0.6`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then((res) => {
        console.log(res?.data.playlists);
        setAlbums(res?.data.playlists.items)
      }).catch((e) => {
        console.log(e);
      })
  }, [accessToken,apiUrl])
  const handlePrev = () => {
    console.log(apiUrl);
    setApiUrl((offset) => offset - 20);
} 
const handleNext = () => {
    console.log(apiUrl);
    setApiUrl((offset) => offset + 20);
}
  return (
    <div className='playlists-wrappe' style={{display:'flex',flexWrap:'wrap',paddingTop:'30px',gap:"10px"}}> 
    <div className='btns-wrappe' style={{display:'flex',gap:"10px"}}>
      <Button onClick={handlePrev}>Prev</Button>
      <Button onClick={handleNext}>Next</Button>
    </div>
    <div className="playlists" style={{display:'flex',flexWrap:'wrap',paddingTop:'30px',gap:"10px"}}>
    {
        albums.map((item) => (
          <Card key={item?.id} onClick={() => navigate(`/playlist/track/${item?.id}`)} className='card' style={{padding:'5px',cursor:'pointer'}}>
            <Card.Header style={{color:"white"}} className='playlist-header'>
              {item?.name}
            </Card.Header>
            <Card.Content>
              <img src={item?.images[0].url} alt="" />
            </Card.Content>
          </Card>
        ))
      }
    </div>
    </div>
  )
}

export default Albums