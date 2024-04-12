import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Playlist from './Components/Playlist/Playlist';
import Header from './Components/Header/Header';
import Artist from './Components/Artist/Artist';
import Album from './Components/Album/Album';
const clientId = '0086f2b2285642c1bbf0b047aa9cd7f3';
const secretId = '34857d55d584456b953e4267c58bbfe6'
function App() {
  const [accessToken,setAccessToken] = useState("");
  useEffect(() => {


    axios.post(`https://accounts.spotify.com/api/token`,
      'grant_type=client_credentials', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(clientId + ':' + secretId)
        }
    })
      .then((res) => {
        console.log(res);
        setAccessToken(res.data.access_token)
      }).catch((e) => {
        console.log(e);
      })

  }, [])
  return (
    <div className="main">
      <div className='wrappe'>
        {/* <Header accessToken={accessToken}/> */}
        <Routes>
          <Route path='/' element={<HomePage accessToken={accessToken}/>} />
          <Route path='/playlist/track/:id' element={<Playlist accessToken={accessToken}/>} />
          <Route path='/album/track/:id' element={<Album accessToken={accessToken}/>} />
          <Route path='/artist/:id' element={<Artist accessToken={accessToken}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
