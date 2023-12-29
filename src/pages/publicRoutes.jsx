import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Register from './register'
import Login from './login'

const PublicRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Register}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route path="*" render={() => <Redirect to="/login" />} />
            </Switch>
        </Router>
    )
}

export default PublicRoutes