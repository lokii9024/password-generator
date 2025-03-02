import { useState,useCallback, useEffect,useRef } from 'react'
import './App.css'
import toastr from 'toastr'
import "toastr/build/toastr.min.css";

function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [Password,setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(numberAllowed) str+="0123456789"
      if(charAllowed) str += "!@#$%^&*-_+=[]{}~`"

      for(let i = 1;i<=length;i++){
        let char =Math.floor(Math.random()*str.length + 1)
        pass += str.charAt(char)
      }
      setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(Password)
    .then(() => {
      toastr.success("Password copied to clipboard!", "Success", {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-center",
      });
    })
    .catch((err) => {
      toastr.error("Failed to copy password!", "Error", {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-center",
      });
      throw new Error(err);
    });
  }, 
  [Password])

  useEffect(() => {
    passwordGenerator()
  }, [length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className='mt-20 ml-auto'>
      <h1 className='text-4xl text-white text-center '>Password Generator</h1>
        <div className='w-full max-w-md mx-auto shadow-md
      rounded-lg px-4 my-8 text-orange-500'>
        <div className='flex shadow
        rounded-lg overflow-hidden mb-4'>
          <input
          type="text"
          value={Password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly 
          ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipBoard}
          className='outline-none bg-blue-700 text-white
          px-3 py-0.5 shrink-0'>
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer' 
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked = {numberAllowed}
            id = "numberInput"
            className='cursor-pointer' 
            onChange={() => {setNumberAllowed((prev) => !prev)}}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked = {charAllowed}
            id = "charInput"
            className='cursor-pointer' 
            onChange={() => {
              setCharAllowed((prev) => !prev)}
            }
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default App
