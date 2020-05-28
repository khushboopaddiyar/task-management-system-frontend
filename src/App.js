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
    }
    const logout = () => {
        setUser({
            userId: null,
            name: null,
            token: null
        })
    }
    useEffect(() => {
        fetch('https://taskify-123.herokuapp.com/api')
            .then(res => res.json())
            .then(json => {
                console.log(`Welcome to Taksify!`)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <BrowserRouter>
            <UserContext.Provider value={{ userId: user.userId, name: user.name, token: user.token, login, logout }}>
                <Navbar />
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
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default App