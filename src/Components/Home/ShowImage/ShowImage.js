import React from 'react'

const ShowImage = () => {
    const images=[
        "https://i.ibb.co/ZzdDtMB/Untitled.png",
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/school-tutoring-service-flyer-template-design-14ab1f521ebdc6627e877a308ef5c2be_screen.jpg?ts=1569231238"

    ]
  return (
    <div className='mx-3'>
        <img src={images[1]} height="355" alt="" />
    </div>
  )
}

export default ShowImage