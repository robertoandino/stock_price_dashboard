const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

//Delay between API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchStock(symbol = 'AAPL') {
    try{
        await delay(12000);

        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log('Response:', data);

        //API calls daily limit message
        if(data.Information && data.Information.includes('API rate limit')) {
            throw new Error('Daily API limit reached. Please try again tomorrow or upgrade to premium.');
        }

        //API calls per-minute rate limit
        if(data.Note && data.Note.includes('API call frequency')) {
            console.warn('Rate limit reached, waiting before retry...');
            await delay(60000);
            return fetchStock(symbol);
        }

        if(!data || !data['Global Quote']) {
            throw new Error('Invalid API response format');
        }

        return data['Global Quote'];
    } catch (error) {
        console.error(`Error fetching ${symbol}:`, error.message);
        throw error;
    }
}