import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'; 
import './header.css'
import {
    Home,
    HomeOutlined,
    Add,
    AddOutlined,
    SearchOutlined,
    Search,
    AccountCircleOutlined,
    AccountCircle,
}
    from '@mui/icons-material'

const Header = () => {
    const [tab, setTab] = useState(window.location.pathname)
    return (
        <div className='header'>
            <RouterLink to='/home' onClick={() => setTab('/home')}>
                {tab === '/home' ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
            </RouterLink>
            <RouterLink to='/newPost' onClick={() => setTab('/newPost')}>
                {tab === '/newPost' ? <Add style={{ color: "black" }} /> : <AddOutlined />}
            </RouterLink>
            <RouterLink to='/find-friends' onClick={() => setTab('/find-friends')}>
                {tab === '/find-friends' ? <Search style={{ color: "black" }} /> : <SearchOutlined />}
            </RouterLink>
            <RouterLink to='/account' onClick={() => setTab('/account')}>
                {tab === '/account' ? <AccountCircle style={{ color: "black" }} /> : <AccountCircleOutlined />}
            </RouterLink>
        </div>
    )
}

export default Header
