import React from 'react';
import './TerminalMessage.css';

export default function TerminalMessage(props) {
    const { message, isError } = props.props;

    return (
        <>
            <div className={`message ${isError ? 'error' : null}`}>
                {message}
            </div>
        </>
    );
}
