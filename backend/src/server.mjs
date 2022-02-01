import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


let movieData = undefined;
fs.readFile("./data/movies.json", "utf8", (err, data) => {
    console.log(err)
    console.log(data)
    movieData = data;
});


const app = express();
app.use(express.static(path.join(__dirname, 'build')));


app.use(bodyParser.json());

app.get('/hello', (req, res) => { res.send("Hello")});
app.post('/hello', (req, res) => { res.send(`Hello there ${req.body.name}`)})
app.get('/api/movies', (req, res) => {
    res.send(movieData);
})

//app.get('*', (req, res) => { res.sendFile(path.join(__dirname + '/build/index.html'))})

app.listen(8000, () => console.log("listening on port 8000"));