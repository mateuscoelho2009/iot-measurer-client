import React from 'react';

function Measurements(props) {
    const {
        match: {
            params: {
                id,
            },
        },
    } = props;

    return (
        <>
            {id}
        </>
    );
}

export default Measurements;
