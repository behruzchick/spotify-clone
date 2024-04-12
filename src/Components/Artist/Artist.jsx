import { Avatar, ImageList, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Box } from 'react-bulma-components';
import { useParams } from 'react-router-dom'
import AudioPlayer from 'react-h5-audio-player';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
const Artist = ({ accessToken }) => {
  const { id } = useParams();
  const [artist, setArtist] = useState({});
  const [tracks, setTracks] = useState([]);
  const [song,setSong] = useState("");

  useEffect(() => {
    axios
      .get(`
        https://api.spotify.com/v1/artists/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then((res) => {
        setArtist(res?.data)
        console.log(res.data);
      }).catch((e) => {
        console.log(e);
      })

    axios
      .get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then((res) => {
        console.log("tracks", res.data);
        setTracks(res.data.tracks);
      }).catch((e) => {
        console.log(e);
      })
  }, [song])


  return (
    <Box style={{ boxShadow: 'none' }}>
      <Box style={{ display: 'flex', justifyContent: "center", boxShadow: "none" }}>
        <Box style={{ boxShadow: 'none' }}>
          <Avatar style={{ width: '300px', height: '300px' }} src={artist.images && artist?.images[1]?.url} alt="" />
        </Box>
        <Box style={{ boxShadow: 'none', paddingTop: "50px" }}>
          <Typography>{artist.name && artist?.name}</Typography>
          <Typography>Folowers: {artist.followers && artist?.followers.total}</Typography>
        </Box>
      </Box>
      <Box style={{ boxShadow: 'none' }}>
        <h3 style={{ margin: "30px 0px", fontSize: "30px", fontWeight: "700" }}>Top tracks</h3>
        <AudioPlayer
          style={{margin:"20px 0px",borderRadius:'10px',background:"none"}}
          src={song}
        />
        <ImageList cols={1} style={{ height: '400px' }}>
          {
            tracks && tracks?.map((track) => (
              <div className="track" key={track.id} style={{display:'flex',alignItems:'center',justifyContent:"space-between",padding:"10px"}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
                  <PlayArrowIcon style={{cursor:'pointer'}} onClick={() => setSong(track.preview_url)}/>
                  <Avatar src={track.album?.images[0].url} />
                  <b>{track?.name}</b>
                </div>
                <span>{new Date(track.duration_ms).toISOString().substr(15, 5)}</span>
              </div>
            ))
          }
        </ImageList>
      </Box>
    </Box>
  )
}

export default Artist