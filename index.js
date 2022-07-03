const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

// static files
app.use(express.static('./assets'));
// extract styles and scripts from sub pages to layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use layouts
app.use(expressLayouts);
// use express router
app.use('/', require('./routes/index'));

// set up views
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, (err)=>{
    if(err){
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is up! And running on port: ${port}`);
});