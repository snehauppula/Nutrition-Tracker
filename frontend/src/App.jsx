import { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [product, setProduct] = useState("");
  const [nutrients, setNutrients] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/nutrients", { product });
      setNutrients(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const chartData = nutrients
    ? {
        labels: ["Calories", "Protein", "Fat", "Carbs"],
        datasets: [
          {
            label: `${nutrients.product} Nutrients (per 100g)`,
            data: [nutrients.calories, nutrients.protein, nutrients.fat, nutrients.carbs],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      }
    : null;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Nutrition Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Enter product (e.g., chocolate, milk)"
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "10px" }}>
          Analyze
        </button>
      </form>

      {nutrients && (
        <div style={{ marginTop: "20px", maxWidth: "600px" }}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" }, title: { display: true, text: "Nutritional Breakdown" } },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;