import React from 'react'

import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import AddUser from '../components/adduser'
import Maindrawer from '../components/maindrawer'
import Preview from './preview'


const PrivateRoutes = () => {

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/dashboard" component={Maindrawer}></Route>
                    <Route exact path='/userlist' component={Maindrawer} />
                    <Route exact path='/adduser' component={AddUser} />
                    <Route path='/edituser/:id' component={AddUser} />
                    <Route path='/userlist/:id' component={Preview} />
                    <Route path="*" render={() => <Redirect to="/dashboard" />} />
                </Switch>
            </Router>
        </>
    )
}

export default PrivateRoutes