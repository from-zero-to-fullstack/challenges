import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Statement from './Statement/Statement';
import Editor from './Editor/Editor';
import Console from './Console/Console';
import './App.css';

import javascript from './exercises/javascript.json';

export class statement {
    constructor(id, title, description, sampleInput, sampleOutput) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.sampleInput = sampleInput;
        this.sampleOutput = sampleOutput;
    }
}

function App() {

    // const [statement, setStatement] = useLocalStorage('statement', '');
    const [code, setCode] = useLocalStorage('code', '');
    // const [console, setConsole] = useLocalStorage('console', '');

    let stat = new statement();

    const questions = javascript.map((data) => {
        stat.id = data.id;
        stat.title = data.title;
        stat.description = data.description
        stat.sampleInput = data.sampleInput;
        stat.sampleOutput = data.sampleOutput;
    });

    const [initialPos, setInitialPos] = useState(null);
    const [initialSize, setInitialSize] = useState(null);

    const initial = e => {
        let resizable = document.getElementById('resizable');

        setInitialPos(e.clientX);
        setInitialSize(resizable.offsetWidth);
    };

    const resize = e => {
        let resizable = document.getElementById('resizable');
        resizable.style.width = `${parseInt(initialSize) + parseInt(e.clientX - initialPos)
            }px`;
    };

    function submitCode() {
        alert(
            '\nNot implemented yet...\n\nBut good to know that you are doing something! 😁'
        );
    }

    return (
        <>
            <div className="pane">
                <div id="resizable" className="left-pane resizable">
                    <Statement
                        title={stat.title}
                        description={stat.description}
                        sampleInput={stat.sampleInput}
                        sampleOutput={stat.sampleOutput}
                    />
                    <Console
                        message={console.message}
                        output={console.output}
                    />
                </div>
                <div
                    className="draggable"
                    draggable="true"
                    onDragStart={initial}
                    onDrag={resize}
                />
                <div className="right-pane">
                    <Editor
                        language="javascript"
                        displayName="JavaScript"
                        value={code}
                        onChange={setCode}
                    />
                </div>
            </div>
            <button
                type="button"
                className="submit-code"
                onClick={() => submitCode()}
            >
                Submit
            </button>
        </>
    );
}

export default App;
