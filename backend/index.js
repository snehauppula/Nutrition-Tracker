const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const nutrientSchema = new mongoose.Schema({
  product: String,
  calories: Number,
  protein: Number,
  fat: Number,
  carbs: Number,
  date: { type: Date, default: Date.now },
});
const Nutrient = mongoose.model("Nutrient", nutrientSchema);

app.post("/api/nutrients", async (req, res) => {
  const { product } = req.body;

  try {
    const chatSession = model.startChat({ generationConfig });
    const prompt = `Provide the nutritional information (calories, protein, fat, carbs) for ${product} per 100g in a concise format.`;
    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();

    const nutrients = parseNutrients(responseText);

    const nutrientData = new Nutrient({
      product,
      ...nutrients,
    });
    await nutrientData.save();

    res.json(nutrientData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch nutrients" });
  }
});

function parseNutrients(text) {
  const lines = text.split("\n");
  const nutrients = {};
  lines.forEach((line) => {
    if (line.includes("Calories")) nutrients.calories = Number(line.match(/\d+/)[0]);
    if (line.includes("Protein")) nutrients.protein = Number(line.match(/\d+/)[0]);
    if (line.includes("Fat")) nutrients.fat = Number(line.match(/\d+/)[0]);
    if (line.includes("Carbs") || line.includes("Carbohydrates")) nutrients.carbs = Number(line.match(/\d+/)[0]);
  });
  return nutrients;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
