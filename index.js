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
