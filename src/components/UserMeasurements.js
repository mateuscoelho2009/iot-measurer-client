import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { isArray } from 'util';

const useStyles = makeStyles(theme => ({
    root: {
        width: '80%',
        minHeight: 'calc(100vh - 111.82px)',
        margin: 'auto',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    sectionTitle: {
        color: '#119',
        margin: theme.spacing(2, 3),
    },
}));

const UserMeasurements = ({ measurements }) => {
    const classes = useStyles();
    const [state, setState] = useState({
        dataUpdated: 0,
    });

    console.log(measurements);

    useEffect(() => {
        if (isArray(measurements)) {
            measurements.forEach(({ id }, index) => {
                const collection = firebase
                    .firestore()
                    .collection('service_user');

                // Get Sensor Samples
                collection
                    .doc(`sensor_${id}`)
                    .collection('samples')
                    .get()
                    .then((snapshot) => {
                        measurements[index].samples = snapshot
                            .docs
                            .map(doc => doc.data())
                            .sort((a, b) => {
                                const dateA = new Date(
                                    ...a.date.split('/').reverse(),
                                    ...a.time.split(':'),
                                    ).getTime();
                                const dateB = new Date(
                                    ...b.date.split('/').reverse(),
                                    ...b.time.split(':'),
                                    ).getTime();

                                return dateA - dateB;
                            });
                            
                        setState((formerState) => ({
                            dataUpdated: formerState.dataUpdated,
                        }));
                    });

                // Get Valve States
                collection
                    .doc(`valve_${id}`)
                    .collection('valve_state')
                    .get()
                    .then((snapshot) => {
                        measurements[index].valveStates = snapshot
                            .docs
                            .map(doc => doc.data())
                            .sort((a, b) => {
                                const dateA = new Date(
                                    ...a.date.split('/').reverse(),
                                    ...a.time.split(':'),
                                    ).getTime();
                                const dateB = new Date(
                                    ...b.date.split('/').reverse(),
                                    ...b.time.split(':'),
                                    ).getTime();

                                return dateA - dateB;
                            });
                            
                        setState((formerState) => ({
                            dataUpdated: formerState.dataUpdated,
                        }));
                    });
            });
        }
    }, [measurements]);

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
                <ExpansionPanel key={measure.id}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Sensor {measure.id}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            The Valve is {
                                measure
                                && measure.valveStates
                                && measure.valveStates.length
                                && measure
                                    .valveStates[measure.valveStates.length - 1]
                                    .state
                            }
                        </Typography>
                        {measure.samples && measure.samples.length}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    );
};

const mapStateToProps = store => ({
    measurements: store.userState.measurements,
});

export default connect(mapStateToProps) (UserMeasurements);