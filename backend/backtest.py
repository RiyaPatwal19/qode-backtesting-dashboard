import yfinance as yf

stocks = [
    "RELIANCE.NS",
    "TCS.NS",
    "INFY.NS",
    "HDFCBANK.NS",
    "ICICIBANK.NS"
]

capital = 100000

equal_weight = capital / len(stocks)

portfolio_value = 0

for symbol in stocks:

    data = yf.download(
        symbol,
        start="2024-01-01",
        end="2025-01-01",
        auto_adjust=True
    )

    if data.empty:
        continue

    close_prices = data[("Close", symbol)]

    start_price = close_prices.iloc[0]
    end_price = close_prices.iloc[-1]

    shares = equal_weight / start_price

    final_value = shares * end_price

    portfolio_value += final_value

print("Initial Capital:", capital)
print("Final Portfolio Value:", round(portfolio_value, 2))
print("Return %:", round(((portfolio_value - capital) / capital) * 100, 2))