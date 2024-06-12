import "./sidebar.css"
import React, { useContext, useState } from 'react'
import {assets} from "../assets/assets.js"
import { Context } from "../constext/Context.jsx";

const Sidebar = () => {

  const [extended,setExtended] = useState(false);
  const {onSent , prevPrompt,setLoading,setShowResult,setRecentPrompt} =useContext(Context)

  const check= async(item)=>{
    setRecentPrompt(item);
    await onSent(item);
  }

  const newChat=()=>{
    setLoading(false);
    setShowResult(false);
  }

  return (
    <div className="sidebar">
        <div className="top">
            <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
            <div className="new-chat">
                <img onClick={newChat} src={assets.plus_icon} alt="" />{ extended ? <p>New Chat</p> : null}
                
            </div>

            {extended ?
            <div className="recent">
                <p className="recent-title">Recent</p>

                {
                    prevPrompt.map((i,index)=> {
                        return <div key={index} className="recent-entry" onClick={()=>{check(i)}}>
                        <img src={assets.message_icon} alt="" />
                        <p>{i.slice(0,18)}...</p>   
                        </div>
                    })
                }
                
            </div> : null}

        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />{extended ?<p>Help</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />{extended ?<p>Activity</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />{extended ?<p>Settings</p>:null}
            </div>
        </div>
    </div>
  )
}

export default Sidebar