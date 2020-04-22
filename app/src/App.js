import React from 'react';
import PropTypes from 'prop-types';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Button} from "@material-ui/core";
import RightDrawer from './components/RightDrawer';
import WorldMap from './components/WorldMap';

import theme from './theme';

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
    area: {
        height: window.screen.height,
        width: window.screen.width
    }
});

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            tileSource: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            markers: [],
            isDrawerOpen: false
        };

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.addMarker = this.addMarker.bind(this);
        this.clearMarkers = this.clearMarkers.bind(this);
        this.handlerOnClickMarker = this.handlerOnClickMarker.bind(this);
    }

    addMarker(e) {
        const {markers} = this.state;
        const {
            containerPoint,
            worldPoint,
            layerPoint
        } = this.getMarkerPositions(e);

        markers.push({
            layerPosition: [layerPoint.x, layerPoint.y],
            worldPosition: [worldPoint.lat, worldPoint.lng],
            containerPosition: [containerPoint.x, containerPoint.y]
        });

        this.setState({markers});
    }

    clearMarkers() {
        this.setState({markers: []});
    }

    getMarkerPositions(e) {
        return {
            worldPoint: e.latlng,
            layerPoint: e.layerPoint,
            containerPoint: e.containerPoint
        }
    }

    handlerOnClickMarker() {
        this.setState({isDrawerOpen: true})
    }

    toggleDrawer(open) {
        this.setState({isDrawerOpen: open });
    }

    render() {
        const {classes} = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <div className={classes.root}>
                    <div className={classes.container}>
                        {/*<RightDrawer*/}
                        {/*    markers={this.state.markers}*/}
                        {/*    toggleDrawer={this.toggleDrawer}*/}
                        {/*    isOpen={this.state.isDrawerOpen}*/}
                        {/*/>*/}
                        <WorldMap
                            onClickMarker={this.handlerOnClickMarker}
                            addMarker={this.addMarker}
                            tileSource={this.state.tileSource}
                            markers={this.state.markers}
                        />
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
