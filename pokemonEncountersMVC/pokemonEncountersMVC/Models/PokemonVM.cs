using System;
using System.Data.Entity;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace pokemonEncountersMVC.Models
{
    public class PokemonNameVM
    {
        public string Name { get; set; }
        public ObjectId _id { get; set; }
    }

    public class PokemonParams
    {
        public string Type { get; set; }
        public string Time { get; set; }
    }
    public class PokemonVM
    {
        public ObjectId _id { get; set; }
        public string Name { get; set; }
        public int Number {get; set;}
        public string PrimaryType { get; set; }
        public string SecondaryType { get; set; }

        public List<PokemonVM> getLstPokemon()
        {
            List<PokemonVM> lstOfPokemon = new List<PokemonVM>();
            lstOfPokemon = mongoConnect().Find(x => x._id != null).ToList<PokemonVM>();  //lstOfPokemon = mongoConnect().Find(x => x.PrimaryType == "Fire").ToList<PokemonVM>();
            return lstOfPokemon;
        }

        public List<string> getLstPokemonName()
        {
      
            List<string> pokemonNames = new List<string>();
            pokemonNames = (from n in mongoConnect().AsQueryable()
                            where n.PrimaryType == "Dragon"
                            select n.Name).ToList();
     
            return pokemonNames;
        }

        //public List<PokemonVM> getEncounterPokemon(PokemonParams parameters)
        //{
        //    List<PokemonVM> lstOfPokemon = new List<PokemonVM>();
        //    lstOfPokemon = mongoConnect().Find(x => x.PrimaryType == parameters.Biome).ToList<PokemonVM>();
        //    return lstOfPokemon;
        //}

        public List<PokemonVM> getEncounterPokemon(PokemonParams parameters)
        {
            List<PokemonVM> lstOfPokemon = new List<PokemonVM>();
            lstOfPokemon = parameters.Type != null ? mongoConnect().Find(x => x.PrimaryType == parameters.Type || x.SecondaryType == parameters.Type).ToList<PokemonVM>() : mongoConnect().Find(x => x._id != null).ToList<PokemonVM>();
            return lstOfPokemon;
        }

        //Mongo connect
        private IMongoCollection<PokemonVM> mongoConnect()
        {
            var client = new MongoClient();
            var database = client.GetDatabase("local");
            return database.GetCollection<PokemonVM>("pokemon");
             
        }
    }

    
}
