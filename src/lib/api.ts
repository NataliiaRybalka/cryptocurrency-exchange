import axios from 'axios';

import { BINANCE_BASE_URL, KuCoin_BASE_URL } from './constants';

export const getRatesBinance = async (baseCurrency: string, quoteCurrency: string): Promise<Number | String> => {
	try {
		const symbolsResponse = await axios.get(`${BINANCE_BASE_URL}/exchangeInfo`);
		let symbol = symbolsResponse.data.symbols.find((symbolInfo: any) => symbolInfo.symbol === `${baseCurrency}${quoteCurrency}`);
			
		if (symbol) {
			const response = await axios.get(`${BINANCE_BASE_URL}/ticker/price`, { params: { symbol: symbol.symbol } }); 
			return Number(response.data.price);
		} else {
			symbol = symbolsResponse.data.symbols.find((symbolInfo: any) => symbolInfo.symbol === `${quoteCurrency}${baseCurrency}`);
			if (!symbol) return 'Your currencies were not found. Please check.';
	
			const response = await axios.get(`${BINANCE_BASE_URL}/ticker/price`, { params: { symbol: symbol.symbol } });
			return 1 / response.data.price;
		}
	} catch (e) {
		return JSON.stringify(e)
	}
};

export const getRatesKuCoin = async (baseCurrency: string, quoteCurrency: string): Promise<Number | String> => {
	try {
		const symbolsResponse = await axios.get(`${KuCoin_BASE_URL}/symbols`);
		let symbol = symbolsResponse.data.data.find((symbolInfo: any) => symbolInfo.symbol === `${baseCurrency}-${quoteCurrency}`);
	
		if (symbol) {
			const response = await axios.get(`${KuCoin_BASE_URL}/market/orderbook/level1`, { params: { symbol: symbol.symbol } });
			return Number(response.data.data.price);
		} else {
			symbol = symbolsResponse.data.data.find((symbolInfo: any) => symbolInfo.symbol === `${quoteCurrency}-${baseCurrency}`);
			if (!symbol) return 'Your currencies were not found. Please check.';
	
			const response = await axios.get(`${KuCoin_BASE_URL}/market/orderbook/level1`, { params: { symbol: symbol.symbol } });
			return 1 / response.data.data.price;
		}
	} catch (e) {
		return JSON.stringify(e);
	}
};
