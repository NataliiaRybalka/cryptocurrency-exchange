import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { estimate, getRates } from './controller/index';

const app = express();

app.use(cors());
app.use(bodyParser({extended: true}));

app.get('/estimate', estimate);
app.get('/get-rates', getRates);

app.listen(4000, () => {
	console.log(`server running on port ${4000}`);
});
