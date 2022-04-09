import React from 'react';
import './TerminalOutput.css';

export default function TerminalOutput(props) {
    const { output, isError } = props.props;

    return (
        <>
            <div className={`output ${isError ? 'error' : null}`}>{output}</div>
        </>
    );
}
