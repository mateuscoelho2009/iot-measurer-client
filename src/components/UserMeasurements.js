import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase';
import * as d3 from 'd3';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { isArray } from 'util';
import MeasurementItem from './MeasurementItem';

const useStyles = makeStyles(theme => ({
    root: {
        width: '80%',
        minHeight: 'calc(100vh - 111.82px)',
        margin: 'auto',
    },
    sectionTitle: {
        color: '#119',
        margin: theme.spacing(2, 3),
    },
}));

const UserMeasurements = ({ measurements }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography
                variant="h4"
                className={classes.sectionTitle}
                align="left"
            >
                Devices
            </Typography>
            {Array.isArray(measurements) && measurements.map(measure => (
                <MeasurementItem measure={measure} key={measure.id} />
            ))}
        </div>
    );
};

const mapStateToProps = store => ({
    measurements: store.userState.measurements,
});

export default connect(mapStateToProps) (UserMeasurements);