import * as React from 'react';
import { HashRouter,Switch } from 'react-router-dom';
import { FrontendAuth } from './frontendAuth';
import { routerConfig } from './routerConfig'

class Router extends React.Component {
    render () {
return  <HashRouter>
            <Switch>
                <FrontendAuth config={routerConfig}></FrontendAuth>
            </Switch>
        </HashRouter>
    }
}

export default Router;
