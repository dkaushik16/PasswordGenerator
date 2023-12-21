import { useState , useCallback, useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllow, setnumAllow]= useState(false)
  const [charAllow, setcharAllow]= useState(false)
  const [password, setPassword] = useState("")

  const passRef=useRef(null)

  const passGenerator=useCallback(()=>{
        
    let pass= ''
    let str= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(numAllow) str+= '0123456789'
    if(charAllow) str+= '!@#$%&*'

    for(let i=1;i<=length;i++){
        
        let ctr= Math.floor(Math.random()*str.length +1)
        pass+= str.charAt(ctr)
    }

    setPassword(pass)

  },[length,numAllow,charAllow,setPassword])

  useEffect(()=> {

    passGenerator()

  },  [length,numAllow,charAllow,passGenerator])

   const copyPass=useCallback(()=>{

    passRef.current?.select()
    window.navigator.clipboard.writeText(password)

   },[password])


  return (
  <>
    <div className='w-1/2 mx-auto px-4 py-3 my-8  shadow-md rounded-lg bg-cyan-950'>
    <h1 className='text-4xl  font-bold  text-center'>Password Generator</h1> 
    <div className=' flex   bg-white  font-semibold text-black
         rounded-xl my-8 ' >
          <input  type="text"  value={password} className='outline-none w-full py-1 px-3 rounded-lg' 
                  placeholder="Password" readOnly ref={passRef} />

           <button className='bg-red-700 rounded-xl p-4 ml-4 hover:bg-red-500'
              onClick={copyPass}>Copy</button>  
          </div>
        
      <div className='flex text-sm gap-x-2  text-black font-semibold py-2 text-lg text-white text-4xl' >
        <div className='flex items-center gap-x-1 '>
          <input type="range"
            min={8}
            max={15}
            value={length}
            className='cursor-pointer px-4 mr-4' 
            onChange={(e)=>{setLength(e.target.value)}}/>

            <label>Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1 ml-4'>
          <input type="checkbox"
                defaultChecked={numAllow}
                 id="numberInput"
                onChange={()=>{setnumAllow((prev)=> !prev)}}
                className='cursor-pointer'
            
             />
            <label htmlFor='numberInput'>Numbers</label>
        </div>
         <div className='flex items-center gap-x-1 ml-4'>
           <input type="checkbox"
                  defaultChecked={charAllow}
                  id="charInput"
                  onChange={()=>{setcharAllow((prev)=> !prev)}}
                  className='cursor-pointer'
                 / >
            <label htmlFor='charInput'>Characters</label>      
         </div>
      </div>
     </div>
  </>
  )
}

export default App
