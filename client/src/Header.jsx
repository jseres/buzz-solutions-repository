import React from 'react'

export default function Header({ query, setQuery, fetchPhotos, searchInputRef }) {
  return (
    <div className="header-row mb-4">
      <img className="header-inline-logo" src="https://www.buzzsolutions.co/wp-content/uploads/2024/10/buzz-solutions-logo-big-final-1.svg" alt="Buzz Solutions" />
      <h1 className="app-title">Flickr Viewer</h1>

      <div className="search-dropdown-wrap">
        <div className="search-dropdown" role="search" aria-label="Search">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const trimmed = (searchInputRef.current && searchInputRef.current.value) ? searchInputRef.current.value.trim() : ''
              setQuery(trimmed)
              fetchPhotos(trimmed)
            }}
          >
            <div className="search-input-wrap">
              <span className="search-input-icon" aria-hidden="true">🔍</span>
              <input
                ref={searchInputRef}
                className="form-control"
                placeholder="tag(s) — e.g. cat,dog"
                defaultValue={query}
                aria-label="Search tags"
                autoFocus
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
