import React from 'react';
import './StatementSample.css';

export default function StatementSampleOutput(props) {
    return (
        <>
            <div>
                <div className="statement-title">Sample Outputs:</div>
                {props.props.map((_, i) => (
                    <div key={i}>- {_}</div>
                ))}
            </div>
        </>
    );
}
