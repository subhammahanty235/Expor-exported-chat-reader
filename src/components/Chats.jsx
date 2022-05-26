import React, { useEffect, useState } from "react";
import './chats.css'
import user from '../images/userimg.png'
import { useLocation } from "react-router-dom";
const Chats = () => {
    // getting the states 
    const location = useLocation()
    const { self, textData ,reciever } = location.state;
    const authorsArr = [];
    
    // decoding the array to get all required values
   
    const decode = (l)=>{
        const firstPortion = l.indexOf(' - ');
        const secondPortion = l.indexOf(': ');
        let dateAndTime = l.substring(0 , firstPortion);
        let author = l.substring(firstPortion+3 , secondPortion);
        let message = l.substring(secondPortion+2);
        message = removeSplTags(message)
        // author.push(author)
        
        if(l.substring(firstPortion).indexOf(":")<0){
            author = "NONE";
            message = l.substring(firstPortion+3);
        }
        if(authorsArr.length === 0 && author != 'NONE' && authorsArr.includes(author)===false ){
            authorsArr.push(author)
        }

        //iterting over the authorsarr and finding reciever's name
        // for(let i =0;i<authorsArr.length;i++){
        //     if(authorsArr[i]===self){
        //         continue
        //     }
        //     else{
        //         setreciever(authorsArr[i]);
        //         console.log("passes"+i)
        //         break
        //     }
        // }
        
        return {dateAndTime ,author , message};
    }
    const removeSplTags = (text)=>{
        while(text.indexOf('<')>=0 || text.indexOf('>')>=0){
            text = text.replace('<','');
            text = text.replace('>','');
        }
        return text;
    }
    useEffect(()=>{
        console.log(reciever)
    },[])
    return (
        <div className="chats">
        <div className="bgimg">

        </div>
      
        <div className="maindiv ">
            <header className="d-flex justify-content-between">
                <div className="recieverdtls d-flex">
                    <img src={user} alt="dp" style={{width:"50px"}} />
                    <p className="text-center mx-3 my-2">{reciever}</p>
                </div>
                <div className="more d-flex">
                    <p className="mx-2 my-2">📞</p>
                    <p className="mx-2 my-2">📽️</p>
                    <p className="mx-2 my-2">❗</p>
                </div>
            </header>
            
            
            <section>
                {/* <p>chats</p> */}
                {
                    textData.map((line)=>{
                        const {dateAndTime ,author ,message} = decode(line);
                        // message = removeSplTags(message);
                       
                        if(message == "Media omitted"){
                            return <span style={{color:"red" , fontSize:'0.7rem',backgroundColor:"transparent"}}>Media Image</span>
                            
                        }
                        if(author == 'NONE'){
                            return (<div className="othermsg" >{message}</div>)
                        }
                        else if(author === self){
                            return (<>
                                <div className="sender">
                                    <div className="message">
                                        <p className="messagetxt">{message}</p>
                                        <span>{dateAndTime}</span>
                                    </div>
                                </div>
                            </>)
                        }
                        else{
                            return (<>
                                <div className="reciever">
                                    <div className="message">
                                        <p className="messagetxt">{message}</p>
                                        <span>${dateAndTime}</span>
                                    </div>
                                </div>
                            </>)
                        }
                        
                    })
                }
            </section>
        </div>
        </div>
    )
}

export default Chats