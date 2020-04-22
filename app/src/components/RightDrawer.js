import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PropTypes from "prop-types";

const styles = theme => ({
    list: {
        width: 400,
    },
    fullList: {
        width: 'auto',
    },
});

class RightDrawer extends React.Component {

    constructor() {
        super();

    }

	toggleDrawer = open => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		this.props.toggleDrawer(open);
	};

	render() {
    	const {classes, markers} = this.props;

        return (
            <div>
                <SwipeableDrawer
                    anchor="right"
                    open={this.props.isOpen}
					onOpen={this.toggleDrawer(true)}
                    onClose={this.toggleDrawer(false)}
                >
                    <div
                        className={classes.list}
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
						{markers.map((marker, idx) =>
							<span
								key={`marker-${idx}`}
							>
								[x: {marker.worldPosition[0]}; y: {marker.worldPosition[1]}]
							</span>
						)}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

RightDrawer.propTypes = {
	markers: PropTypes.array,
	isOpen: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
	toggleDrawer: PropTypes.func.isRequired
};

export default withStyles(styles)(RightDrawer);
