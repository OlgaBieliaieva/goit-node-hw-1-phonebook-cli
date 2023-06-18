const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const dataPath = path.join(__dirname, "data.json");

const getAll = async () => {
    const data = await fs.readFile(dataPath);
    return JSON.parse(data);
}

const getById = async (id) => {
    const phones = await getAll();
    const result = phones.find(item => item.id === id);
    return result || null;
}

const add = async(data) => {
    const phones = await getAll();
    const newItem = {
        id: nanoid(),
        ...data,
    }
    phones.push(newItem);
    await fs.writeFile(dataPath, JSON.stringify(phones, null, 2));
    return newItem;
}
const deleteById = async(id) => {
    const phones = await getAll();
    const index = phones.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    const [result] = phones.splice(index, 1);
    await fs.writeFile(dataPath, JSON.stringify(phones, null, 2));
    return result;
}

module.exports = {
    getAll,
    getById,
    add,   
    deleteById,
}