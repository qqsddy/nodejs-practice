const express = require('express');
const db = require('./../modules/db_connect');

const router = express.Router();

router.get('/', async (req, res)=>{
    const sql = "SELECT * FROM products";

    [results] = await db.query(sql);
    // console.log(results[0])
    // res.send(results[0]);
    // const [rs] = await db.query(`SELECT * FROM products`);
    // res.json(rs);
    res.render('home', results[0]);
});

module.exports = router;