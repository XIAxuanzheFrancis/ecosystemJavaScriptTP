const db = require('better-sqlite3')(process.env.DB_PATH, {});
db.pragma('foreign_keys = ON');
// const { uuid: uuidgen } = require('uuidv4');
const { v4: uuidgen } = require('uuid')

function getAllSongs(uuid) {
    const stmt = db.prepare('SELECT * FROM song WHERE user = ?');
    return stmt.all(uuid);
}


function getSongByUUID(uuid, user) {
    const stmt = db.prepare('SELECT uuid, name, duration, mood FROM song WHERE uuid = ? AND user = ?');
    return stmt.get(uuid, user);
}


function addSong(name, duration, mood, user) {
    try {
        const stmt = db.prepare('INSERT INTO song (uuid, name, duration, mood, user) VALUES (?, ?, ?, ?, ?)');
        const uuid = uuidgen();
        stmt.run(uuid, name, duration, mood, user);
        return { uuid, name, duration, mood };
    } catch (error) {
        throw new Error("Erreur lors de l'insertion de la chanson :" + error.message);
    }
}


function changeSong(name, duration, mood, user, uuid) {
    try {
        const stmt = db.prepare('UPDATE song SET name = ?, duration = ?, mood = ? WHERE uuid = ? AND user = ?');
        const result = stmt.run(name, duration, mood, uuid, user);
        return result;
    } catch (error) {
        throw new Error("Erreur lors de la modification de la chanson :" + error.message);
    }
}

function deleteSong(uuid, user) {
    try{
        const stmt = db.prepare('DELETE FROM song WHERE uuid = ?');
        const result = stmt.run(uuid);
        return result;
    }catch(error){
        throw new Error("Erreur lors de la suppriment de la chanson." + error.message);
    }
}


module.exports = { getAllSongs, getSongByUUID, addSong, changeSong, deleteSong };
