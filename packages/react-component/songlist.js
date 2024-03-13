import React, { useState, useEffect } from 'react';

function SongList() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    async function fetchSongs() {
      try {
        const response = await fetch('http://localhost:10200/api/song', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des chansons');
        }
        const data = await response.json();
        setSongs(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchSongs();
  }, [token]);

  if (loading) {
    return <div className="container">Chargement en cours...</div>;
  }

  if (error) {
    return <div className="container text-danger">Erreur: {error}</div>;
  }

  return (
    <div className="container">
      <h2 class="titleListSong">Liste des chansons</h2>
      <div className="list-group">
        {songs.map(song => (
          <div key={song.uuid} className="list-group-item">
            <div>
              <strong>Nom:</strong> {song.name}
            </div>
            <div>
              <strong>Durée:</strong> {song.duration} secondes
            </div>
            <div>
              <strong>Ambiance:</strong> {song.mood}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongList;
