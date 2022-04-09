import React from 'react';
import TerminalSubmitedCodeOutput from './TerminalSubmitedCodeOutput';
import TerminalMessage from './TerminalMessage';
import TerminalOutput from './TerminalOutput';
import './Terminal.css';

export default function Terminal(props) {
    const { message, output, isError, submitedCodeOutput } = props;

    return (
        <>
            <div className="terminal-container">
                <div className="pane-title">Terminal</div>
                <div className="terminal-body">
                    {submitedCodeOutput ? (
                        <TerminalSubmitedCodeOutput
                            props={{ submitedCodeOutput }}
                        />
                    ) : null}
                    {message ? (
                        <TerminalMessage props={{ message, isError }} />
                    ) : null}
                    {output ? (
                        <TerminalOutput props={{ output, isError }} />
                    ) : null}
                </div>
            </div>
        </>
    );
}
