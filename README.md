# cryptocurrency-exchange
Сryptocurrency Уxchange

Start the server
```
npm run dev
```

Розробити API сервіс який буде мати два ендпоінти.

Перший ендпоінт буде визначати на якій біржі буде найвигідніше обміняти крипто валюти - estimate.
Другий буде повертати ціни вказаної криптовалюти на всіх біржах - getRates.

Сервіс має підтримувати наступні крипто біржі: Binance ([https://www.binance.com](https://www.binance.com/)) та KuCoin ([https://www.kucoin.com](https://www.kucoin.com/)) та такі криптовалюти: ETH, BTC та USDT.
Це дві централізовані біржі, працювати потрібно з API цих бірж.
KuCoin API: https://docs.kucoin.com/#general
Binance API: https://binance-docs.github.io/apidocs/spot/en/#change-log

Ціни можна визначати по останьому трейду на вибраній парі.

Estimate ендпоінт має приймати три параметри: inputAmount, inputCurrency, outputCurrency та повертати exchangeName (Binance or KuCoin) та outputAmount.
Можна обрати будь-який формат запиту та відповіді.

Приклад роботи ендпоінта.
Дано:
вартість BTC на binance 11000 USDT.
вартість BTC на kucoin 10000 USDT.

На запит inputAmount: 0.5, inputCurrency: “BTC”, outputCurrency: “USDT” сервіс має відповідати exchangeName: binance, outputAmount: 5 500.
На запит inputAmount: 20000, inputCurrency: “USDT”, outputCurrency: “BTC” сервіс має відповідати exchangeName: kucoin, outputAmount: 2.

GetRates ендпоінт буде приймати два параметри baseCurrency та quoteCurrency. І повинен повертати ціну за 1 baseCurrency в quoteCurrency для всіх бірж.

Приклад роботи ендпоінта.
Дано:
вартість BTC на binance 10 ETH.
вартість BTC на kucoin 8 ETH.

На запит baseCurrency: BTC, quoteCurrency: ETH сервіс має відповідати { [ { exchangeName: binance, rate: 10 }, { exchangeName: kucoin, rate: 8 }]} ( тобто ціна одного BTC на binance дорівнює 10 ETH, на kucoin 8 ETH )
На запит baseCurrency: ETH, quoteCurrency: BTC сервіс має відповідати { [ { exchangeName: binance, rate: 0.1 }, { exchangeName: kucoin, rate: 0.125 }]}( тобто ціна одного ETH на binance дорівнює 0.1 BTC, на kucoin 0.125 BTC )

Передбачити в архітектурі сервісу швидке додавання нових бірж та криптовалют.