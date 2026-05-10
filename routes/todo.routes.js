const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM todos;');
        res.status(200).json({ todos: data.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Midagi läks valesti' });
    }
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const { task } = req.body;

    try {
        const data = await db.query('INSERT INTO todos (task) VALUES ($1);', [task]);
        console.log(data);
        res.status(200).json({message: `${data.rowCount} row inserted.`});
    } 
    catch (error) {
        console.log(error);
    } 

});

router.delete('/', async (req, res) => {
    const {id} = req.body;
    const data = await db.query("SELECT * FROM todos WHERE id = $1;", [id]);

    if(data.rows.length === 0) {
        res.json({message: "there no such task"});
    } else {
        try {
            const result = await db.query("DELETE FROM todo WHERE id = $1;", [id]);
            res.status(200).json({message: `${result.rowCount} row was deleted.`});
        }
        catch(error) {
            console.log(error);
        }
    }
});

router.get('/test', async (req, res) => {
    res.status(200).json({message: "test"});
});

module.exports = router;