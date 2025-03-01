import { useCallback, useState,useEffect,useRef } from 'react'
import './App.css'

function App() {
    const [length, setLength] = useState(8);
    const [number, setNumber] = useState(false);
    const [charAllow, setCharAllow] = useState(false);
    const [pass, setPass] = useState("");
    const passwordGene = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (charAllow) str += "!@#$%^&*(){}_+=!@#$%^&*(){}_+=!@#$%^&*(){}_+=";
        if (number) str += "0123456789012345678901234567890123456789";
        for (let i = 0; i < length; i++) {
            let char = Math.floor(Math.random() * str.length);
            pass += str.charAt(char);
        }

        setPass(pass);

    }, [length, number, charAllow])
    const passRef = useRef(null);
const copytoclipboard = useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(pass)
},[pass])
useEffect(()=>{
    passwordGene();
},[length, number, charAllow])
    return (
        <>
            <div style={{ textAlign: "center", margin: "2vh" }}>
                <h2 id='name'>password generator</h2>
                <input id='input' type="text" value={pass} placeholder='password' readOnly ref ={passRef} /><button onClick={copytoclipboard} className='btn btn-success' style={{ borderRadius: "2vh", margin: "1vh" }}>Copy</button>

            </div>
            <div>
                <input type="range" min={2} max={60} value={length} onChange={(e)=>{
                    {setLength(e.target.value)}
                }} /> <label>Length:{length}</label>
            </div>
            <div>
            <input type="checkbox" defaultChecked={number} onChange={()=>{
                setNumber((prev)=>!prev) 
            }} /><label style={{margin:"1vh"}}>Number</label>
            </div>
            {/* for char */}
            <div>
            <input type="checkbox" defaultChecked={charAllow} onChange={()=>{
                setCharAllow((prev)=>!prev) 
            }} /><label style={{margin:"1vh"}}>Char</label>
            </div>
        </>
    )
}

export default App
