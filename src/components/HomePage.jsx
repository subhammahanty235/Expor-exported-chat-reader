import React, { useState } from "react";
import image1 from "../images/image1.svg"
// import Chats from "./Chats";
import {Link} from 'react-router-dom'
const HomePage  = ()=>{
    let authorsArr = []
    let ta =[]
    const [textdata , settextData] = useState(ta)
    const [submited ,setSubmited] = useState(false)
    // const [textData , setTextData] = useState([])
    const loadfile = (e)=>{
        e.preventDefault()
        const fileReader = new FileReader()
        fileReader.onload = (e)=>{
            const text = (e.target.result)
            
            const fileArray = text.split("\n")
            
            textDecode(fileArray)
            setSubmited(true)

        }
        fileReader.readAsText(e.target.files[0])
    }
    
    const [authors , setauthors] = useState(authorsArr)
    const textDecode = (fileArray)=>{
        for(let sen of fileArray){ //itering over the sentences or words
            // textdata.push(sen)  // this array will be sent to chats to directlly access the text array 
            // textt.push(sen)

            let firstPostion = sen.indexOf(' - ');
            let secondPortion = sen.indexOf(': ');
            let author = sen.substring(firstPostion+3 , secondPortion)
            // authorsArr.push(author)
            if(sen.substring(firstPostion).indexOf(':')<0){
                author= 'None'
                
            }
            if(authorsArr.length === 0 && author != 'None' ){
                authorsArr.push(author)
            }
            else if(author != 'None'){
                let newauthor = true;
                for (let a of authorsArr){
                    if ( a == author){
                        newauthor = false;
                        break;
                    }
                }
                if(newauthor === true){
                    authorsArr.push(author)
                }

            }
            ta.push(sen)
        }

        // console.log(authorsArr)
        // console.log(textdata)
    }
    const [clicked , setClicked] = useState(false)
    const showAuthors =async()=>{
       console.log(authors.length)
       setClicked(true)
        // console.log(file.length)
    }
    // to set the user's name or the sender's name 
    const [self , setself] = useState()
    const [rec , setRec] = useState()
    const selectSelf =async (myname)=>{
        // console.log(myname)
        setself(myname)
        authors.map((a)=>{
            if(a!=myname){
               
                setRec(a);
                console.log(rec)
            }

        })
        // console.log(self)
        // console.log(textdata)
    }
    return(
        <>
            <div className=" container cont1">
                <div className='minicont1'>
                    <img src={image1} alt="" style={{width:"100%" ,height:"100%"}} />
                </div>
                <div className="minicont2" >
                    <div className="inputArea">
                        <p className="text-center">Choose a Exported File</p>
                        <hr />
                        <input type="file" onChange={(e)=>{loadfile(e)}} />
                        <button className={`btn btn-outline-success mx-3 my-3 ${submited===false ? 'd-none':''}`} onClick={showAuthors}>Click to Render</button>
                        <hr />

                        <h5 className={`text-center ${clicked===false?'d-none':''}`}>Your Contacts {authors.length}</h5>
                        <p className={`text-center ${clicked===false?'d-none':''}`}>*Select who's the sender</p>
                        <div className={`container text-center my-0 ${clicked===false ?'d-none':''}`}>
                            {authors.map((authorName)=>{
                                return <>
                                {/* <button className="authorBox">{authorName}</button> <br/> */}
                                <button className="btn btn-outline-primary my-2" onClick={()=>{selectSelf(authorName)}}>{authorName}</button><br/>
                                </>
                            })}
                        </div>
                            <Link className={`btn btn-outline-success ${self != null ? "":'d-none' }`} to='/convertedchat' state={{self:self , textData:textdata ,reciever: rec}}>Let's Decode</Link>
                    </div>
                    
                </div>
            </div>
         
        </>
    )
}

export default HomePage;