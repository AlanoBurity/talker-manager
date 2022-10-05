const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const rescue = require('express-rescue');
const { readTalkers } = require('./utils/readAndWriteFiles');
const { writeTalkers } = require('./utils/readAndWriteFiles');

const {
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  validateToken,
} = require('./validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (request, response) => {
  const talker = await readTalkers();
  response.status(200).json(talker); 
});  

 app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talker = await readTalkers();
  const talkerId = talker.find((e) => e.id === Number(id));
  if (talkerId) return response.status(200).send(talkerId);
  return response.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validateEmail, validatePassword, (request, response) => {
  const token = crypto.randomBytes(8).toString('hex');
  return response.status(200).json({ token });
});  

app.post(('/talker'),
  validateToken,
  validateName, 
  validateAge, 
  validateTalk, 
  validateRate, 
  validateWatchedAt,
  rescue(async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talker = await readTalkers();
    const newTalker = {
      id: talker.length + 1,
      name,
      age,
      talk: {
        watchedAt,
        rate,
      },
    };
    const newTalkers = [...talker, newTalker];
  
    await writeTalkers(newTalkers);

    res.status(201).json(newTalker);
  }));

app.put(('/talker/:id'), 
 validateToken,
 validateName, 
 validateAge, 
 validateTalk, 
 validateRate, 
 validateWatchedAt, (request, response) => {
  response.status(201).json({ message: 'olá' });
});

app.listen(PORT, () => {
  console.log('Online');
});