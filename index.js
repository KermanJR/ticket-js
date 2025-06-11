import express from "express";
import fetch from "node-fetch";
import cors from "cors"; // ✅ importação do CORS

const app = express();

// ✅ habilita o CORS apenas para sua extensão
app.use(cors({
  origin: "chrome-extension://kcpcibkhonloiagbgkdgkjhjlbjgfedl"
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
