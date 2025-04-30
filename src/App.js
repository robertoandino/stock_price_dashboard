import StockTable from "./components/StockTable";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Stock Price Dashboard</h1>
      <StockTable />
    </div>
  );
}

export default App;
