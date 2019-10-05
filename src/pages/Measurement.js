import React from 'react';

function Measurement(props) {
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

export default Measurement;
