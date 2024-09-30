
import ReactLoading from 'react-loading'
import 'aos/dist/aos.css'
import axios from 'axios'
import './App.css'
import { useState, useRef, useEffect } from 'react'
import TextArea from './components/TextArea'


function App() {
  const [message, setMessage] = useState([])  
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const cRef = useRef(null)
  const hRef = useRef(null)
  const inputRef = useRef(null)
  useEffect(()=>{
    inputRef.current.focus()
  },[])
  async function generateResponse() {
    if (!prompt.trim()) return
    cRef.current.style = 'display: flex'
    
    hRef.current.style = 'margin: 2rem'
    setMessage([
      ...message,
      { type: "userMsg", text: prompt },
    ])
    const userMsg = prompt
    setPrompt('')
    setLoading(true)
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.API_KEY}`,
      method: `post`,
      data: {
        "contents": [ 
          {"parts":[{"text":`${userMsg}. Answer in maximum of 50 words`}]}
        ]
      }
    })
    setLoading(false)
    setMessage((prev)=>[
      ...prev,
      { type: "responseMsg", text: response.data.candidates[0].content.parts[0].text }
    ])
    
  }
  useEffect(()=>{
    if(cRef.current)
    cRef.current.scrollTop = cRef.current.scrollHeight
  }, [message])
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      generateResponse()
    }
  }


  return (
    <>
      <div>
        <div className='heading' ref={hRef} >
          <h1>Chat AI</h1>
        </div>
        <div className="container" ref={cRef} >
        {
          message.map((msg, index) => {
            return (
              <div key={index} className={msg.type} >{msg.text}</div>
            )
          })
        }
        {
          loading && (<ReactLoading type={'bubbles'} color={'grey'} height={'10%'} width={'10%'}  className='loading  ' />)
        }
        </div>
        <TextArea onChange={(e)=>{setPrompt(e.target.value)}} onClick={generateResponse} value={prompt} rref={inputRef} onKeyDown={handleKeyPress}/>
      </div>
    </>
  )
}

export default App
