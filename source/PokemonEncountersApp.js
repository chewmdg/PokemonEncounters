import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider from 'material-ui/Slider';

global.jQuery = require('jquery');

require('bootstrap');

class PokemonMain extends React.Component {
    constructor() {
        super();
        this.state = {
            numberEncountersValue: 0,
            extinctAllowed: false,
            megaAllowed: false,
            alolanAllowed: false,
            legendaryAllowed: false,
            mythicalAllowed: false,
            shinyAllowed: true,
            shinyRate: 5,
            temperatureValue: 0,
            hazardValue: 0,
            altitudeValue: 0,
            hallowValue: 0,
            lushValue: 0,
            brightValue: 0,
            waterValue: 0,
            remoteValue: 0,
            toxicityValue: 0,
            uniqueValue: 0,
            electromagneticValue: 0,
            metallicValue: 0,
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
            NumberEncounters: this.state.numberEncountersValue,
            ExtinctAllowed: this.state.extinctAllowed,
            MegaAllowed: this.state.megaAllowed,
            AlolanAllowed: this.state.alolanAllowed,
            LegendaryAllowed: this.state.legendaryAllowed,
            MythicalAllowed: this.state.mythicalAllowed,
            ShinyAllowed: this.state.shinyAllowed,
            ShinyRate: this.state.shinyRate,
            Temperature: this.state.temperatureValue,
            Hazard: this.state.hazardValue,
            Altitude: this.state.altitudeValue,
            Hallow: this.state.hallowValue,
            Lush: this.state.lushValue,
            Bright: this.state.brightValue,
            Water: this.state.waterValue,
            Remote: this.state.remoteValue,
            Toxicity: this.state.toxicityValue,
            Unique: this.state.uniqueValue,
            Electromagnetism: this.state.electromagneticValue,
            Metallic: this.state.metallicValue,
        }
        console.log(this.params);

        $.getJSON('../../api/Pokemon', this.params, (data) => {

            this.setState({
                generatedEncounter: data,
            });
        })
    }
    //on click
    onAllowExtinctClick(){
        this.setState({
            extinctAllowed: !this.state.extinctAllowed
        })
    }

    onAllowMegaClick(){
        this.setState({
            megaAllowed: !this.state.megaAllowed
        })
    }

    onAllowAlolanClick(){
        this.setState({
            alolanAllowed: !this.state.alolanAllowed
        })
    }

    onAllowLegendaryClick(){
        this.setState({
            legendaryAllowed: !this.state.legendaryAllowed
        })
    }

    onAllowMythicalClick(){
        this.setState({
            mythicalAllowed: !this.state.mythicalAllowed
        })
    }

    onAllowShinyClick() {
        this.setState({
            shinyAllowed: !this.state.shinyAllowed
        });
    }

    //on Change 
    onChangeEncounter(e) {
        this.setState({
            numberEncountersValue: parseInt(e.target.value),
        })
    }

    onChangeShiny(e) {
        this.setState({
            shinyRate: parseInt(e.target.value),
        })
    }

    //on change sliders
    onTemperatureChange(e, value) {
        console.log(e);
        this.setState({
            temperatureValue: value,
        })
    }
    onHazardChange(e, value) {
        console.log(e);
        this.setState({
            hazardValue: value,
        })
    }
    onAltitudeChange(e, value) {
        console.log(e);
        this.setState({
            altitudeValue: value,
        })
    }
    onhallowChange(e, value) {
        console.log(e);
        this.setState({
            hallowValue: value,
        })
    }
    onLushChange(e, value) {
        console.log(e);
        this.setState({
            lushValue: value,
        })
    }
    onBrightChange(e, value) {
        console.log(e);
        this.setState({
            brightValue: value,
        })
    }
    onWaterChange(e, value) {
        console.log(e);
        this.setState({
            waterValue: value,
        })
    }
    onRemoteChange(e, value) {
        console.log(e);
        this.setState({
            remoteValue: value,
        })
    }
    onToxicityChange(e, value) {
        console.log(e);
        this.setState({
            toxicityValue: value,
        })
    }
    onUniqueChange(e, value) {
        console.log(e);
        this.setState({
            uniqueValue: value,
        })
    }
    onElectromagneticChange(e, value) {
        console.log(e);
        this.setState({
            electromagneticValue: value,
        })
    }
    onMetallicChange(e, value) {
        console.log(e);
        this.setState({
            metallicValue: value,
        })
    }

