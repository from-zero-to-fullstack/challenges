import React from 'react';
import './StatementSampleInput.css';

export default function StatementSampleInput(props) {
    return (
        <>
            <div className="statement-sample-input-container">
                <hr />
                <div className="strong">Sample Input:</div>
                <div className="sampleInput">{props.props}</div>
            </div>
        </>
    );
}
