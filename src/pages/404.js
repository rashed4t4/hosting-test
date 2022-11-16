import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

function NoMatch() {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate(-1)
    }, 1500)
  }, []);

  return (
    <div>
      <h1>Ooooops.....</h1>
      <h2>That page cannot be found.</h2>
      <p>Going back to the Homepage</p>
    </div>
  )
}

export default NoMatch