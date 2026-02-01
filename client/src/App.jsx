import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import AppContainer from './AppContainer'
import Header from './Header'

export default function App() {
  const [photos, setPhotos] = useState([])
  const [query, setQuery] = useState('')
  const searchInputRef = useRef(null)

  const fetchPhotos = async (tags = '') => {
    try {
      const url = `http://localhost:5000/api/photos${tags ? `?tags=${encodeURIComponent(tags)}` : ''}`
      const res = await axios.get(url)
      setPhotos(res.data.items || [])
    } catch (e) {
      console.error(e)
      setPhotos([])
    } 
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  // need to remove this before pushing so I just test fetchPhotos inside the 
  return (
    <div className="container-fluid p-0">
      <Header
        query={query}
        setQuery={setQuery}
        fetchPhotos={fetchPhotos}
        searchInputRef={searchInputRef}
      />

      <AppContainer photos={photos} />
    </div>
  )
}


