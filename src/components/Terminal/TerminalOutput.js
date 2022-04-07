import React from 'react';
import './TerminalOutput.css';

export default function TerminalOutput(props) {
    return (
        <>
            <div className={`output ${props.props.isError ? 'error' : null}`}>
                {props.props.output}
            </div>
        </>
    );
}
