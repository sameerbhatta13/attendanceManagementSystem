import React from 'react'
import bannerImage from '../images/main.jpg'
const HomePage = () => {
  return (
    <>
    <div style={{ backgroundColor:'#e9dad7', padding: '10px 0', textAlign: 'center' }}>
        <img 
          src={bannerImage} 
          alt="Banner" 
          style={{ width: '100%', height: '70vh', objectFit: 'cover' }} 
        />
      </div>
    
    </>
  )
}

export default HomePage