import React, { useState } from 'react'
import '../CSS/home.css'
import logo from '../Images/home/chiplet_logo.png'
import { Link } from 'react-router-dom'
import { getAuth,onAuthStateChanged } from 'firebase/auth'



export default function NavbarMain() {
    const auth = getAuth()
    const [login,getLogin] = useState(false)
    const userId = auth?.currentUser?.uid
    const userImg = auth?.currentUser?.photoURL


    onAuthStateChanged(auth,(user)=>{
      if(user){
        getLogin(true)
      }
      else
      {
        getLogin(false)
      }
    })

    return (
        <>
            <nav className="navbar navbar-main bg-light">
                <div className="container-fluid nav-container">
                    <ul className='nav-links'>
                        <Link to='/shop' className='nav-list-item'>Shop</Link>
                        <Link to='/collection' className='nav-list-item'>Colection</Link>
                        <li className='nav-list-item'>Premium</li>
                        <li className='nav-list-item'>About</li>

                    </ul>
                    <Link to='/' className="navbar-brand">
                        <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top logo"/>
                    </Link>
                    <div className='user-nav'>
                        {
                         login? 
                         <div className='user'>
                         <ul className='user-list'>
                            <li className='user-list-item'><img className='user-image' src={userImg} alt='user'></img></li>
                            <li className='user-list-item'>Cart</li>
                            <Link to={`/user/${userId}`} className='user-list-item'>Profile</Link>
                         </ul>
                         </div>             
                         : <Link to='/login' className='nav-list-item'>Login</Link>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
