import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './theme';

const TILE_SIZE = 256;

const styles = theme => ({
    '@global': {
        body: {
            fontSize: '1rem',
            letterSpacing: 0,
            lineHeight: 'normal'
        }
    },
    root: {height: '100vh'},
    main: {height: '100vh'},
    container: {
        height: window.screen.height + TILE_SIZE * 2,
        width: window.screen.width + TILE_SIZE * 2
    },
    area: {
        height: window.screen.height,
        width: window.screen.width
    }
});

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            mapType: 'http://{s}.tile.osm.kosmosnimki.ru/night/{z}/{x}/{y}.png'
        }

        this.setDay = this.setDay.bind(this);
        this.setNight = this.setNight.bind(this);
    }

    componentDidMount() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.on('zoomend', () => {
            window.console.log('Current zoom level -> ', leafletMap.getZoom());
        });
    }

    setNight() {
        this.setState(function(state, props) {
            return {
                mapType: 'http://{s}.tile.osm.kosmosnimki.ru/night/{z}/{x}/{y}.png'
            }
        });
    }

    setDay() {
        this.setState(function(state, props) {
            return {
                mapType: 'http://{s}.tile.osm.kosmosnimki.ru/kosmo/{z}/{x}/{y}.png'
            }
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <div className={classes.root}>
                    <div className={classes.container}>
                        <Map
                            ref={m => {this.leafletMap = m;}}
                            center={[50, 10]}
                            zoom={6}
                            maxZoom={13}
                            attributionControl={true}
                            zoomControl={true}
                            doubleClickZoom={true}
                            scrollWheelZoom={true}
                            dragging={true}
                            animate={true}
                            easeLinearity={0.35}
                        >
                            <TileLayer
                                url="http://{s}.tile.osm.kosmosnimki.ru/night/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                        </Map>
                    </div>

                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
