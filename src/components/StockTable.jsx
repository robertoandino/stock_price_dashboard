import React, { useState, useEffect } from 'react';
import { fetchStock } from '../utils/fetchStockData';

const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];

export default function StockTable() {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const results = await Promise.all(
                    symbols.map(async (symbol) => {
                        const data = await fetchStock(symbol);

                        if(!data) {
                            throw new Error(`Failed to fetch data for ${symbol}`);
                        }
                        return data;
                    })
                );
                setStocks(results);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchStockData();
    }, []);

    if (loading) return <p className="text-white animate-pulse">Loading stock data...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 text-white shadow-md rounded-lg">
                <thead>
                    <tr>
                        <th className="p-3 text-left">Symbol</th>
                        <th className="p-3 text-left">Price</th>
                        <th className="p-3 text-left">Change (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock, i) => (
                        <tr key={i} className="border-t border-gray-700">
                            <td className="p-3">{stock["01. symbol"] || "N/A"}</td>
                            <td className="p-3">
                                ${Number(stock["05. price"] || 0).toFixed(2)}
                            </td>
                            <td className={`p-3 ${
                                (stock["10. change percent"] || "").startsWith('-'
                                    ? 'text-red-500' 
                                    : 'text-green-500'
                                ) 
                            }`}>
                                {stock["10. change percent"] || "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}