import React from 'react'

export default function AppContainer({ photos = [] }) {
  return (
    <div className="container app-container">
      <div style={{ marginBottom: '0.5rem' }} />
      <div className="photo-gallery">
        {photos.map((p, idx) => (
          <a className="photo-card" key={idx} href={p.link} target="_blank" rel="noopener noreferrer">
            <img src={p.media.m} alt={p.title || 'Photo'} />
            <div className="photo-meta">
              <div className="meta-top">
                <div className="meta-left">
                  <div className="photo-title">{p.title || 'Untitled'}</div>
                  <div className="photo-author">{extractAuthorName(p.author)}</div>
                </div>
                <div className="meta-right">
                  <div className="meta-stats">
                    <span className="stat">
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.012 4.665 24 6 15.595 0 9.748l8.332-1.73z"/></svg>
                      <span className="stat-count">{p.stars || 0}</span>
                    </span>
                    <span className="stat">
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21 6h-18v12h4v4l4-4h10z"/></svg>
                      <span className="stat-count">{p.comments || 0}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )

  function extractAuthorName(author = '') {
    try {
      const m = author.match(/"([^\"]+)"/)
      if (m && m[1]) return m[1]
      const p = author.match(/\(([^)]+)\)/)
      if (p && p[1]) return p[1]
    } catch (e) {
    }
    return author
  }
}
