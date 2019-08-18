import React from 'react';
import SearchPanel from '../SearchPanel';
import GoogleMap from '../GoogleMap';
import { GOOGLE_MAPS_API_KEY } from '../../utils/config';

const initialMapOpts = {
    center: {lat: 45.23, lng: 35.71},
    zoom: 5,
    mapTypeControl: false
};

const mapStyle = {
    left: '0px'
};

const mapStyleWithSearchOn = {
    left: '400px'
}

class MainPanel extends React.Component {
    /*
        TODO: location-based view state assignment
    */
    constructor() {
        super();
        this.onSearchComplete = this.onSearchComplete.bind(this);
        this.state = {
            /* Search result state is kept in the main panel as it is shared */
            searchResults: [],
            /* Selected index of the search results */
            selectedIndex: -1,
            mapStyle
        }
        this.setHighlightedMarker = this.setHighlightedMarker.bind(this);
    }
    onSearchComplete(results) {
        results.forEach(element => {
            element.associatedRef = React.createRef();
        });
        this.setState({searchResults: results, selectedIndex: -1, mapStyle: mapStyleWithSearchOn});

    }
    setHighlightedMarker(itemToHighlight) {
        let itemIdx = this.state.searchResults.findIndex(row => row.id == itemToHighlight.id);
        this.setState({selectedIndex: itemIdx});
    }
    render() {
        return (
            <div>
                <SearchPanel onSearchComplete={this.onSearchComplete} resultsToDisplay={this.state.searchResults} onSelectItem={this.setHighlightedMarker}/>
                <GoogleMap  selectedIndex={this.state.selectedIndex} style={this.state.mapStyle} markerData={this.state.searchResults} apiKey={GOOGLE_MAPS_API_KEY} mapOpts={initialMapOpts} onSelectItem={this.setHighlightedMarker}/>
            </div>
        );
    }
}

export default MainPanel;