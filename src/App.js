import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import UserContext from './context/UserContext'
import Navbar from './components/Navbar'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Tasks from './pages/Tasks'

const App = () => {
    const [user, setUser] = useState({
        userId: null,
        name: null,
        token: null
    })
    const login = (userId, name, token) => {
        setUser({
            userId,
            name,
            token
        })
        localStorage.setItem('user', JSON.stringify({
            userId,
            name,
            token
        }))
    }
    const logout = () => {
        setUser({
            userId: null,
            name: null,
            token: null
        })
        localStorage.removeItem('user')
    }
    useEffect(() => {
        fetch('https://taskify-123.herokuapp.com/api')
            .then(res => res.json())
            .then(json => {
                console.log(`Welcome to Taksify!`)
            })
            .catch(err => console.log(err))
        const userData = localStorage.getItem('user')
        if (userData) {
            const user = JSON.parse(userData)
            login(user.userId, user.name, user.token)
        }
    }, [])
    return (
        <BrowserRouter>
            <UserContext.Provider value={{ userId: user.userId, name: user.name, token: user.token, login, logout }}>
                <Navbar />
                <main className="mt-5">
                    <Switch>
                        {!user.token && <Redirect from="/" to="/auth" exact />}
                        {!user.token && <Redirect from="/profile" to="/auth" exact />}
                        {!user.token && <Redirect from="/tasks" to="/auth" exact />}
                        {user.token && <Redirect from="/" to="/tasks" exact />}
                        {user.token && <Redirect from="/auth" to="/tasks" exact />}
                        <Route path="/auth" component={Auth} exact />
                        <Route path="/profile" component={Profile} exact />
                        <Route path="/tasks" component={Tasks} exact />
                        <Redirect from="*" to="/" />
                    </Switch>
                </main>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default App