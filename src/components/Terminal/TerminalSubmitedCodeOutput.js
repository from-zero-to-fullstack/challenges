import React from 'react';
import './TerminalSubmitedCodeOutput.css';

export default function TerminalSubmitedCodeOutput(props) {
    const { submitedCodeOutput } = props.props;

    return (
        <>
            <div className="submited-code-output">{submitedCodeOutput}</div>
        </>
    );
}
