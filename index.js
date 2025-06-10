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
  
  const response = await fetch("https://api.openai.com/v1/responses", {
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
