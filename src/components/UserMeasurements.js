import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
                <ExpansionPanel key={measure.name}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>{measure.name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            The Valve is {measure.data.open ? 'Open' : 'Closed'}
                        </Typography>
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