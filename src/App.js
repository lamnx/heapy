import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './theme';

const styles = theme => ({
    '@global': {
        body: {
            fontSize: '1rem',
            letterSpacing: 0,
            lineHeight: 'normal'
        }
    },
    root: {
        display: 'flex',
        height: '100%'
    },
    appBarSpacer: theme.mixins.toolbar,
    main: {
        flexGrow: 1,
        padding: theme.spacing(2),
        height: '100vh',
        overflow: 'auto',
        position: 'relative',
        backgroundColor: theme.palette.background.main
    },
    content: {
        height: 'calc(100% - 64px)',
        position: 'relative'
    }
});

class App extends React.Component {

  
    render() {
    
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <div className={classes.root}>
                    <main className={classes.main}>
                        <div className={classes.appBarSpacer} />
                        <div className={classes.content}>
                            <LeafletMap
                                center={[50, 10]}
                                zoom={2}
                                maxZoom={10}
                                attributionControl={true}
                                zoomControl={true}
                                doubleClickZoom={true}
                                scrollWheelZoom={true}
                                dragging={true}
                                animate={true}
                                easeLinearity={0.35}
                            >
                                <TileLayer url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
                                <Marker position={[50, 10]}>
                                    <Popup>Popup for any custom information.</Popup>
                                </Marker>
                            </LeafletMap>
                        </div>
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);