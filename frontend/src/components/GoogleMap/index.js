import React from 'react';
import PropTypes from 'prop-types';
import { getPopularityByLocation } from '../../model/popularityDao';

function scriptLoader(apiKey) {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) resolve();
        let scriptTag = document.createElement('script');
        scriptTag.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey;
        scriptTag.async = true;
        scriptTag.onload = function () {
            resolve();
        };
        document.getElementsByTagName('body')[0].appendChild(scriptTag);
    });
}

class GoogleMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapRef: React.createRef()
        }
        /* These are not state as their changes will trigger renders outside of react lifecycle */
        this.mapScript = scriptLoader(this.props.apiKey);
        this.markerObjs = new Map();
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }
    adjustMapBounds() {
        let sw = {
            lat: 0,
            lng: 0,
        };
        let ne = {
            lat: 0,
            lng: 0
        }
        this.props.markerData.forEach(row => {
            if (row.lat < sw.lat) sw.lat = row.lat;
            if (row.lat > ne.lat) ne.lat = row.lat;
            if (row.lng > ne.lng) ne.lng = row.lng;
            if (row.lng > sw.lng) sw.lng = row.lng;
        });
        let bounds = new window.google.maps.LatLngBounds();
        bounds.extend(sw);
        bounds.extend(ne);
        this.map.fitBounds(bounds);
    }
    showLabelForSelected() {
        let me = this;
        if (this.props.selectedIndex == -1) return;
        let selectedRow = this.props.markerData[this.props.selectedIndex];
        getPopularityByLocation(selectedRow).then(data => {
            let markerOpts = {
                position: {
                    lat: selectedRow.lat,
                    lng: selectedRow.lng
                },
                map: me.map,
                content: selectedRow.name + ' -- popularity:' + data.popularity
            };
            if (me.infoWindow) {
                me.infoWindow.setMap(null);
            }
            me.infoWindow = new window.google.maps.InfoWindow(markerOpts);
        });
    }

    componentDidMount() {
        var me = this;
        this.mapScript.then(function (val) {
            me.map = new window.google.maps.Map(me.state.mapRef.current, me.props.mapOpts);
        });
    }
    onMarkerClick(event) {
        console.log(event);
        const TOLERANCE = 0.001;
        let [lat, lng] = [event.latLng.lat(), event.latLng.lng()];
        let rows = this.props.markerData;
        for (let i = 0; i < rows.length; i++) {
            console.log(Math.abs(rows[i].lat - lat));
            if (Math.abs(rows[i].lat - lat) < TOLERANCE && Math.abs(rows[i].lng - lng) < TOLERANCE) {
                this.props.onSelectItem(rows[i]);
                break;
            }
        }
    }
    componentDidUpdate() {
        let me = this;
        let newMap = new Map();
        this.props.markerData.forEach(row => {
            let posId = row.id;
            let oldMap = this.markerObjs;
            if (oldMap.has(posId)) {
                newMap.set(posId, oldMap.get(posId));
                oldMap.delete(posId);
            } else {
                let marker = new window.google.maps.Marker({ position: { lat: row.lat, lng: row.lng }, map: me.map });
                marker.addListener('click', me.onMarkerClick);
                newMap.set(posId, marker);
            }
        });
        for (let value of this.markerObjs.values()) {
            value.setMap(null);
        }
        this.markerObjs.clear();
        this.markerObjs = newMap;
        this.adjustMapBounds();
    }
    render() {
        this.showLabelForSelected();
        return <div ref={this.state.mapRef} style={{ ...this.props.style, width: "100%", height: '100vh' }} asdf={this.props.selectedIndex} />
    }
}

GoogleMap.propTypes = {
    /* API key for the map*/
    apiKey: PropTypes.string.isRequired,
    /* Data to render markers */
    markerData: PropTypes.array.isRequired,
    /* Map options to pass to Google Map object*/
    mapOpts: PropTypes.object,
    /* Selected marker index, -1 for no selection*/
    selectedIndex: PropTypes.number.isRequired,
    /* What else to do when an item is selected */
    onSelectItem: PropTypes.func,
    /* Extra styles */
    style: PropTypes.object
}

export default GoogleMap;