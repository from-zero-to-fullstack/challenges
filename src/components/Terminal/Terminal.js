import React from 'react';
import TerminalMessage from './TerminalMessage';
import TerminalOutput from './TerminalOutput';
import './Terminal.css';

export default function Terminal(props) {
    const { message, output, isError } = props;

    return (
        <>
            <div className="terminal-container">
                <div className="pane-title">Terminal</div>
                <div className="terminal-body">
                    {message ? <TerminalMessage props={message} /> : null}
                    {output ? (
                        <TerminalOutput props={{ output, isError }} />
                    ) : null}
                </div>
            </div>
        </>
    );
}