    //Page Render
    render() {
        return (
            <div className="col-md-2">
                <form className="form-group">
                    <div>
                        <label for="numberEncounters">Number of Encounters</label>
                        <input type="number" id="numberEncounters" onChange={(e) => this.onChangeEncounter(e)} class="form-control" value={this.state.numberEncountersValue} placeholder="Text input" />
                    </div>
                    <div className="form-check form-check-inline">
                        <label className="form-check-label" for="allowExtinct">Allow Extinct
                            <input className="form-check-input" type="checkbox" id="allowExtinct" onClick={() => this.onAllowExtinctClick()} value="option1"></input>
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <label className="form-check-label" for="allowMega">Allow Mega
                            <input className="form-check-input" type="checkbox" id="allowMega" onClick={() => this.onAllowMegaClick()} value="option2"></input>
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <label className="form-check-label" for="allowAlolan">Allow Alolan
                            <input className="form-check-input" type="checkbox" id="allowAlola" onClick={() => this.onAllowAlolanClick()} value="option2"></input>
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <label className="form-check-label" for="allowLegendary">Allow Legendary
                            <input className="form-check-input" type="checkbox" id="allowLegendary" onClick={() => this.onAllowLegendaryClick()} value="option2"></input>
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <label className="form-check-label" for="allowMythical">Allow Mythical
                            <input className="form-check-input" type="checkbox" id="allowMythical" onClick={() => this.onAllowMythicalClick()} value="option2"></input>
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
                            <input type="number" className="form-control" disabled={!this.state.shinyAllowed} min="0" max="100" id="shinyRate" onChange={(e) => this.onChangeShiny(e)} placeholder="Shiny Chance" defaultValue={this.state.shinyRate}></input>
                            <div className="input-group-addon">%</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="temperature">Temperature</label>
                        <MuiThemeProvider>
                            <div>
                                <Slider id="temperature"
                                    min={-100}
                                    max={100}
                                    step={1}
                                    value={this.state.temperatureValue}
                                    onChange={(e, value) => this.onTemperatureChange(e, value)}>
                                </Slider>
                                <span>{this.state.temperatureValue}</span>
                            </div>
                        </MuiThemeProvider>
                    </div>
                    <div className="form-group">
                        <label for="hazard">Hazardous Level</label>
                        <MuiThemeProvider>
                            <div>
                                <Slider id="hazard"
                                    min={-100}
                                    max={100}
                                    step={1}
                                    value={this.state.hazardValue}
                                    onChange={(e, value) => this.onHazardChange(e, value)}>
                                </Slider>
                                <span>{this.state.hazardValue}</span>
                            </div>
                        </MuiThemeProvider>
                    </div>
                    <div className="form-group">
                        <label for="altitude">Altitude</label>
                        <MuiThemeProvider>
                            <div>
                                <Slider id="altitude"
                                    min={-100}
                                    max={100}
                                    step={1}
                                    value={this.state.altitudeValue}
                                    onChange={(e, value) => this.onAltitudeChange(e, value)}>
                                </Slider>
                                <span>{this.state.altitudeValue}</span>
                            </div>
                        </MuiThemeProvider>
                    </div>
                    <div className="form-group">
                        <label for="temperature">Hallowedness</label>
                        <MuiThemeProvider>
                            <div>
                                <Slider id="hallow"
                                    min={-100}
                                    max={100}
                                    step={1}
                                    value={this.state.hallowValue}
                                    onChange={(e, value) => this.onhallowChange(e, value)}>
                                </Slider>
                                <span>{this.state.hallowValue}</span>
                            </div>
                        </MuiThemeProvider>
                    </div>
                    <div className="form-group">
                        <label for="temperature">Lushiousness</label>
                        <MuiThemeProvider>
                            <div>
                                <Slider id="lush"
                                    min={-100}
                                    max={100}
                                    step={1}
                                    value={this.state.lushValue}
                                    onChange={(e, value) => this.onLushChange(e, value)}>
                                </Slider>
                                <span>{this.state.lushValue}</span>
                            </div>
                        </MuiThemeProvider>
                    </div>
                    <div className="form-group">
                        <label for="bright">Brightness</label>
                        <MuiThemeProvider>
                            <div>
                                <Slider id="bright"
                                    min={-100}
                                    max={100}
                                    step={1}
                                    value={this.state.brightValue}
                                    onChange={(e, value) => this.onBrightChange(e, value)}>
                                </Slider>
                                <span>{this.state.temperatureValue}</span>
                            </div>
                        </MuiThemeProvider>
                    </div>
                    <div className="form-group">
                        <label for="water">Waterness</label>
                        <MuiThemeProvider>
                            <div>
                                <Slider id="water"
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={this.state.waterValue}
                                    onChange={(e, value) => this.onWaterChange(e, value)}>
                                </Slider>
                                <span>{this.state.waterValue}</span>
                            </div>
                        </MuiThemeProvider>
                    </div>
                    <div className="form-group">
                        <label for="remote">Remoteness</label>
                        <MuiThemeProvider>
                            <div>
                                <Slider id="remote"
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={this.state.remoteValue}
                                    onChange={(e, value) => this.onRemoteChange(e, value)}>
                                </Slider>
                                <span>{this.state.remoteValue}</span>
                            </div>
                        </MuiThemeProvider>
                    </div>
                    <div className="form-group">
                        <label for="toxicity">Toxicity</label>
                        <MuiThemeProvider>
                            <div>
                                <Slider id="toxicity"
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={this.state.toxicityValue}
                                    onChange={(e, value) => this.onToxicityChange(e, value)}>
                                </Slider>
                                <span>{this.state.toxicityValue}</span>
                            </div>
                        </MuiThemeProvider>
                    </div>
                    <div className="form-group">
                        <label for="unique">Uniqueness</label>
                        <MuiThemeProvider>
                            <div>
                                <Slider id="unique"
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={this.state.uniqueValue}
                                    onChange={(e, value) => this.onUniqueChange(e, value)}>
                                </Slider>
                                <span>{this.state.uniqueValue}</span>
                            </div>
                        </MuiThemeProvider>
                    </div>
                    <div className="form-group">
                        <label for="electromagnetic">Electromagnetism</label>
                        <MuiThemeProvider>
                            <div>
                                <Slider id="electromagnetic"
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={this.state.electromagneticValue}
                                    onChange={(e, value) => this.onElectromagneticChange(e, value)}>
                                </Slider>
                                <span>{this.state.electromagneticValue}</span>
                            </div>
                        </MuiThemeProvider>
                    </div>
                    <div className="form-group">
                        <label for="metallic">Metallicness</label>
                        <MuiThemeProvider>
                            <div>
                                <Slider id="metallic"
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={this.state.metallicValue}
                                    onChange={(e, value) => this.onMetallicChange(e, value)}>
                                </Slider>
                                <span>{this.state.metallicValue}</span>
                            </div>
                        </MuiThemeProvider>
                    </div>
                    {/*<div className="form-group">
                        <label for="timeSelect">Time</label>
                        <select className="form-control" id="timeSelect" defaultValue="Day" onChange={(e) => this.onChangeTime(e)}>
                            <option>Morning</option>
                            <option>Day</option>
                            <option>Night</option>
                        </select>
                    </div>*/}
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
                        {this.props.generatedEncounter.map((x) => { return (<li key={x._id}>{x.Name}:{x.PrimaryType}:{x.SecondaryType}</li>) })}
                    </ol>
                    <div className="form-group">
                        <input type="button" className='btn btn-info' value="Close" />
                    </div>
                </div>
            )
        }
        return (null);
    }
}

ReactDom.render(<PokemonMain />, document.getElementById("app_start"))