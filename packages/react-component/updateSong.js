import { useState } from "react";
import axios from 'axios';

const UpdateSong = () => {
    const [uuid, setUuid] = useState('');
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [mood, setMood] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const token = localStorage.getItem('jwt');

    const handleUuidChange = (event) => {
        setUuid(event.target.value);
    }
    const handleSongNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDurationChange = (event) => {
        const value = event.target.value;
        const integerValue = parseInt(value);
        setDuration(integerValue);
    }

    const handleMoodChange = (event) => {
        setMood(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const songData = {
                name: name,
                duration: duration,
                mood: mood
            };

            const response = await axios.put(`http://localhost:10200/api/song/${uuid}`, songData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setMessage('Chanson mise à jour avec succès');
                setError(null);
            } else {
                setError('La mise à jour de la chanson a échoué');
                setMessage('');
            }
        } catch (error) {
            setError('Erreur lors de la mise à jour de la chanson');
            setMessage('');
        }
    }

    return (
        <div>
            <h2>Modifier une chanson</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID de la chanson à mettre à jour:</label>
                    <input type="text" value={uuid} onChange={handleUuidChange}  placeholder="ID de la chanson à mettre à jour" />
                </div>
                <div>
                    <label>Nouveau nom de la chanson:</label>
                    <input type="text" value={name} onChange={handleSongNameChange} />
                </div>
                <div>
                    <label>Nouvelle durée:</label>
                    <input type="text" value={duration} onChange={handleDurationChange} />
                </div>
                <div>
                    <label>Nouvel état d'esprit:</label>
                    <input type="text" value={mood} onChange={handleMoodChange} />
                </div>
                <button type="submit">Mettre à jour</button>
            </form>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
        </div>
    );
}

export default UpdateSong;
