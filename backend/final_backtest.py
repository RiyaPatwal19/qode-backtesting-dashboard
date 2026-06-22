import yfinance as yf

stocks = [
    "RELIANCE.NS",
    "TCS.NS",
    "INFY.NS",
    "HDFCBANK.NS",
    "ICICIBANK.NS"
]


def run_backtest(
    capital,
    portfolio_size,
    max_pe,
    min_market_cap
):

    filtered_stocks = []

    print("Fetching stock data...")

    # Fetch and filter stocks
    for symbol in stocks:

        info = yf.Ticker(symbol).info

        market_cap = info.get("marketCap", 0)
        pe = info.get("trailingPE", 999)

        if market_cap > min_market_cap and pe < max_pe:

            filtered_stocks.append({
                "symbol": symbol,
                "market_cap": market_cap,
                "pe": pe
            })

    # Rank by Market Cap
    filtered_stocks.sort(
        key=lambda x: x["market_cap"],
        reverse=True
    )

    # Select Top N Stocks
    selected_stocks = filtered_stocks[:portfolio_size]

    print("\nSelected Stocks:")

    for stock in selected_stocks:
        print(stock["symbol"])

    if len(selected_stocks) == 0:
        return {
            "error": "No stocks matched the filters"
        }

    equal_weight = capital / len(selected_stocks)

    portfolio_returns = []
    portfolio_value = 0

    # Backtest
    for stock in selected_stocks:

        symbol = stock["symbol"]

        data = yf.download(
            symbol,
            start="2024-01-01",
            end="2025-01-01",
            auto_adjust=True,
            progress=False
        )

        if data.empty:
            continue

        close_prices = data[("Close", symbol)]

        start_price = close_prices.iloc[0]
        end_price = close_prices.iloc[-1]

        shares = equal_weight / start_price

        final_value = shares * end_price

        portfolio_returns.append(final_value)

        portfolio_value += final_value

    # Metrics
    peak = max(portfolio_returns)
    trough = min(portfolio_returns)

    max_drawdown = ((peak - trough) / peak) * 100

    cagr = ((portfolio_value / capital) ** (1 / 1) - 1) * 100

    return {
        "capital": capital,
        "portfolio_size": portfolio_size,
        "selected_stocks": [
            stock["symbol"]
            for stock in selected_stocks
        ],
        "final_value": float(round(portfolio_value, 2)),
        "return_percent": float(round(
            ((portfolio_value - capital) / capital) * 100,
            2
        )),
        "cagr": float(round(cagr, 2)),
        "max_drawdown": float(round(max_drawdown, 2))
    }


# Testing
if __name__ == "__main__":

    result = run_backtest(
        capital=500000,
        portfolio_size=5,
        max_pe=25,
        min_market_cap=500000000000
    )

    print("\nResult:")
    print(result)