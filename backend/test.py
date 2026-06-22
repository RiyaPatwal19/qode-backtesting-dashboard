import yfinance as yf

stock = yf.Ticker("RELIANCE.NS")

print("Company:", stock.info.get("longName"))
print("Market Cap:", stock.info.get("marketCap"))
print("PE Ratio:", stock.info.get("trailingPE"))

history = stock.history(period="1mo")

print(history.head())