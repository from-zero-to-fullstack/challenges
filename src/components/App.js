import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Statement from './Statement';
import Editor from './Editor';
import Console from './Console';

import data from '../exercises/1.json';

function App() {
    const [statement, setStatement] = useLocalStorage('statement', '');
    const [code, setCode] = useLocalStorage('code', '');
    const [console, setConsole] = useLocalStorage('console', '');

    function submitCode() {
        alert(
            '\nNot implemented yet...\n\nBut good to know that you are doing something! 😁'
        );
    }

    return (
        <>
            <div className="pane">
                <Statement
                    // title={statement.title}
                    // description={statement.description}
                    // sampleInput={statement.sampleInput}
                    // sampleOutput={statement.sampleOutput}
                    title="Print todays date"
                    description="You need to create a program that displays todays date in a human readable format."
                    sampleInput={undefined}
                    sampleOutput="Monday, June 23rd 2022 18:27"
                />
                <Editor
                    language="javascript"
                    displayName="JavaScript"
                    value={code}
                    onChange={setCode}
                />
                <Console
                    // message={console.message}
                    // output={console.output}
                    message="Well done! ✅"
                    output="Wednesday, April 06th 2022 20:27"
                />
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
