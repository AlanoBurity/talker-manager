const express = require('express');
const bodyParser = require('body-parser');
const { readTalkers } = require('./utils/readAndWriteFiles');
const crypto = require('crypto');



const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';




// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
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


app.post('/login', async (request, response) => {
  const token = crypto.randomBytes(8).toString('hex');

    return response.status(200).send({ token: token})
});  