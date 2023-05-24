const axios = require('axios');
const { Type } = require('../db.js');

let getApiTypes = ()=>{
  return axios
    .get("https://pokeapi.co/api/v2/type")
    .then(({data})=> data.results);
}

module.exports = {
  getTypes: async (req,res)=>{
    let allTypes = await Type.findAll();
    try {
      if(!allTypes.length){
        let apiTypes = await getApiTypes()
        apiTypes = apiTypes.map(t => {
            return{
              name:t.name
            }
          })
        allTypes = await Type.bulkCreate(apiTypes)
        return res.status(200).json(allTypes)
      }
      return res.status(200).json(allTypes)
    } catch (error) {
      return res.status(400).json({message:error.message})
    }
  }
}