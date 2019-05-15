import React from 'react'
import { render } from 'react-dom'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'ag-grid-enterprise'
import 'antd/dist/antd.css'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import LineDemo from './LineDemo'
import Color from './Color'

class App extends React.Component {
	callback(key) {
		console.log(key)
		console.log(this.props)
	}
	render() {
		return (
			<BrowserRouter>
				<Link to="/line">LineDemo</Link>
				<Link to="/color">Color</Link>
				<Switch>
					<Route path="/line" render={() => <LineDemo />} />
					<Route path="/color" render={() => <Color />} />
				</Switch>
			</BrowserRouter>
		)
	}
}

render(<App />, document.getElementById('root'))
