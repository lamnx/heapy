import React from 'react';
import { Map, TileLayer, Popup, Marker } from 'react-leaflet';
import PropTypes from 'prop-types';

class WorldMap extends React.Component {
    constructor() {
        super();

        this.addMarker = this.addMarker.bind(this);
        this.onClickMarker = this.onClickMarker.bind(this);
    }

    addMarker(e) {
        this.props.addMarker(e);
    }

    onClickMarker() {
        this.props.onClickMarker();
    }

    render() {
        const {markers, tileSource} = this.props;

        return (
            <Map
                center={[50, 10]}
                zoom={6}
                maxZoom={13}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={false}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
                onClick={this.addMarker}
            >
                <TileLayer
                    url={tileSource}
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {markers.map((marker, idx) =>
                    <Marker
                        key={`marker-${idx}`}
                        position={marker.worldPosition}
                        onClick={this.onClickMarker}
                    >
                        <Popup>
                            <span>
								x: {marker.worldPosition[0]}
                                <br/>
								y: {marker.worldPosition[1]}
                            </span>
                        </Popup>
                    </Marker>
                )}
            </Map>
        )
    }
}

WorldMap.propTypes = {
    markers: PropTypes.array,
    addMarker: PropTypes.func.isRequired,
    tileSource: PropTypes.string.isRequired,
    onClickMarker: PropTypes.func.isRequired
};

export default WorldMap;