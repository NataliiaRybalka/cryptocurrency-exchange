import { Request, Response } from 'express';

import { getRatesBinance, getRatesKuCoin } from '../lib/api';

enum Exchanges {
	Binance = 'Binance',
	KuCoin = 'KuCoin',
};

export const estimate = async (req: Request, res: Response) => {
	// get params
	const { inputAmount, inputCurrency, outputCurrency } = req.query;
	if (!inputAmount || !inputCurrency || !outputCurrency) return res.status(400).json('Please provide all data.');

	try {
		// get prices from Binance and KuCoin
		const [binancePrice, kucoinPrice] = await Promise.all([
			getRatesBinance(inputCurrency.toString(), outputCurrency.toString()),
			getRatesKuCoin(inputCurrency.toString(), outputCurrency.toString())
		]);

		if (typeof(binancePrice) !== 'number') return res.status(404).json(binancePrice);
		if (typeof(kucoinPrice) !== 'number') return res.status(404).json(kucoinPrice);

		const result = {
			exchangeName: '',
			outputAmount: 0,
		};

		// price comparison
		if (binancePrice > kucoinPrice) {
			result.exchangeName = Exchanges.Binance;
			result.outputAmount = Number(inputAmount) * Number(binancePrice);
		} else if (binancePrice < kucoinPrice) {
			result.exchangeName = Exchanges.KuCoin;
			result.outputAmount = Number(inputAmount) * Number(kucoinPrice);
		} else {
			result.exchangeName = `The value of the currency ${inputCurrency} in ${outputCurrency} is the same on the exchanges Binance and KuCoin.`;
			result.outputAmount = Number(inputAmount) * Number(binancePrice);
		}

		return res.status(200).json(result);
	} catch (e){
		return res.status(400).json(e);
	}
};

export const getRates = async (req: Request, res: Response) => {
	// get params
	const { baseCurrency, quoteCurrency } = req.query;
	if (!baseCurrency || !quoteCurrency) return res.status(400).json('Please provide all data.');

	try {
		// get prices from Binance and KuCoin
		const [binancePrice, kucoinPrice] = await Promise.all([
			getRatesBinance(baseCurrency.toString(), quoteCurrency.toString()),
			getRatesKuCoin(baseCurrency.toString(), quoteCurrency.toString())
		]);
	
		if (typeof(binancePrice) !== 'number') return binancePrice;
		if (typeof(kucoinPrice) !== 'number') return kucoinPrice;

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
	} catch (e){
		return res.status(400).json(e);
	}
};
