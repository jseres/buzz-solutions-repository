import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Header from './Header'
import Gallery from './Gallery'

export default function AppContainer() {
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

  return (
    <>
      <Header
        query={query}
        setQuery={setQuery}
        fetchPhotos={fetchPhotos}
        searchInputRef={searchInputRef}
      />

      <Gallery photos={photos} />
    </>
  )
}
