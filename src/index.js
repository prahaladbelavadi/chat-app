const path = require('path');
const express = require('express');

const app = new express();

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath))

app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
});
