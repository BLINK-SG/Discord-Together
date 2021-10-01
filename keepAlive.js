const express = require('express');
const app = express();
const port = 2323;
app.get('/', (req, res) => res.send('DISCORD TOGETHER is Alive!'));

app.listen(port, () => console.log(`DISCORD TOGETHER is listening to http://localhost:${port}`));