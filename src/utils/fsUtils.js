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

async function writeNewTalkerData(newTalker) {
    try {
        const oldData = await readTalkerData();
        // const newTalkerWithId = { id: oldData.length + 1, ...newTalker };
        // const allData = JSON.stringify([...oldData, newTalkerWithId,
                //     ]);
        const allData = JSON.stringify([...oldData, newTalker,
                     ]);
    await fs.writeFile(path.resolve('src/talker.json'), allData);
    return allData;
    // return newTalkerWithId;
    } catch (error) {
        console.error(`Erro na escrita do arquivo: ${error}`);
    }
}

writeNewTalkerData();

module.exports = {
    readTalkerData,
    writeNewTalkerData,
};
