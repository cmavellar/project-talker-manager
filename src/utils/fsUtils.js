const fs = require('fs').promises;
const path = require('path');

async function readTalkerData() {
    try {
        const data = await
         fs.readFile(path.resolve('src/talker.json'));
         const talkers = JSON.parse(data);
         return talkers;
    } catch (error) {
        console.error(`Erro na leitura do arquivo: ${error}`);
        return [];
}
}

async function writeNewTalkerData(newTalker) {
    try {
        const oldData = await readTalkerData();
        const newTalkerWithId = { id: oldData.length + 1, ...newTalker };
        const allData = JSON.stringify([...oldData, newTalkerWithId]);
        await fs.writeFile(path.resolve('src/talker.json'), allData);
        return newTalkerWithId;
    } catch (error) {
        console.error(`Erro na escrita do arquivo: ${error}`);
    }
}

async function editTalkerData(id, editedTalkerData) {
    try {
        const oldData = await readTalkerData();
        const editedTalker = { id, ...editedTalkerData };
        const editTalkers = oldData.reduce((
        talkersList, currentTalker,
) => {
            if (currentTalker.id === editedTalker.id) return [...talkersList, editedTalker];
        return [...talkersList, currentTalker];
        }, []);

    const editData = JSON.stringify(editTalkers);
    await fs.writeFile(path.resolve('src/talker.json'), editData);
        return editedTalker;
        } catch (error) {
        console.error(`Erro na escrita do arquivo: ${error}`);
}
}

async function deleteTalkerId(id) {
    try {
        const oldData = await readTalkerData();
        const editedData = oldData.filter((currentTalker) => currentTalker.id !== id);

        const deleteData = JSON.stringify(editedData);
        await fs.writeFile(path.resolve('src/talker.json'), deleteData);
        console.log(`Deletou o talker com o id ${id}`);
    } catch (error) {
        console.error(`Erro na escrita do arquivo: ${error}`);
}
}

module.exports = {
    readTalkerData,
    writeNewTalkerData,
    editTalkerData,
    deleteTalkerId,
};