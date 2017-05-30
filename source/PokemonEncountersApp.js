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
            encounterToRender: false,
        }
    }

    //componentDidMount ../../api/pokemon?NamesOnly=true
    componentDidMount() {
        $.getJSON('../../api/Pokemon', (data) => {
            this.pokemon = data;
            console.log(this.pokemon);
        })
    }

    // generateEncounter() {
    //     $.getJSON('../../api/Pokemon', JSON.stringify(this.params), (data) => {
    //         this.generatedEncounter = data;  
    //         console.log(this.pokemon);
    //     })
    // }

    //functions onClicks
    onEncounterButtonClick() {
        this.params = {
            Biome: this.state.Biome,
            Time: this.state.Time,
        }
        console.log(this.params);

        $.getJSON('../../api/Pokemon', this.params, (data) => {

            this.setState({
                generatedEncounter: data,
            })
        })
        console.log("Generated Encounter:")
        console.log(this.state.generatedEncounter);
        console.log("Encounter to render");
    }

    onCloseButtonClick() {
        this.setState({
            encounterPressed: false,
        })
    }
    onAllowShinyClick() {
        this.setState({ shinyAllowed: !this.state.shinyAllowed });
    }

    //on Change 
    onChangeBiome(e) {
        this.setState({
            Biome: e.target.value,
        })
    }

    onChangeTime(e) {
        this.setState({
            Time: e.target.value,
        })
    }

        //Page Render
        render() {
            return (
                <div className="col-md-2">
                    <form className="form-group">
                        <div>
                            <label for="biomeSelect">Biome</label>
                            <select className="form-control" id="biomeSelect" onChange={(e) => this.onChangeBiome(e)}>
                                <option>Aquatic</option>
                                <option>Desert</option>
                                <option>Grassland</option>
                                <option>Tundra</option>
                                <option>Forest</option>
                                <option>Ice</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="timeSelect">Time</label>
                            <select className="form-control" id="timeSelect" defaultValue="Day" onChange={(e) => this.onChangeTime(e)}>
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
                    <EncounterList generatedEncounter={this.state.generatedEncounter} />
                </div >
            )
        }
    }

class EncounterList extends React.Component {
    render() {
        if (this.props.generatedEncounter) {
            return (
                <div className="form-group">
                    <ol>
                        {this.props.generatedEncounter.map((x) => { return (<li key={x._id}>{x.Name}</li>) })}
                    </ol>
                    <div className="form-group">
                        <input type="button" className='btn btn-info' value="Close" onClick={() => this.onCloseButtonClick()} />
                    </div>
                </div>
            )
        }
        return (null);
    }
}

ReactDom.render(<PokemonMain />, document.getElementById("app_start"))