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
