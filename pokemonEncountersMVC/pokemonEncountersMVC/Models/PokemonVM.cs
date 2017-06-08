using System;
using System.Data.Entity;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

public static class PokemonTypes
{
    public const string FIRE = "Fire";
    public const string ICE = "Ice";
    public const string BUG = "Bug";
    public const string FIGHTING = "Fighting";
    public const string GROUND = "Ground";
    public const string FLYING = "Flying";
    public const string GHOST = "Ghost";
    public const string FAIRY = "Fairy";
    public const string ROCK = "Rock";
    public const string GRASS = "Grass";
    public const string NORMAL = "Normal";
    public const string DARK = "Dark";
    public const string WATER = "Water";
    public const string DRAGON = "Dragon";
    public const string POISON = "Poison";
    public const string PSYCHIC = "Psychic";
    public const string ELECTRIC = "Electric";
    public const string STEEL = "Steel";
    public const string NONE = "None";

}

public static class Regions
{
    public const string ALOLA = "Alola";
}

public static class DBCollections
{
    public const string POKEMON = "pokemon";
    public const string ALOLAN = "alolan";
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
        public string ExcludeType { get; set; }
        public int Rarity { get; set; }
        public bool Extinct { get; set; }
        public bool Legendary { get; set; }
        public bool Mythical { get; set; }
        public bool HasMega { get; set; }
        public string Megas { get; set; }
        public bool AlolaForm { get; set; }
        public string Region { get; set; }

        private List<PokemonEncounterTypes> addToLstOfEncounterTypes(List<PokemonEncounterTypes> lstOfTypes, int parameterValue, string type1, string type2 = PokemonTypes.NONE)
        {
            if (parameterValue > 0)
            {
                lstOfTypes.Add(new PokemonEncounterTypes { Type = type1, Rate = parameterValue });
            }
            else if (parameterValue < 0)
            {
                lstOfTypes.Add(new PokemonEncounterTypes { Type = type2, Rate = Math.Abs(parameterValue) });
            }
            return lstOfTypes;
        }

        private float getPrimaryTypeRarity(int rarity)
        {
            float calculatedRarity = ((45/49f)*rarity) + (445/49f);
            return calculatedRarity;
        }

        private float getSecondaryTypeRarity(int rarity)
        {
            float calculatedRarity = ((95 / 99f) * rarity) + (400 / 99f);
            return calculatedRarity;
        }

        public List<PokemonVM> getLstPokemon()
        {
            List<PokemonVM> lstOfPokemon = new List<PokemonVM>();
            lstOfPokemon = mongoConnect(DBCollections.POKEMON).Find(x => x._id != null).ToList<PokemonVM>();  //lstOfPokemon = mongoConnect().Find(x => x.PrimaryType == "Fire").ToList<PokemonVM>();
            return lstOfPokemon;
        }

        public List<string> getLstPokemonName()
        {
      
            List<string> pokemonNames = new List<string>();
            pokemonNames = (from n in mongoConnect(DBCollections.POKEMON).AsQueryable()
                            where n.PrimaryType == PokemonTypes.DRAGON
                            select n.Name).ToList();
     
            return pokemonNames;
        }

        public List<PokemonVM> getEncounterPokemon(PokemonParams parameters)
        {
            
            //list constructors
            List<PokemonVM> lstOfPossiblePokemon = new List<PokemonVM>();
            List<PokemonVM> lstOfPokemon = new List<PokemonVM>();
            List<PokemonEncounterTypes> lstOfEncounterTypes = new List<PokemonEncounterTypes>();

            //create list of all encounterable types to search through
            if (parameters.Temperature != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Temperature, PokemonTypes.FIRE, PokemonTypes.ICE);  
            }
            if (parameters.Hazard != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Hazard, PokemonTypes.FIGHTING, PokemonTypes.BUG);
            }
            if (parameters.Altitude != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Altitude, PokemonTypes.FLYING, PokemonTypes.GROUND);
            }
            if (parameters.Hallow != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Hallow, PokemonTypes.FAIRY, PokemonTypes.GHOST);
            }
            if (parameters.Lush != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Lush, PokemonTypes.GRASS, PokemonTypes.ROCK);
            }
            if (parameters.Bright != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Bright, PokemonTypes.NORMAL, PokemonTypes.DARK);
            }

            if (parameters.Water != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Water, PokemonTypes.WATER);
            }
            if (parameters.Remote != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Remote, PokemonTypes.DRAGON);
            }
            if (parameters.Toxicity != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Toxicity, PokemonTypes.POISON);
            }
            if (parameters.Unique != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Unique, PokemonTypes.PSYCHIC);
            }
            if (parameters.Electromagnetism != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Electromagnetism, PokemonTypes.ELECTRIC);
            }
            if (parameters.Metallic != 0)
            {
                addToLstOfEncounterTypes(lstOfEncounterTypes, parameters.Metallic, PokemonTypes.STEEL);
            }
            
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
            for (int i = 0; i < parameters.NumberEncounters; i++)
            {
                //Random value generator for picking type to query
                string typePicked = typesList[rnd.Next(0,typesList.Count())];
                int defaultRarity = rnd.Next(1, 100);
                double primaryTypeRarity = getPrimaryTypeRarity(defaultRarity);
                double secondaryTypeRarity = getSecondaryTypeRarity(defaultRarity);
                double pseudoTypeRarity = defaultRarity;
                lstOfPossiblePokemon = parameters.NumberEncounters != 0 ? mongoConnect(DBCollections.POKEMON).Find(x => 
                        ((x.PrimaryType == typePicked && x.Rarity <= primaryTypeRarity && x.ExcludeType != typePicked)||
                        (x.SecondaryType == typePicked && x.Rarity <= secondaryTypeRarity && x.ExcludeType != typePicked)||
                        (x.PseudoType == typePicked && x.Rarity <= defaultRarity) && (x.Legendary == parameters.LegendaryAllowed && x.Mythical == parameters.MythicalAllowed && x.Extinct == false))
                    ).ToList<PokemonVM>() : mongoConnect(DBCollections.POKEMON).Find(x => x._id != null).ToList<PokemonVM>();
                if(parameters.AlolanAllowed)
                {
                    List<PokemonVM> lstOfPossibleAlolan = new List<PokemonVM>();
                    lstOfPossibleAlolan = mongoConnect(DBCollections.ALOLAN).Find(
                        x => (x.PrimaryType == typePicked && x.Rarity <= primaryTypeRarity) || (x.SecondaryType == typePicked && x.Rarity <= secondaryTypeRarity)
                    ).ToList<PokemonVM>();
                    foreach (var item in lstOfPossibleAlolan)
	                {
                        item.Region = Regions.ALOLA;
	                }
                    lstOfPossiblePokemon.AddRange(lstOfPossibleAlolan);
                }
                if (lstOfPossiblePokemon.Count > 0)
                {
                    int pokemonPicker = rnd.Next(0, lstOfPossiblePokemon.Count());
                    lstOfPokemon.Add(lstOfPossiblePokemon[pokemonPicker]);
                }
                else
                {
                    i--;
                }    
            }
            return lstOfPokemon;
        }

        //Mongo connect
        private IMongoCollection<PokemonVM> mongoConnect(string document)
        {
            var client = new MongoClient();
            var database = client.GetDatabase("local");
            return database.GetCollection<PokemonVM>(document); 
        }
    }    
}
