const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

export async function fetchStock(symbol = 'AAPL') {
    try{
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if(!data || !data['Global Quote']) {
            throw new Error('Invalid API respinse format');
        }

        return data['Global Quote'];
    } catch (error) {
        console.error(`Error fetching ${symbol}:`, error);
        throw error;
    }
}