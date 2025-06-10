import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/openai", async (req, res) => {
  const prompt = req.body.prompt;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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",
    },
    body: JSON.stringify({
      model: "gpt-4.1",
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
