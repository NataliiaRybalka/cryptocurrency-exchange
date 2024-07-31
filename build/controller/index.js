"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRates = exports.estimate = void 0;
const api_1 = require("../lib/api");
var Exchanges;
(function (Exchanges) {
    Exchanges["Binance"] = "Binance";
    Exchanges["KuCoin"] = "KuCoin";
})(Exchanges || (Exchanges = {}));
;
const estimate = async (req, res) => {
    // get params
    const inputAmount = Number(req.query.inputAmount);
    const inputCurrency = String(req.query.inputCurrency).toUpperCase();
    const outputCurrency = String(req.query.outputCurrency).toUpperCase();
    if (!inputAmount || !inputCurrency || !outputCurrency)
        return res.status(400).json('Please provide all data.');
    try {
        // get prices from Binance and KuCoin
        const [binancePrice, kucoinPrice] = await Promise.all([
            (0, api_1.getRatesBinance)(inputCurrency.toString(), outputCurrency.toString()),
            (0, api_1.getRatesKuCoin)(inputCurrency.toString(), outputCurrency.toString())
        ]);
        if (typeof (binancePrice) !== 'number')
            return res.status(404).json(binancePrice);
        if (typeof (kucoinPrice) !== 'number')
            return res.status(404).json(kucoinPrice);
        const result = {
            exchangeName: '',
            outputAmount: 0,
        };
        // price comparison
        if (binancePrice > kucoinPrice) {
            result.exchangeName = Exchanges.Binance;
            result.outputAmount = inputAmount * Number(binancePrice);
        }
        else if (binancePrice < kucoinPrice) {
            result.exchangeName = Exchanges.KuCoin;
            result.outputAmount = inputAmount * Number(kucoinPrice);
        }
        else {
            result.exchangeName = `The value of the currency ${inputCurrency} in ${outputCurrency} is the same on the exchanges Binance and KuCoin.`;
            result.outputAmount = inputAmount * Number(binancePrice);
        }
        return res.status(200).json(result);
    }
    catch (e) {
        return res.status(400).json(e);
    }
};
exports.estimate = estimate;
const getRates = async (req, res) => {
    // get params
    const baseCurrency = String(req.query.baseCurrency).toUpperCase();
    const quoteCurrency = String(req.query.quoteCurrency).toUpperCase();
    if (!baseCurrency || !quoteCurrency)
        return res.status(400).json('Please provide all data.');
    try {
        // get prices from Binance and KuCoin
        const [binancePrice, kucoinPrice] = await Promise.all([
            (0, api_1.getRatesBinance)(baseCurrency.toString(), quoteCurrency.toString()),
            (0, api_1.getRatesKuCoin)(baseCurrency.toString(), quoteCurrency.toString())
        ]);
        if (typeof (binancePrice) !== 'number')
            return binancePrice;
        if (typeof (kucoinPrice) !== 'number')
            return kucoinPrice;
        const result = [
            {
                exchangeName: Exchanges.Binance,
                rate: binancePrice
            },
            {
                exchangeName: Exchanges.KuCoin,
                rate: kucoinPrice
            }
        ];
        return res.status(200).json(result);
    }
    catch (e) {
        return res.status(400).json(e);
    }
};
exports.getRates = getRates;
