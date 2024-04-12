import { Avatar } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Box, Card } from 'react-bulma-components';
import { useParams } from 'react-router-dom'
import AudioPlayer from 'react-h5-audio-player';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import 'react-h5-audio-player/lib/styles.css';
const Album = ({accessToken}) => {
    const [tracks, setTracks] = useState([]);
    const [song, setSong] = useState("");
    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then((res) => {
                console.log(res.data);
                setTracks(res.data.items)
            }).catch((e) => {
                console.log(e);
            })
    }, [accessToken, song])
    return (
        <Box style={{ paddingTop: "10px", boxShadow: 'none' }}>
            <h3 style={{ marginBottom: "10px" }}>Tracks</h3>
            <div className="tracks-wrappe">
                {
                    tracks.map((item) => (
                        <Card key={item.id}>
                            <Card.Content style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: "flex", alignItems: 'center', gap: '10px' }}>
                                    <PlayArrowIcon style={{ cursor: 'pointer' }} onClick={() => setSong(item.preview_url)} />
                                    {/* <Avatar src={item?.album.images[0].url} /> */}
                                    <b>{item?.name}</b>
                                </div>
                                <span>
                                    {new Date(item?.duration_ms).toISOString().substr(15, 5)}
                                </span>
                            </Card.Content>
                        </Card>
                    ))
                }
            </div>
            <AudioPlayer
                style={{ position: 'fixed', bottom: "0px", left: "0px" ,background:"none"}}
                // onPlay={handlePlay}
                src={song}
            // onPause={handleStop}
            />
        </Box>
    )
}

export default Album