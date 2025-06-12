import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
  origin: "chrome-extension://fajobbdikkbaemdkjpccjcediglhdmff"
}));

app.use(express.json());

app.post("/ia", async (req, res) => {
  const prompt = req.body.prompt;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o", // ou outro modelo suportado
      messages: [
        { role: "system", content: "Você é um assistente que gera tickets." },
        { role: "user", content: prompt }
      ],
    })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
