import React from 'react'
import Header from '../Components/Header/Header'
import Albums from '../Components/Albums/Albums'

const HomePage = ({accessToken}) => {
  
  return (
    <div>
        <Header accessToken={accessToken}/>
        <Albums accessToken={accessToken}/>
    </div>
  )
}

export default HomePage