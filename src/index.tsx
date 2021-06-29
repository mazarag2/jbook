import ReactDOM from 'react-dom';
import { useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import { useEffect ,useRef} from 'react';

const App = () => {

    const [input,setInput] = useState('');
    const [code,setCode] = useState('');

    const ref = useRef<any>()
    const onClick = async () => {
        console.log(input)
        if(!ref.current){
            return ;
        }
        setCode(input)
        const result = await ref.current.transform(input,{
            loader : 'jsx',
            target: 'es2015'
        });
        setCode(result.code)

    }

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker : true,
            wasmURL: '/esbuild.wasm'
        })
        
    }

    useEffect(() => {

        startService();

    },[])
    return (
    <div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea> 
        <button onClick={onClick}>Submit</button>
        <h1>hello there</h1>
        <pre>{code}</pre>
    </div>
    )
 
}

ReactDOM.render(<App />, document.querySelector('#root'));