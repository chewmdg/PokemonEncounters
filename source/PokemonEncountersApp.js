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
        }
    }

    //componentDidMount
    componentDidMount() {
        $.getJSON('../../api/pokemon?NamesOnly=true', ,(data) => {
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
onCloseButtonClick(){
    this.setState({
        encounterPressed: false,
    })
}


//handlers
handleEncounterButtonClick() {
    if (this.state.encounterPressed) {
        return (
            <div className="form-group">
                <ol>
                    {this.pokemon.map((x) => {return(<li>{x}</li>)})}
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
        <div className="form-group">
            <input type="button" className='btn btn-info' value="Random Encounter" onClick={() => this.onEncounterButtonClick()} />
            <br />
            {this.handleEncounterButtonClick()}
        </div>
    )
}
}

ReactDom.render(<PokemonMain />, document.getElementById("app_start"))