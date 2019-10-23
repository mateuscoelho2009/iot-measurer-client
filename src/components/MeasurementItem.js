import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase';
import classnames from 'classnames';
import * as d3 from 'd3';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { isArray } from 'util';

const useStyles = makeStyles(theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    summary: {
        '& > div': {
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        boxShadow: '0px 5px 5px -5px rgba(0,0,0,0.75)',
    },
    status: {
        marginLeft: theme.spacing(1),
        backgroundColor: '#ddd',
        color: '#888',
        padding: theme.spacing(1),
        lineHeight: theme.typography.pxToRem(15),
        fontSize: theme.typography.pxToRem(15),
        borderRadius: theme.spacing(0.5),
    },
    open: {
        backgroundColor: '#beb',
        color: '#6a6',
    },
    closed: {
        backgroundColor: '#ebb',
        color: '#a66',
    }
}));

const MeasurementItem = ({ measure }) => {
    const classes = useStyles();
    const [state, setState] = useState({
        dataUpdated: 0,
    });
    const graphRef = useRef(null);

    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 100, bottom: 30, left: 30},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svgRef = useRef(null);

    useEffect(() => {
        if (!svgRef.current && graphRef.current) {
            svgRef.current = d3.select(graphRef.current)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
        }
    }, [graphRef.current]);

    const lines = [
        'soilHumidity',
        'temperature',
    ];
    const myColors = d3.scaleOrdinal()
      .domain(lines)
      .range(d3.schemeSet2);

    useEffect(() => {
        if (!isArray(measure.samples) || !measure.samples.length) return;
        if (!svgRef.current) return;

        const dataReady = lines.map(line => ({
            name: line,
            values: measure.samples.map(v => ({
                time: v.timestamp,
                value: v[line],
            }))
        }));

        // Add X axis --> it is a date format
        let x = d3.scaleTime()
            .domain(d3.extent(measure.samples, function(d) { 
                return new Date(d.timestamp);
            }))
            .range([ 0, width ]);
        svgRef.current.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        let y = d3.scaleLinear()
            .domain([0,120])
            .range([ height, 0 ]);
        svgRef.current.append("g")
            .call(d3.axisLeft(y));

        // Add the lines
        var line = d3.line()
            .x(function(d) { return x(new Date(d.time)) })
            .y(function(d) { return y(+d.value) })
        svgRef.current
            .selectAll("myLines")
            .data(dataReady)
            .enter()
            .append("path")
            .attr("d", function(d){ return line(d.values) } )
            .attr("stroke", function(d){ return myColors(d.name) })
            .style("stroke-width", 4)
            .style("fill", "none");
        // Add the points
        svgRef.current
            // First we need to enter in a group
            .selectAll("myDots")
            .data(dataReady)
            .enter()
            .append('g')
            .style("fill", function(d){ return myColors(d.name) })
            // Second we need to enter in the 'values' part of this group
            .selectAll("myPoints")
            .data(function(d){ return d.values })
            .enter()
            .append("circle")
            .attr("cx", function(d) { return x(new Date(d.time)) } )
            .attr("cy", function(d) { return y(d.value) } )
            .attr("r", 5)
            .attr("stroke", "white");

        // Add a legend at the end of each line
        svgRef.current
            .selectAll("myLabels")
            .data(dataReady)
            .enter()
            .append('g')
            .append("text")
                .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
                .attr("transform", function(d) { return "translate(" + x(d.value.time) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
                .attr("x", 12) // shift the text a bit more right
                .text(function(d) { return d.name; })
                .style("fill", function(d){ return myColors(d.name) })
                .style("font-size", 15);
    }, [svgRef.current, measure.samples]);

    useEffect(() => {
        const collection = firebase
            .firestore()
            .collection('service_user');

        // Get Sensor Samples
        collection
            .doc(`sensor_${measure.id}`)
            .collection('samples')
            .get()
            .then((snapshot) => {
                measure.samples = snapshot
                    .docs
                    .map(doc => doc.data())
                    .map(doc => ({
                        ...doc,
                        timestamp: new Date(
                            ...doc.date.split('/').reverse(),
                            ...doc.time.split(':'),
                            ).getTime(),
                    }))
                    .sort((a, b) => {
                        return a.timestamp - b.timestamp;
                    });
                    
                setState((formerState) => ({
                    dataUpdated: formerState.dataUpdated,
                }));
            });

        // Get Valve States
        collection
            .doc(`valve_${measure.id}`)
            .collection('valve_state')
            .get()
            .then((snapshot) => {
                measure.valveStates = snapshot
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
    }, [measure]);

    const getState = measure
        && measure.valveStates
        && measure.valveStates.length
        && measure
            .valveStates[measure.valveStates.length - 1]
            .state;

    return (
        <ExpansionPanel key={measure.id}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.summary}
            >
                <Typography className={classes.heading}>Sensor {measure.id}</Typography>
                <span className={classnames({
                    [classes.status]: true,
                    [classes.closed]: getState === 'closed',
                    [classes.open]: getState === 'open',
                })}>
                    {(measure
                        && measure.valveStates
                        && measure.valveStates.length
                        && measure
                            .valveStates[measure.valveStates.length - 1]
                            .state) || 'pending'}
                </span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div ref={graphRef} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default MeasurementItem;