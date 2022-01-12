const fs = require('fs');
const express = require('express');
const upload = require('./../modules/upload_image')
const db = require('./../modules/db_connect');


const router = express.Router();

// list all products
router.get('/', async (req, res)=>{
    const sql = "SELECT * FROM products";

    [products] = await db.query(sql);
    
    res.render('prod_list', products);
});


// add product
router.get('/add', async ( req, res )=>{
    res.render('prod_add');    
});
router.post('/add', upload.single('img'),async ( req, res )=>{
    const output = {
        success: false,
        error: ''
    }
    const sql = "INSERT INTO products (`name`, `detail`, `price`, `in_stock`, `category`, `img`) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [
        req.body.name,
        req.body.detail,
        req.body.price,
        req.body.in_stock,
        req.body.category,
        req.file.filename,
    ])


    if ( result.affectedRows ) {
        output.success = true;
        output.result = result;
    } else {
        output.error = 'add product fail';
    }
    res.json(output)
});


// edit product
router.get('/edit/:id', async ( req, res )=>{
    const id = parseInt(req.params.id);

    const sql = "SELECT * FROM products WHERE id=?";
    const [product] = await db.query(sql, [ id ]);
    if( !product.length ) {
        return res.redirect(req.baseUrl)
    }

    product[0].referer = req.get('Referer') || '';

    res.render('prod_edit', product[0]);
});
router.post('/edit/:id', upload.single('img'),async ( req, res ) => {
    const output = {
        success: false,
        error: '',
        code: 0,
    };

    const id = parseInt(req.params.id);
    if( !id ) {
        output.error = 'error-- id not found';
        output.code = 410;
        return res.json(output)
    }
    const sql = "SELECT * FROM products WHERE id=?";
    const [product_check] = await db.query(sql, [ id ]);
    if( !product_check.length ) {
        output.error = 'error-- id not found';
        output.code = 420;
        return res.json(output)
    }

    const [get_img] = await db.query(`SELECT img FROM products WHERE id=${id};`)
    const old_img = get_img[0].img;
    var img;

    if(typeof req.file === 'undefined') {
        img = old_img;
    } else {
        img = req.file.filename
        fs.unlink(`${__dirname}/../public/img/${old_img}`, (err) => {
            if(err) throw err;
            console.log('file deleted');
        })

    }

    const sql_update = "UPDATE products SET name=?, detail=?, price=?, in_stock=?, category=?, img=? WHERE id=?";
    const [result] = await db.query(sql_update, [ 
        req.body.name,
        req.body.detail,
        req.body.price,
        req.body.in_stock,
        req.body.category,
        img,
        id 
    ]);

    output.result = result;
    
    if( result.changedRows ){
        output.success = true;
    } else {
        output.error = 'proudct is not updated, try again or click "Back" to back to product list'
    }

    res.json(output)

});


// delete product
router.get('/del/:id', async ( req, res ) => {
    const id = parseInt(req.params.id);

    if( !id ) {
        res.redirect(baseUrl)
    }

    const sql = "SELECT * FROM products WHERE id=?";
    const [product_check] = await db.query(sql, [ id ]);

    if( !product_check.length ) {
        res.redirect(baseUrl)
    }

    const sql_del = "DELETE FROM products WHERE id=?";
    const [result] = await db.query(sql_del, [ id ]);
    const referer = req.get('Referer')

    if ( result.affectedRows ) {
        res.redirect(referer)
    } else {
        res.redirect(req.baseUrl)
    }
});

module.exports = router;