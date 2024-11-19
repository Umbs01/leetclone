import React, { useState, useCallback } from 'react'; 
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';

const extension = [python()];

function Playground({ starterCode, theme, oncodeChange }) {
    const onChange = useCallback((val, viewUpdate) => {
      oncodeChange(val);
    }, [oncodeChange]);
    
    return (
        <CodeMirror 
            value={starterCode} 
            extensions={extension} 
            onChange={onChange} 
            theme={theme === 'dark' ? vscodeDark : vscodeLight} 
            height={"calc(100vh - 55px);"}
        />
    );
}

export default Playground;

