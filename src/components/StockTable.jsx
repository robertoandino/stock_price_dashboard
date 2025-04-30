import React, { useState, useEffect } from 'react';
import { fetchStock } from '../utils/fetchStockData';

const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];

export default function StockTable() {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all(symbols.map(symbol => fetchStock(symbol)))
            .then(results => {
                setStocks(results);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-white animate-pulse">Loading stock data...</p>;

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
                            <td className="p-3">{stock["01. symbol"]}</td>
                            <td className="p-3">${Number(stock["05. price"]).toFixed(2)}</td>
                            <td className={`p-3 ${stock["10. change percent"].startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                                {stock["10. change percent"]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}