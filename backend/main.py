from fastapi import FastAPI
from pydantic import BaseModel
from backend.final_backtest import run_backtest
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BacktestRequest(BaseModel):
    capital: int
    portfolio_size: int
    max_pe: float
    min_market_cap: float


@app.get("/")
def home():
    return {
        "message": "Qode Backtesting API Running"
    }


@app.post("/backtest")
def backtest(request: BacktestRequest):

    result = run_backtest(
        capital=request.capital,
        portfolio_size=request.portfolio_size,
        max_pe=request.max_pe,
        min_market_cap=request.min_market_cap
    )

    return result