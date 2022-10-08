const express = require('express');
const bodyParser = require('body-parser');
const { readTalkerData, writeNewTalkerData,
 editTalkerData, deleteTalkerId } = require('./utils/fsUtils');
const { randomToken } = require('./utils/token');
const { validateEmailAndPassword,
      validateToken,
      validateName,
      validateAge,
      validateFieldTalk,
      validateWatchedAt,
      validateRate } = require('./middlewares/validations');

const app = express();
app.use(bodyParser.json());

app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (req, res) => {
  const talkers = await readTalkerData(); 
  return res.status(200).json(talkers);
  });

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query; 
  const talkers = await readTalkerData();

  if (!q) {
    return res.status(200).json(talkers);
  }
  const talkersData = talkers.filter((talker) => talker.name.includes(q));
    return res.status(200).json(talkersData);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await readTalkerData();
  const talkerId = await talkers.find(({ id }) => id === Number(req.params.id));
  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerId);
}); 

app.post('/login', validateEmailAndPassword, async (req, res) => {
  const newToken = randomToken();
  return res.status(200).json({ token: newToken });
});

app.post('/talker',
validateToken,
validateName,
validateAge,
validateFieldTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  const newElement = await writeNewTalkerData(req.body);
  return res.status(201).json(newElement);
});

app.put('/talker/:id',
validateToken,
validateName,
validateAge,
validateFieldTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  const { id } = req.params;
  const editTalker = req.body;
  const editData = await editTalkerData(Number(id), editTalker);

  return res.status(200).json(editData);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await deleteTalkerId(Number(id));

  return res.status(204).end();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});