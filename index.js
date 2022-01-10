require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./modules/db_connect')

// 設定樣板引擎，要放在所有router前面
app.set('view engine', 'ejs');

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use((req, res, next)=>{
    next();
});

// 設定根目錄
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', {name: 'anita'});
    console.log(process.env.DB_HOST)
});

// crud products
app.use('/products', require('./routes/products'));

// 設定404頁面
app.use((req, res)=>{
    res.contentType('text/plain');
    res.status(404);
    res.send('404-找不到頁面');
});

app.listen(3000, () => {
    console.log('Sever started');
});

