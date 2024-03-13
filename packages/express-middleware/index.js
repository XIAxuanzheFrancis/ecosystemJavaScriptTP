const express = require('express');
const {expressjwt: jwt} = require("express-jwt");
const router = express.Router();
const songController = require('./songController');

router.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }))
router.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).send("invalid token...");
      } else {
        next(err);
      }
})


const db = require('better-sqlite3')(process.env.DB_PATH, {})
db.pragma('foreign_keys = ON');

router.get('/', songController.getAll);
// router.get('/', (req, res) => {
//     console.log("get all")
//     const uuid = req.auth ? req.auth.sub : null;


//     if (!uuid) {
//         return res.status(401).json({ error: "Utilisateur non authentifié." });
//     }

//     const stmt = db.prepare('SELECT * FROM song WHERE user = ?');
//     const songs = stmt.all(uuid);

//     res.json(songs);
// });

router.get('/:uuid', songController.getSong);
// router.get('/:uuid', (req, res) => {
//     const uuid = req.params.uuid;
//     const user = req.auth ? req.auth.sub : null;

//     if (!user) {
//         return res.status(401).json({ error: "Utilisateur non authentifié." });
//     }

//     const stmt = db.prepare('SELECT uuid, name, duration, mood FROM song WHERE uuid = ? AND user = ?');
//     const song = stmt.get(uuid, user);

//     if (!song) {
//         return res.status(404).json({ error: "Chanson non trouvée." });
//     }
//     res.status(200).json(song);
// });



router.post('/', songController.createSong);
// router.post('/', (req, res) => {
//     user = req.auth ? req.auth.sub : null;
//     const MoodList = new Set(['work', 'training', 'party']);
//     if (!user) {
//         return res.status(401).json({ error: "Utilisateur non authentifié." });
//     }
//     const { name, duration, mood } = req.body;
//     if (!name || !duration || !mood || !user || typeof duration === 'string' || !MoodList.has(mood)) {
//         return res.status(422).json({ error: "Toutes les informations nécessaires ne sont pas fournies." });
//     }

//     try {
//         uuid = uuidgen()
//         const stmt = db.prepare('INSERT INTO song (uuid, name, duration, mood, user) VALUES (?, ?, ?, ?, ?)');
//         const result = stmt.run(uuid, name, duration, mood, user);
//         res.status(201).json({
//             uuid,
//             name,
//             duration,
//             mood,
//         });
//     } catch (error) {
//         console.error("Erreur lors de l'insertion de la chanson :", error);
//         res.status(500).json({ error: "Erreur lors de la création de la chanson." });
//     }
// });



router.put('/:uuid', songController.modificationSong);
// router.put('/:uuid', (req, res) => {
//     const uuid = req.params.uuid;
//     user = req.auth ? req.auth.sub : null;
//     const { name, duration, mood } = req.body;
//     const allowedMoods = new Set(['party', 'work', 'training']);

//     if (!user) {
//         return res.status(401).json({ error: "Utilisateur non authentifié." });
//     }
//     if (!name || !duration || !mood || !user || typeof duration === 'string' || !allowedMoods.has(mood)) {
//         return res.status(422).json({ error: "Toutes les informations nécessaires ne sont pas fournies." });
//     }


//     const stmt = db.prepare('SELECT uuid, name, duration, mood FROM song WHERE uuid = ? AND user = ?');
//     const song = stmt.get(uuid, user);
//     if (!song) {
//         return res.status(404).json({ error: "Chanson non trouvée." });
//     }

//     try {
//         const stmt = db.prepare('UPDATE song SET name = ?, duration = ?, mood = ? WHERE uuid = ? AND user = ?');
//         const result = stmt.run(name, duration, mood, uuid, user);
//         res.status(200).json({
//             uuid,
//             name,
//             duration,
//             mood
//         });
//     } catch (error) {
//         console.error("Erreur lors de la modification de la chanson :", error);
//         res.status(500).json({ error: "Erreur lors de la modification de la chanson." });
//     }
// });

router.delete('/:uuid', songController.suppressionSong);
// router.delete('/:uuid',(req,res) => {
//     const uuid = req.params.uuid;
//     user = req.auth ? req.auth.sub : null;
//     const { name, duration, mood } = req.body;
//     if (!user) {
//         return res.status(401).json({ error: "Utilisateur non authentifié." });
//     }

//     const stmt = db.prepare('SELECT uuid, name, duration, mood FROM song WHERE uuid = ? AND user = ?');
//     const song = stmt.get(uuid, user);
//     if (!song) {
//         return res.status(404).json({ error: "Chanson non trouvée." });
//     }

//     try{
//         const stmt = db.prepare('DELETE FROM song WHERE uuid = ?');
//         stmt.run(uuid)
//         res.status(204).json("song deleted")
//     }catch(error){
//         res.status(500).json({ error: "Erreur lors de la suppriment de la chanson." });
//     }

// });




module.exports = router