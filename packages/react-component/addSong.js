import { useState } from "react";
import axios from 'axios';

const AddSong=()=>{
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [mood, setMood] = useState('');
    const token = localStorage.getItem('jwt');

    const handleSongNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDuration = (event) => {
        const value = event.target.value;
        const integerValue = parseInt(value);
        setDuration(integerValue);
        
    }

    const handleMood = (event) => {
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
      
          const response = await axios.post('http://localhost:10200/api/song', songData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      
          console.log('Chanson ajoutée avec succès:', response.data);
        } catch (error) {
          console.error('Erreur lors de l\'ajout de la chanson', error.message);
        }
      }
      
    return (
        <div>
            <h2>Ajouter une chanson</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Song Name:</label>
                    <input type="text" value={name} onChange={handleSongNameChange} />
                </div>
                <div>
                    <label>Duration:</label>
                    <input type="text" value={duration} onChange={handleDuration} />
                </div>
                <div>
                    <label>Mood:</label>
                    <input type="text" value={mood} onChange={handleMood} />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}

export default AddSong;