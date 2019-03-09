const express = require('express');
const morgan = require('morgan');
const path = require('path');
const parser = require('body-parser');
const cors = require('cors');
const router = require('./routes');
const app = express();
const port = process.env.PORT || 3004;

app.use(morgan('dev'));
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(router);
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => {
	console.log(`server running at: http://localhost:${port}`);
});
