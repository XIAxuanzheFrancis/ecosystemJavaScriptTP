const songModel = require('./songModel');


function getAll(req, res) {
    console.log("get all")
    const uuid = req.auth ? req.auth.sub : null;

    if (!uuid) {
        return res.status(401).json({ error: "Utilisateur non authentifié." });
    }

    const songs = songModel.getAllSongs(uuid);
    res.json(songs);
}

function getSong(req, res) {
    const uuid = req.params.uuid;
    const user = req.auth ? req.auth.sub : null;

    if (!user) {
        return res.status(401).json({ error: "Utilisateur non authentifié." });
    }

    const song = songModel.getSongByUUID(uuid, user);

    if (!song) {
        return res.status(404).json({ error: "Chanson non trouvée." });
    }

    res.status(200).json(song);
}


function createSong(req, res) {
    const user = req.auth ? req.auth.sub : null;
    const MoodList = new Set(['work', 'training', 'party']);

    if (!user) {
        return res.status(401).json({ error: "Utilisateur non authentifié." });
    }

    const { name, duration, mood } = req.body;

    if (!name || !duration || !mood || typeof duration === 'string' || !MoodList.has(mood)) {
        return res.status(422).json({ error: "Toutes les informations nécessaires ne sont pas fournies." });
    }

    try {
        const newSong = songModel.addSong(name, duration, mood, user);
        res.status(201).json(newSong);
    } catch (error) {
        console.error("Erreur lors de l'insertion de la chanson :", error);
        res.status(500).json({ error: "Erreur lors de la création de la chanson." });
    }
}


function modificationSong(req, res) {
    const uuid = req.params.uuid;
    const user = req.auth ? req.auth.sub : null;
        const MoodList = new Set(['party', 'work', 'training']);

    if (!user) {
        return res.status(401).json({ error: "Utilisateur non authentifié." });
    }

    const { name, duration, mood } = req.body;

    if (!name || !duration || !mood || !user || typeof duration === 'string' || !MoodList.has(mood)) {
        return res.status(422).json({ error: "Toutes les informations nécessaires ne sont pas fournies." });
    }

    const song = songModel.getSongByUUID(uuid, user);

    if (!song) {
        return res.status(404).json({ error: "Chanson non trouvée." });
    }

    try {
        const result = songModel.changeSong(name,duration, mood, user, uuid);
        res.status(200).json(result);
    } catch (error) {
        console.error("Erreur lors de la modification de la chanson :", error);
        //res.status(500).json({ error: "Erreur lors de la modification de la chanson." });
        res.status(500).json( error.message);
    }
}


function suppressionSong(req, res) {
    const uuid = req.params.uuid;
    const user = req.auth ? req.auth.sub : null;

    if (!user) {
        return res.status(401).json({ error: "Utilisateur non authentifié." });
    }

    const song = songModel.getSongByUUID(uuid, user);

    if (!song) {
        return res.status(404).json({ error: "Chanson non trouvée." });
    }

    try{
        const result = songModel.deleteSong(uuid, user);       
        res.status(204).json(result);
    }catch(error){
        res.status(500).json({ error: "Erreur lors de la suppriment de la chanson." });
    }

}


module.exports = { getAll, getSong, createSong, modificationSong, suppressionSong };