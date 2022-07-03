const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

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