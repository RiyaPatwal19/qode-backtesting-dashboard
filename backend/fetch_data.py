import yfinance as yf
import pandas as pd

stocks = [
    "RELIANCE.NS",
    "TCS.NS",
    "INFY.NS",
    "HDFCBANK.NS",
    "ICICIBANK.NS"
]

data = []

for symbol in stocks:
    stock = yf.Ticker(symbol)

    data.append({
        "Symbol": symbol,
        "Company": stock.info.get("longName"),
        "MarketCap": stock.info.get("marketCap"),
        "PE": stock.info.get("trailingPE")
    })

df = pd.DataFrame(data)

df.to_csv("data/stocks.csv", index=False)

print("Data saved successfully!")