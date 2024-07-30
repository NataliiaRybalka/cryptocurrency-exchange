import { Request, Response } from 'express';
import axios from 'axios';

import { getRatesBinance, getRatesKuCoin } from '../lib/requests';

enum Exchanges {
	Binance = 'Binance',
	KuCoin = 'KuCoin',
};

interface EstimateResult {
	exchangeName: Exchanges;
	outputAmount: Number;
};

interface GetRatesResult {
	exchangeName: Exchanges;
	rate: Number;
};

export const estimate = async (req: Request, res: Response) => {
	const { inputAmount, inputCurrency, outputCurrency } = req.query;
	if (!inputAmount || !inputCurrency || !outputCurrency) throw new Error('Please provide all data.');

	try {
		const binancePrice = await getRatesBinance(inputCurrency.toString(), outputCurrency.toString());
		const kucoinPrice = await getRatesKuCoin(inputCurrency.toString(), outputCurrency.toString());

		const result: EstimateResult = {
			exchangeName: Exchanges.Binance,
			outputAmount: 0
		};

		return res.status(200).json(result);
	} catch (e){
		return res.status(400).json(e);
	}
};

export const getRates = async (req: Request, res: Response) => {
	const { baseCurrency, quoteCurrency } = req.query;
	if (!baseCurrency || !quoteCurrency) throw new Error('Please provide all data.');

	try {
        const binancePrice = await getRatesBinance(baseCurrency.toString(), quoteCurrency.toString());
		const kucoinPrice = await getRatesKuCoin(baseCurrency.toString(), quoteCurrency.toString());

		if (typeof(binancePrice) === 'string') return res.status(404).json(binancePrice);
		if (typeof(kucoinPrice) === 'string') return res.status(404).json(kucoinPrice);

		const result: Array<GetRatesResult> = [
			{
				exchangeName: Exchanges.Binance,
				rate: Number(binancePrice)
			},
			{
				exchangeName: Exchanges.KuCoin,
				rate: Number(kucoinPrice)
			}
		];
		return res.status(200).json(result);
	} catch (e){
		return res.status(400).json(e);
	}
};
