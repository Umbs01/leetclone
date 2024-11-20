import React, { useState, useCallback, useEffect } from 'react'; 
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';

const extensions = [python()];

function Playground({ onCodeChange, initialCode = "print('Hello World!')" }) {
    const [value, setValue] = useState(initialCode);
    const [theme, setTheme] = useState('dark'); // Default theme

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
            setTheme(localStorage.getItem('theme'));
        }
    }, []);

    const onChange = useCallback((val, viewUpdate) => {
        console.log('val:', val);
        setValue(val);
        onCodeChange(val);
    }, [onCodeChange]);

    const getTheme = () => (theme === 'dark' ? vscodeDark : vscodeLight);

    return (
        <CodeMirror 
            value={value} 
            extensions={extensions} 
            onChange={onChange} 
            theme={getTheme()} // Set theme dynamically
            height={"calc(100vh - 55px)"}
        />
    );
}

export default Playground;
