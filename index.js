import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // 🔑 Carrega as variáveis do .env

const app = express();

app.use(cors({
  origin: "chrome-extension://fajobbdikkbaemdkjpccjcediglhdmff"
}));

app.use(express.json());

app.post("/openai", async (req, res) => {
  const prompt = req.body.prompt;

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1",
      prompt: prompt,
      max_tokens: 10,
    }),
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
