import express, { application } from 'express';

const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello!');
})

app.listen(8000, () => {
    console.log("tanginamo")
})