"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const index_1 = require("./controller/index");
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const swaggerDocument = JSON.parse((0, fs_1.readFileSync)(`${__dirname}/swagger.json`, { encoding: 'utf8' }));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, body_parser_1.default)({ extended: true }));
app.use('/documentation', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.get('/estimate', 
/*  #swagger.tags = ['Estimate']
    #swagger.description = 'Get estimation'
    #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Estimate" },
    }
*/
index_1.estimate);
app.get('/get-rates', 
/*  #swagger.tags = ['GetRates']
    #swagger.description = 'Get rates'
    #swagger.responses[200] = {
        schema: { $ref: "#/definitions/GetRates" },
    }
*/
index_1.getRates);
app.listen(4000, () => {
    console.log(`server running on port ${4000}`);
});
