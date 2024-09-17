'use client'

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

const extension = [python()];

function App() {
  const [value, setValue] = React.useState("print('Hello World!')");
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);
  return (
        <CodeMirror value={value} 
            extensions={extension} 
            onChange={onChange} 
            theme={vscodeDark}
            />
    );
}
export default App;
