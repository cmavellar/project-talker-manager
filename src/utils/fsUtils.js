const fs = require('fs').promises;
const path = require('path');

async function readTalkerData() {
    try {
        const data = await
         fs.readFile(path.resolve('src/talker.json'));
         const talkers = JSON.parse(data);
         // console.log(talkers);
        return talkers;
    } catch (error) {
        console.error(`Erro na leitura do arquivo: ${error}`);
        return [];
} 
}

readTalkerData();

module.exports = {
    readTalkerData,
};