import React from "react"
import { Router, Route, Link } from 'react-router'

import layout from './pages/layout/'


class App extends React.Component {
	render() {
		return(
			<Router>
				<Route path="/" component={layout}></Route>
			</Router>
			)
	}
}


export default App;