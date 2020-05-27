import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import UserContext from './context/UserContext'
import Auth from './components/Auth'
import Profile from './components/Profile'
import Tasks from './components/Tasks'

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
    return (
        <BrowserRouter>
            <UserContext.Provider value={{ userId: user.userId, name: user.name, token: user.token, login, logout }}>
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