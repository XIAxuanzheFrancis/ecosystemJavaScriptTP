import React, { useState } from 'react';
import axios from 'axios';

const DeleteSong = () => {
    const [uuid, setUuid] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const token = localStorage.getItem('jwt');

    const handleUuidChange = (event) => {
        setUuid(event.target.value);
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:10200/api/song/${uuid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 204) {
                setMessage('Chanson supprimée avec succès');
                setError(null);
            } else {
                setError('La suppression de la chanson a échoué');
                setMessage('');
            }
        } catch (error) {
            setError('Erreur lors de la suppression de la chanson');
            setMessage('');
        }
    }

    return (
        <div>
            <h2>Supprimer une chanson</h2>
            <div>
                <input type="text" value={uuid} onChange={handleUuidChange} placeholder="ID de la chanson à supprimer" />
                <button onClick={handleDelete}>Supprimer</button>
            </div>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
        </div>
    );
}

export default DeleteSong;
