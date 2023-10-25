import express from "express";
import { Telegraf } from 'telegraf';
import cors from "cors";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(cors({ origin: "*" }))
app.use(express.json());

app.post('/enviar-mensagem', (req, res) => {
  const mensagem = req.body.mensagem;

  const token = process.env.TOKEN;
  const chatId = process.env.CHAT_ID;

  try{
    const bot = new Telegraf(token)
    bot.telegram.sendMessage(chatId, mensagem)
    res.status(200).json({message: "mensagem enviada"})
  } catch(error){
    res.status(500).json({ error: 'Erro ao enviar a mensagem' });
  }

  
});

app.listen(port, () => {
  console.log(`Servidor Express em execução na porta ${port}`);
});
