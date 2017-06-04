using System;
using System.Data.Entity;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

public enum PokemonTypes
{
    Fire,
    Ice,
    Bug,
    Fighting,
    Ground,
    Flying,
    Ghost,
    Fairy,
    Rock,
    Grass,
    Normal,
    Dark,
    Water,
    Dragon,
    Poison ,
    Psychic,
    Electric,
    Steel,
    None,
}

namespace pokemonEncountersMVC.Models
{
    public class PokemonNameVM
    {
        public string Name { get; set; }
        public ObjectId _id { get; set; }
    }

    public class PokemonParams
    {
        public int NumberEncounters{ get; set; }
        public bool ExtinctAllowed { get; set; }
        public bool MegaAllowed { get; set; }
        public bool AlolanAllowed { get; set; }
        public bool LegendaryAllowed { get; set; }
        public bool MythicalAllowed { get; set; }
        public bool ShinyAllowed { get; set; }
        public int ShinyRate { get; set; }
        public int Temperature { get; set; }
        public int Hazard { get; set; }
        public int Altitude { get; set; }
        public int Hallow { get; set; }
        public int Lush { get; set; }
        public int Bright { get; set; }
        public int Water { get; set; }
        public int Remote { get; set; }
        public int Toxicity { get; set; }
        public int Unique { get; set; }
        public int Electromagnetism { get; set; }
        public int Metallic { get; set; }

        public string Type { get; set; }
    }

    public class PokemonEncounterTypes
    {
        public string Type { get; set; }
        public int Rate { get; set; }
    }

    public class PokemonVM
    {
        public ObjectId _id { get; set; }
        public string Name { get; set; }
        public int Number {get; set;}
        public string PrimaryType { get; set; }
        public string SecondaryType { get; set; }
        public string PseudoType { get; set; }
        public int Rarity { get; set; }
        public bool Extinct { get; set; }
        public bool Legendary { get; set; }
        public bool Mythical { get; set; }
        public bool HasMega { get; set; }
        public string Megas { get; set; }
        public bool AlolaForm { get; set; }

        private List<PokemonEncounterTypes> addToLstOfEncounterTypes(List<PokemonEncounterTypes> lstOfTypes, int parameterValue, string type1, string type2)
        {
            if (parameterValue > 0)
            {
                lstOfTypes.Add(new PokemonEncounterTypes { Type = type1, Rate = Math.Abs(parameterValue) });
            }
            else if (parameterValue < 0)
            {
                lstOfTypes.Add(new PokemonEncounterTypes { Type = type2, Rate = Math.Abs(parameterValue) });
            }
            return lstOfTypes;
        }

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
            
            List<PokemonVM> lstOfPossiblePokemon = new List<PokemonVM>();
            List<PokemonVM> lstOfPokemon = new List<PokemonVM>();
            List<PokemonEncounterTypes> lstOfEncounterTypes = new List<PokemonEncounterTypes>();

            //create list of all encounterable types to search through
            if (parameters.Temperature != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Temperature, PokemonTypes.Fire.ToString(), PokemonTypes.Ice.ToString());  
            }
            if (parameters.Hazard != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Hazard, PokemonTypes.Fighting.ToString(), PokemonTypes.Bug.ToString());
            }
            if (parameters.Altitude != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Altitude, PokemonTypes.Flying.ToString(), PokemonTypes.Ground.ToString());
            }
            if (parameters.Hallow != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Hallow, PokemonTypes.Fairy.ToString(), PokemonTypes.Ghost.ToString());
            }
            if (parameters.Lush != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Lush, PokemonTypes.Grass.ToString(), PokemonTypes.Rock.ToString());
            }
            if (parameters.Bright != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Bright, PokemonTypes.Normal.ToString(), PokemonTypes.Dark.ToString());
            }

            if (parameters.Water != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Water, PokemonTypes.Water.ToString(),PokemonTypes.None.ToString());
            }
            if (parameters.Remote != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Remote, PokemonTypes.Dragon.ToString(), PokemonTypes.None.ToString());
            }
            if (parameters.Toxicity != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Toxicity, PokemonTypes.Poison.ToString(), PokemonTypes.None.ToString());
            }
            if (parameters.Unique != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Unique, PokemonTypes.Psychic.ToString(), PokemonTypes.None.ToString());
            }
            if (parameters.Electromagnetism != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Electromagnetism, PokemonTypes.Electric.ToString(), PokemonTypes.None.ToString());
            }
            if (parameters.Metallic != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Metallic, PokemonTypes.Steel.ToString(), PokemonTypes.None.ToString());
            }
              
            
            //if (parameters.Temperature > 0 && parameters.Temperature != 0) 
            //{
            //    lstOfEncounterTypes.Add(new PokemonEncounterTypes { Type = PokemonTypes.Fire.ToString(), Rate = Math.Abs(parameters.Temperature) });
            //}else if(parameters.Temperature < 0)
            //{
            //    lstOfEncounterTypes.Add(new PokemonEncounterTypes { Type = PokemonTypes.Ice.ToString(), Rate = Math.Abs(parameters.Temperature) });
            //}

            //build the typesList
            List<string> typesList = new List<string>();
            foreach(PokemonEncounterTypes encounterableType in lstOfEncounterTypes)
            {
                for(int i=0; i<encounterableType.Rate;i++)
                {
                    typesList.Add(encounterableType.Type);
                }
            }

            //constructor for random
            Random rnd = new Random();

            //query
            for (int i = lstOfPokemon.Count(); i < parameters.NumberEncounters; i++)
            {
                //Random value generator for picking type to query
                string typePicked = typesList[rnd.Next(0,typesList.Count())];
                int maxRarity = rnd.Next(1, 100);
                double primaryTypeRarity = ((45.0/49.0)*maxRarity) + (445.0/49.0);
                double secondaryTypeRarity = ((95.0/99.0)*maxRarity) + (400.0/99.0);
                lstOfPossiblePokemon = parameters.NumberEncounters != 0 ? mongoConnect().Find(x => (x.PrimaryType == typePicked && x.Rarity <= primaryTypeRarity)||(x.SecondaryType == typePicked && x.Rarity <= secondaryTypeRarity)).ToList<PokemonVM>() : mongoConnect().Find(x => x._id != null).ToList<PokemonVM>();
                //lstOfPossiblePokemon = parameters.NumberEncounters != 0 ? mongoConnect().Find(x => (x.PrimaryType == typePicked && x.Rarity <= primaryTypeRarity) || (x.SecondaryType == typePicked && x.Rarity <= secondaryTypeRarity)).ToList<PokemonVM>() : mongoConnect().Find(x => x._id != null).ToList<PokemonVM>();
                if (lstOfPossiblePokemon.Count > 0)
                {
                    int pokemonPicker = rnd.Next(0, lstOfPossiblePokemon.Count());
                    lstOfPokemon.Add(lstOfPossiblePokemon[pokemonPicker]);
                }               
            }
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
