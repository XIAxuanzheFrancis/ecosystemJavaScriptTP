import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [uuid, setUuid] = useState('');
    const [song, setSong] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('jwt');

    const handleUuidChange = (event) => {
        setUuid(event.target.value);
    }

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:10200/api/song/${uuid}`,{
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
            if (response.status === 200) {
                setSong(response.data);
                setError(null);
            } else {
                setError('Chanson non trouvée');
                setSong(null);
            }
        } catch (error) {
            setError('Erreur lors de la recherche de la chanson');
            setSong(null);
        }
    }

    return (
        <div>
            <div>
                <input type="text" value={uuid} onChange={handleUuidChange} placeholder="ID de la chanson" />
                <button onClick={handleSearch}>Rechercher</button>
            </div>
            {error && <p>{error}</p>}
            {song && (
                <div>
                    <h3>Chanson trouvée :</h3>
                    <p>UUID: {song.uuid}</p>
                    <p>Nom: {song.name}</p>
                    <p>Durée: {song.duration}</p>
                    <p>Ambiance: {song.mood}</p>
                </div>
            )}
        </div>
    );
}

export default Search;
