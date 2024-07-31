"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRatesKuCoin = exports.getRatesBinance = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("./constants");
const getRatesBinance = async (baseCurrency, quoteCurrency) => {
    try {
        const symbolsResponse = await axios_1.default.get(`${constants_1.BINANCE_BASE_URL}/exchangeInfo`);
        let symbol = symbolsResponse.data.symbols.find((symbolInfo) => symbolInfo.symbol === `${baseCurrency}${quoteCurrency}`);
        if (symbol) {
            const response = await axios_1.default.get(`${constants_1.BINANCE_BASE_URL}/ticker/price`, { params: { symbol: symbol.symbol } });
            return Number(response.data.price);
        }
        else {
            symbol = symbolsResponse.data.symbols.find((symbolInfo) => symbolInfo.symbol === `${quoteCurrency}${baseCurrency}`);
            if (!symbol)
                return 'Your currencies were not found. Please check.';
            const response = await axios_1.default.get(`${constants_1.BINANCE_BASE_URL}/ticker/price`, { params: { symbol: symbol.symbol } });
            return 1 / response.data.price;
        }
    }
    catch (e) {
        return JSON.stringify(e);
    }
};
exports.getRatesBinance = getRatesBinance;
const getRatesKuCoin = async (baseCurrency, quoteCurrency) => {
    try {
        const symbolsResponse = await axios_1.default.get(`${constants_1.KuCoin_BASE_URL}/symbols`);
        let symbol = symbolsResponse.data.data.find((symbolInfo) => symbolInfo.symbol === `${baseCurrency}-${quoteCurrency}`);
        if (symbol) {
            const response = await axios_1.default.get(`${constants_1.KuCoin_BASE_URL}/market/orderbook/level1`, { params: { symbol: symbol.symbol } });
            return Number(response.data.data.price);
        }
        else {
            symbol = symbolsResponse.data.data.find((symbolInfo) => symbolInfo.symbol === `${quoteCurrency}-${baseCurrency}`);
            if (!symbol)
                return 'Your currencies were not found. Please check.';
            const response = await axios_1.default.get(`${constants_1.KuCoin_BASE_URL}/market/orderbook/level1`, { params: { symbol: symbol.symbol } });
            return 1 / response.data.data.price;
        }
    }
    catch (e) {
        return JSON.stringify(e);
    }
};
exports.getRatesKuCoin = getRatesKuCoin;
