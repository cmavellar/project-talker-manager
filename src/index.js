const express = require('express');
const bodyParser = require('body-parser');
const { readTalkerData } = require('./utils/fsUtils');
const { randomToken } = require('./utils/token');

const app = express();
app.use(bodyParser.json());

app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (req, res) => {
  const talkers = await readTalkerData(); 
  return res.status(200).json(talkers); 
  });

app.get('/talker/:id', async (req, res) => {
  const talkers = await readTalkerData();
  const talkerId = await talkers.find(({ id }) => id === Number(req.params.id));
  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerId);
}); 

app.post('/login', async (req, res) => {
  const newToken = randomToken();
  return res.status(200).json({ token: newToken });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});