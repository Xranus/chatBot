
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import './App.css'
import { useState, useRef } from 'react'
import TextArea from './components/TextArea'


function App() {

  const [message, setMessage] = useState([])  
  const [prompt, setPrompt] = useState('')
  const cRef = useRef(null)
  const hRef = useRef(null)
  async function generateResponse() {
    cRef.current.style = 'display: flex'
    hRef.current.style = 'margin: 2rem'
    setMessage([
      ...message,
      { type: "userMsg", text: prompt },
    ])
    
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.API_KEY}`,
      method: `post`,
      data: {
        "contents": [ 
          {"parts":[{"text":`${prompt}. Answer in maximum of 50 words`}]}
        ]
      }
    })
    setMessage((prev)=>[
      ...prev,
      { type: "responseMsg", text: response.data.candidates[0].content.parts[0].text }
    ])
    setPrompt('')
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
        </div>
        <TextArea onChange={(e)=>{setPrompt(e.target.value)}} onClick={generateResponse} value={prompt}/>
      </div>
    </>
  )
}

export default App
