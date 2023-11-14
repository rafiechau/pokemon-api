import fs from 'fs';

const dataPath = './database/db.json';
if (!fs.existsSync(dataPath)) {
  const initialData = {
    myPokemons: [],
  };
  fs.writeFileSync(dataPath, JSON.stringify(initialData), 'utf-8');
}

const myPokemon = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return data ? JSON.parse(data) : { myPokemons: [] };
  } catch (error) {
    return { myPokemons: [] };
  }
};

const writePokemon = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify({ myPokemons: data }, null, 2), 'utf-8');
  } catch (error) {
    return error;
  }
  return null;
};

export const getMyPokemons = () => {
  const data = myPokemon();
  return data.myPokemons;
};

export const addPokemon = (pokemon) => {
  const data = getMyPokemons();
  data.push(pokemon);
  writePokemon(data);
};

export const renamePokemon = (id, name, release) => {
  const data = getMyPokemons();
  const index = data.findIndex((pokemon) => pokemon.id === id);
  data[index].name = name;
  data[index].release = release;
  writePokemon(data);
};

export default { getMyPokemons, addPokemon, renamePokemon };
