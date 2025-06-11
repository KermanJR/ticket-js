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
