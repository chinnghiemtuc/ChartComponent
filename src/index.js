import React from 'react'
import { render } from 'react-dom'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'ag-grid-enterprise'
import 'antd/dist/antd.css'

import LineDemo from './LineDemo'

class App extends React.Component {
	render() {
		return <LineDemo />
	}
}

render(<App />, document.getElementById('root'))
