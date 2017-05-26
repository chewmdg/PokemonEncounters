import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

global.jQuery = require('jquery');

require('bootstrap');

class PokemonMain extends React.Component {
    constructor() {
        super();
        this.state = {
            encounterPressed: false,
            closePressed: false,
            shinyRate: 9,
            shinyAllowed: true,
        }
    }

    //componentDidMount ../../api/pokemon?NamesOnly=true
    componentDidMount() {
        $.getJSON('../../api/pokemon', (data) => {
            this.pokemon = data;
            console.log(this.pokemon);
        })
    }

    //functions onClicks
    onEncounterButtonClick() {
        this.setState({
            encounterPressed: true,
        })
    }
    onCloseButtonClick() {
        this.setState({
            encounterPressed: false,
        })
    }
    onAllowShinyClick() {
        if (shinyAllowed) {
            this.setState({
                shinyAllowed: false,
            })
        }
        console.log(this.shinyAllowed)
    }


    //handlers
    handleEncounterButtonClick() {
        if (this.state.encounterPressed) {
            return (
                <div className="form-group">
                    <ol>
                        {this.pokemon.map((x) => { return (<li>{x.Name}</li>) })}
                    </ol>
                    <div className="form-group">
                        <input type="button" className='btn btn-info' value="Close" onClick={() => this.onCloseButtonClick()} />
                    </div>
                </div>
            )
        }
        else {
            return (null)
        }
    }

    //Page Render
    render() {
        return (
            <div className="col-md-2">
                <form className="form-group">
                    <div className="form-group">
                        <label for="biomeSelect">Biome</label>
                        <select className="form-control" id="biomeSelect">
                            <option>Aquatic</option>
                            <option>Desert</option>
                            <option>Grassland</option>
                            <option>Tundra</option>
                            <option>Forest</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="timeSelect">Time</label>
                        <select className="form-control" id="timeSelect" defaultValue="Day">
                            <option>Morning</option>
                            <option>Day</option>
                            <option>Night</option>
                        </select>
                    </div>
                    <div className="form-check form-check-inline">
                        <label className="form-check-label" for="allowExtinct">Allow Extinct
                            <input className="form-check-input" type="checkbox" id="allowExtinct" value="option1"></input>
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <label className="form-check-label" for="allowMega">Allow Mega
                            <input className="form-check-input" type="checkbox" id="allowMega" value="option2"></input>
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <label className="form-check-label" for="allowShiny">Allow Shiny
                            <input className="form-check-input" type="checkbox" id="allowShiny" onClick={() => this.onAllowShinyClick()} defaultChecked="checked" value="option3"></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <label for="shinyRate">Shiny Chance</label>
                        <div className="input-group">
                            <input type="number" className="form-control" disabled={!this.state.shinyAllowed} min="0" max="100" id="shinyRate" placeholder="Shiny Chance" defaultValue={this.state.shinyRate}></input>
                            <div className="input-group-addon">%</div>
                        </div>
                    </div>
                </form>
                <input type="button" className='btn btn-info' value="Encounter Now" onClick={() => this.onEncounterButtonClick()} />
                <br />
                {this.handleEncounterButtonClick()}
            </div >
        )
    }
}

ReactDom.render(<PokemonMain />, document.getElementById("app_start"))