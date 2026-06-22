import { useState } from "react";

function App() {
  const [capital, setCapital] = useState(500000);
  const [portfolioSize, setPortfolioSize] = useState(5);
  const [maxPe, setMaxPe] = useState(25);
  const [minMarketCap, setMinMarketCap] = useState(500000000000);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runBacktest = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/backtest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            capital: Number(capital),
            portfolio_size: Number(portfolioSize),
            max_pe: Number(maxPe),
            min_market_cap: Number(minMarketCap),
          }),
        }
      );

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f9fc",
        padding: "40px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "700",
          color: "#1f2937",
          marginBottom: "10px",
        }}
      >
        Qode Backtesting Dashboard
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#6b7280",
          marginBottom: "35px",
        }}
      >
        Analyze and backtest stock portfolios using custom filters
      </p>

      <div
        style={{
          maxWidth: "850px",
          margin: "auto",
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            color: "#111827",
          }}
        >
          Portfolio Settings
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Capital
            </label>

            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Portfolio Size
            </label>

            <input
              type="number"
              value={portfolioSize}
              onChange={(e) => setPortfolioSize(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Maximum PE
            </label>

            <input
              type="number"
              value={maxPe}
              onChange={(e) => setMaxPe(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Minimum Market Cap
            </label>

            <input
              type="number"
              value={minMarketCap}
              onChange={(e) => setMinMarketCap(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        <button
          onClick={runBacktest}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "14px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#00B386",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            opacity: loading ? 0.7 : 1,
            cursor: "pointer",
          }}
        >
          {loading ? "Analyzing Stocks..." : "Run Backtest"}
        </button>
      </div>

      <div
        style={{
          maxWidth: "850px",
          margin: "30px auto",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h4 style={{ color: "#6b7280" }}>Return %</h4>
          <h2 style={{ color: "#00B386" }}>
            {result ? result.return_percent + "%" : "--"}
          </h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h4 style={{ color: "#6b7280" }}>CAGR</h4>
          <h2 style={{ color: "#00B386" }}>
            {result ? result.cagr + "%" : "--"}
          </h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h4 style={{ color: "#6b7280" }}>Max Drawdown</h4>
          <h2 style={{ color: "#ef4444" }}>
            {result ? result.max_drawdown + "%" : "--"}
          </h2>
        </div>

        <div
  style={{
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  }}
>
  <h4 style={{ color: "#6b7280" }}>
    Portfolio Value
  </h4>

  <h2 style={{ color: "#111827" }}>
    {result
  ? "₹" + Number(result.final_value).toLocaleString("en-IN")
  : "--"}
  </h2>
</div>

<div
  style={{
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  }}
>
  <h4 style={{ color: "#6b7280" }}>
    Stocks Selected
  </h4>

  <h2 style={{ color: "#111827" }}>
    {result ? result.portfolio_size : "--"}
  </h2>
</div>
      </div>

    {result &&(  <div
  style={{
    maxWidth: "850px",
    margin: "auto",
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  }}
>
  <h3
    style={{
      textAlign: "center",
      marginBottom: "20px",
    }}
  >
    Selected Stocks
  </h3>

  <ul
    style={{
      listStyle: "none",
      padding: 0,
      margin: 0,
      textAlign: "center",
    }}
  >
    {result?.selected_stocks?.map((stock, index) => (
      <li
        key={index}
        style={{
          padding: "8px",
          fontSize: "18px",
          fontWeight: "500",
        }}
      >
        {stock}
      </li>
    ))}
  </ul>
</div>)}
    </div>
  );
}

export default App;