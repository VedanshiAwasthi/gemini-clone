import { createContext, useState } from "react";
import run from "../config";

export const Context= createContext();

const ContextProvider = (props)=>{

    const [input,setInput]=useState("");
    const [recentPrompt,setRecentPrompt]=useState("");
    const [loading,setLoading]=useState(false);
    const [showResult,setShowResult]=useState(false);
    const [prevPrompt,setPrevPrompt]=useState([]);
    const [resultData,setResultData]=useState("");

    const delayPara=(index,nextWord)=>{
            setTimeout(function (){
                setResultData(prev=>prev+nextWord);
            },75*index);
        }

    const onSent = async (prompt)=>{

        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        
        if(prompt !== undefined){
            response=await run(prompt);
            setRecentPrompt(prompt);
        }

        else
        { setRecentPrompt(input); response = await run(input);  setPrevPrompt(prev=>[...prev,input]);}

        let responseArray = response.split("**");
        let responeString="";

        for(let i=0;i<responseArray.length;i++)
            if(i===0 || i%2 !== 1){
                responeString+=responseArray[i];
            }
            else{
                responeString+="<b>"+responseArray[i]+"</b>";
            }


        let newResponseString=responeString.split("*").join("</br>");
        
        let newResponseArr = newResponseString.split(" ");

        for(let i=0;i<newResponseArr.length;i++)
            delayPara(i,newResponseArr[i]+" ");

        setLoading(false);
        setInput("");
    }

    const contextValue={onSent,input,setInput,recentPrompt,setRecentPrompt,loading,setLoading,prevPrompt,setPrevPrompt,showResult,setShowResult,resultData,setResultData};

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;