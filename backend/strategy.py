import yfinance as yf

stocks = [
    "RELIANCE.NS",
    "TCS.NS",
    "INFY.NS",
    "HDFCBANK.NS",
    "ICICIBANK.NS"
]

stock_data = []

for symbol in stocks:

    info = yf.Ticker(symbol).info

    market_cap = info.get("marketCap", 0)
    pe = info.get("trailingPE", 999)

    # Filter
    if market_cap > 500000000000 and pe < 30:

        stock_data.append({
            "symbol": symbol,
            "market_cap": market_cap,
            "pe": pe
        })

# Rank by Market Cap
stock_data.sort(
    key=lambda x: x["market_cap"],
    reverse=True
)

portfolio_size = 3

top_stocks = stock_data[:portfolio_size]

print("\nSelected Portfolio\n")

for stock in top_stocks:
    print(stock)