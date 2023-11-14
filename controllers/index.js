import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { loadData, storeData } from '../helpers/databaseHelper.js';
import { fibonacci, isPrime } from '../helpers/mathHelper.js';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemon = async (req, res) => {
    try {
      const response = await axios.get(baseUrl);
      const { data } = response;
      res.status(200).json({data, status: 'Success'});
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const getDetailPokemon = async (req, res) => {
  try{
    const { name } = req.params;
    const formattedName = name.replace(/\s/g, '').toLowerCase();

    const response = await axios.get(`${baseUrl}/${formattedName}`);
    const { data } = response;
    
    res.status(200).json({data, status: 'Success'});
  }catch(error){
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}


export const catchPokemon = async (req, res) => {
  try{
    const { name } = req.params
    const formattedName = name.replace(/\s/g, '').toLowerCase();
    // console.log(name)
    const response = await axios.get(`${baseUrl}/${name}`);
    // console.log(response)
    const random = Math.random() >= 0.5;
    // console.log(random)
    if(random){
      const data = {
        id: uuidv4(),
        name,
      }

      // Load data sebelumnya dari berkas db.json
      const currentData = loadData();

      // Cek apakah nama Pokemon sudah ada dalam data sebelumnya
      const isPokemonExists = currentData.some((pokemon) =>{
        const existingNameParts = pokemon.name.split('-');

        return existingNameParts[0] === formattedName;
      });

      // pokemon.name === name
      

      if (isPokemonExists) {
        res.status(400).json({ message: 'Pokemonnya udah kamu tangkap' });
        return;
      }

      // Tambahkan Pokemon yang baru ditangkap ke dalam data
      currentData.push(data);

      // Simpan data yang telah diperbarui ke dalam berkas db.json
      storeData(currentData);

      res.status(200).json({ data, message: 'Pokemon berhasil ketangkep' });
    }else{
      res.status(400).json({ message: 'Oops, Pokemon KABUR' });
      return;
    }
    
  }catch(error){
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getMyPokemon = async (req, res) => {
  try{
    const data = loadData()

    if (data.length === 0) {
      // Handle jika data kosong
      return res.status(404).json({ message: 'Data is empty' });
    }

    res.status(200).json({data, status: 'Success'});
  }catch(error){
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}


export const releaseMyPokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const currentData = loadData();

    // Cari Pokemon dengan id yang sesuai untuk dilepaskan
    const releasedPokemonIndex = currentData.findIndex((pokemon) => pokemon.id === id);

    if (releasedPokemonIndex === -1) {
      res.status(404).json({ message: 'Pokemon emang ngak ada' })
      return;
    }
    
    //math floor untuk membulatkan nilai sekaligus mendapatkan data dari 0 - 999
    const randomResult = Math.floor(Math.random() * 1000); 

    // Memeriksa apakah angka tersebut adalah bilangan prima
    if (!isPrime(randomResult)) {
      res.status(400).json({ message: 'Release gagal, coba lagi' })
      return;
    }
    console.log(randomResult);

    // Hapus Pokemon dari data
    currentData.splice(releasedPokemonIndex, 1);

    // Simpan data yang telah diperbarui ke dalam berkas db.json
    storeData(currentData);

    return res.status(200).json({ message: "Pokemon released successfully.", currentData });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const renamePokemon = async (req, res) => {
  try{
    const { id } = req.params
    const data = loadData()
    const pokemon = data.find((item) => item.id === id)

    if (!pokemon) {
      // Handle jika Pokemon dengan ID yang diberikan tidak ditemukan
      res.status(404).json({ message: 'Pokemon emang ngak ada' })
      return;
    }

    const name = pokemon.name.split('-');
    // console.log(name)


    // Menghitung jumlah penggantian nama (renameCount) dari data Pokemon,
    const renameCount = pokemon.renameCount || 0;
    console.log(renameCount)
    // return;

    //cek apakah name[1] ada atau ngak, jika tidak ada maka kasih nilai default 0
    const newName = `${name[0]}-${name[1] ? fibonacci(renameCount) : 0}`;
    

    // Memperbarui data Pokemon dengan nama yang baru, sekaligus atribut rename
    pokemon.name = newName;
    pokemon.renameCount = renameCount + 1;

    storeData(data)

    return res.status(200).json({ newName, message: 'Nama Pokemon berhasil diubah' });
  }catch(error){
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
