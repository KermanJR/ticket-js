import express from "express";
import fetch from "node-fetch";
import cors from "cors"; // ✅ importação do CORS

const app = express();

// ✅ habilita o CORS apenas para sua extensão
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
      "Authorization": "Bearer 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",
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
