const express = require('express');

const app = express();

app.use(express.static('public'));

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`App running on localhost:${PORT}`)
});