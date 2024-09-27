import React, { useState, useCallback } from 'react'; 
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

const extension = [python()];

function Playground() {
    const [value, setValue] = useState("print('Hello World!')");
    const onChange = useCallback((val, viewUpdate) => {
      console.log('val:', val);
      setValue(val);
    }, []);
    
    return (
        <CodeMirror 
            value={value} 
            extensions={extension} 
            onChange={onChange} 
            theme={vscodeDark} 
            height={"calc(100vh - 55px);"}
        />
    );
}

export default Playground;




