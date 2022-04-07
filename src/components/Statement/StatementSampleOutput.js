import React from 'react';
import './StatementSampleOutput.css';

export default function StatementSampleOutput(props) {
    return (
        <>
            <div className="statement-sample-output-container">
                <hr />
                <div className="strong">Sample Output:</div>
                <div className="sampleOutput">{props.props}</div>
            </div>
        </>
    );
}
