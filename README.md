# Qode Backtesting Dashboard

## Overview

Qode Backtesting Dashboard is a full-stack application that allows users to configure and run equity portfolio backtests using custom investment parameters. The application consists of a FastAPI backend and a React frontend.

## Features

* Configure portfolio capital
* Select portfolio size
* Apply PE ratio filters
* Apply minimum market capitalization filters
* Run portfolio backtests
* View performance metrics

  * Return %
  * CAGR
  * Maximum Drawdown
  * Portfolio Value
* View selected stocks
* REST API using FastAPI
* Interactive React dashboard

## Tech Stack

### Backend

* Python
* FastAPI
* Pandas
* NumPy
* Uvicorn

### Frontend

* React
* Vite
* JavaScript

### Version Control

* Git
* GitHub

## Project Structure

QodeAssignment/

├── backend/

│ ├── main.py

│ ├── final_backtest.py

│ ├── strategy.py

│ ├── fetch_data.py

│ └── test.py

├── frontend/

│ ├── src/

│ │ ├── App.jsx

│ │ └── main.jsx

│ └── package.json

├── data/

│ └── stocks.csv

└── README.md

## Installation

### Clone Repository

git clone <repository-url>

cd QodeAssignment

### Backend Setup

cd backend

pip install -r requirements.txt

Run Backend:

python -m uvicorn main:app --reload

Backend runs on:

http://127.0.0.1:8000

### Frontend Setup

cd frontend

npm install

Run Frontend:

npm run dev

Frontend runs on:

http://localhost:5173

## API Endpoint

### Run Backtest

POST /backtest

Request Body:

{
"capital": 500000,
"portfolio_size": 5,
"max_pe": 25,
"min_market_cap": 500000000000
}

## Assumptions

* Historical stock data is available and properly formatted.
* Users provide valid numeric inputs.
* Backtest results are generated based on available dataset and strategy logic.

## Future Improvements

* Equity curve visualization
* Drawdown chart
* Portfolio history tracking
* CSV/Excel export
* Benchmark comparison
* Strategy comparison module

## Author

Riya Rajendra Singh Patwal
