import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client'

import './Main.css'
import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import api from '../services/api';

export default function Main({match}){
    const [users, setUsers] = useState([])
    useEffect(()=> {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            })
            
            setUsers(response.data)
        }

        loadUsers()
    }, [match.params.id])

    const [value, setValue] = useState([])
    useEffect(()=> {
        async function loadUsers(){
            const response = await api.get('/matchs', {
                headers: {
                    user: match.params.id,
                }
            })

            setValue(response.data)
        }

        loadUsers()


    },[match.params.id])



    const [info, setInfo] = useState([])
    useEffect(()=> {
        async function loadUsers(){
            const response = await api.get('/info', {
                headers: {
                    user: match.params.id,
                }
            })
            
            setInfo(response.data)
        }

        loadUsers()



    },[match.params.id])
    



    async function handleLike(id){
        await api.post(`devs/${id}/likes`, null, {
            headers: { user: match.params.id}
        })
        setUsers(users.filter(user => user._id !== id))
    }
    async function handleDislike(id){
        await api.post(`devs/${id}/dislikes`, null, {
            headers: { user: match.params.id}
        })
        setUsers(users.filter(user => user._id !== id))
    }
    return(
        <div className="global"> 
            <div className="matchs-container">
                {info.map(match =>(<div key={match._id} > 
                
                <img src={match.avatar} className="avatar-img" alt=""/>
                <footer className="txt-match">Seus Matchs: {match.name} </footer>
                
                
                
              
                </div>
                ))}
                
                
                
                
                <ul>
                {value.map(match =>(
                <li key={match._id}>
                <img src={match.avatar} alt="" />
                <footer>
                    <strong>{match.name}</strong>
                </footer>
                
            </li>
            ))}

                </ul>



            </div>
        <div className="main-container">
            <Link to="/">
                 <img src={logo} alt="TinDev"/>
            </Link>
                { users.length > 0 ? (
                    <ul>
                       {users.map(user =>(
                <li key={user._id}>
                <img src={user.avatar} alt="" />
                <footer>
                    <strong>{user.name}</strong>
                    <p>{user.bio}</p>
                </footer>
                <div className="buttons">
                    <button className="dislike" type="button" onClick={()=>handleDislike(user._id)}>
                        <img src={dislike} alt="dislike"/>
                    </button>
                    <button className="like"  type="button" onClick={()=>handleLike(user._id)}>
                        <img src={like} alt="Like"/>
                    </button>
                </div>
            </li>
            ))}  

                    </ul>
                ): (
                    <div className="empty">Acabou :(</div>
                )}
            
            
        
            
        </div>
        </div>
    )
    
}

