import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import './Editor.css';

export default function Editor(props) {
    const { language, displayName, value, onChange } = props;

    function handleChange(editor, data, value) {
        onChange(value);
    }

    return (
        <>
            <div className="editor-container">
                <div className="title">{displayName}</div>
                <ControlledEditor
                    onBeforeChange={handleChange}
                    value={value}
                    className="code-mirror-wrapper"
                    options={{
                        theme: 'material',
                        lineWrapping: true,
                        lint: true,
                        mode: language,
                        lineNumbers: true,
                        keymap: 'sublime'
                    }}
                />
            </div>
        </>
    );
}
