using pokemonEncountersMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace pokemonEncountersMVC.Controllers
{
    public class PokemonController : ApiController
    {
        //GET api/values
        //public List<PokemonVM> get()
        //{
        //    PokemonVM pokemon = new PokemonVM();
        //    return pokemon.getLstPokemon();
        //}

        public List<string> get (bool NamesOnly)
        {
            PokemonVM pokemon = new PokemonVM();
            return pokemon.getLstPokemonName();
        }

        public List<PokemonVM> get([FromUri]PokemonParams parameters)
        {
            PokemonVM pokemon = new PokemonVM();
            return pokemon.getEncounterPokemon(parameters);
        }

        //public List<PokemonVM> get ([FromUri]PokemonParams parameters)
        //{
        //    PokemonVM pokemon = new PokemonVM();
        //    return pokemon.getEncounterPokemon(parameters);
        //}
    }
}
