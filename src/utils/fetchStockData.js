const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

export async function fetchStock(symbol = 'AAPL') {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}apikey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data['Global Quote'];
}