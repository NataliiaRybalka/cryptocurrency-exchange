const swaggerAutogen = require('swagger-autogen');
swaggerAutogen();

const outputFile = './swagger.json';
const endpointsFiles = ['./index'];

const doc = {
	info: {
		version: "1.0.0",
		title: "Air MD",
	},
	host: "localhost:4000",
	tags: [
		{
			"name": "Estimate",
			"description": "API for Estimate"
		},
		{
			"name": "GetRates",
			"description": "API for GetRates"
		}
	],
	"definitions": {
		"Estimate": {
			"properties": {
				"exchangeName": {
					"type": "string"
				},
				"outputAmount": {
					"type": "number"
				},
			}
		},
		"Rate": {
			"properties": {
				"exchangeName": {
					"type": "string"
				},
				"rate": {
					"type": "number"
				},
			}
		},
		"GetRates": {
			"properties": {
				"data": {
					"type": "array",
					"items": {
						"type": "object",
						"$ref": "#/definitions/Rate"
					}
				},
			}
		}
	}
};

swaggerAutogen(outputFile, endpointsFiles, doc);
