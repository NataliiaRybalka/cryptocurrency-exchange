import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import { dirname } from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import swaggerUi from 'swagger-ui-express';

import { estimate, getRates } from './controller/index';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const swaggerDocument = JSON.parse(readFileSync(`${__dirname}/swagger.json`, {encoding: 'utf8'}));

const app = express();

app.use(cors());
app.use(bodyParser({extended: true}));
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get(
	'/estimate',
	/*  #swagger.tags = ['Estimate']
		#swagger.description = 'Get estimation'
		#swagger.responses[200] = { 
			schema: { $ref: "#/definitions/Estimate" },
		}
	*/
	estimate
);
app.get(
	'/get-rates',
	/*  #swagger.tags = ['GetRates']
		#swagger.description = 'Get rates'
		#swagger.responses[200] = { 
			schema: { $ref: "#/definitions/GetRates" },
		}
	*/
	getRates
);

app.listen(4000, () => {
	console.log(`server running on port ${4000}`);
});
