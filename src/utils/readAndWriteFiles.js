const fs = require('fs/promises');
const { join } = require('path');

const pathFile = '../talker.json';
const readTalkers = async () => {
    try {
        const content = await fs.readFile(join(__dirname, pathFile), 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.log('Erro ao ler o arquivo', error.message);
        return [];
    }
};

const writeTalkers = async (newTalkers) => {
 try {
    await fs.writeFile(join(__dirname, pathFile), JSON.stringify(newTalkers));
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
    readTalkers,
    writeTalkers,
};