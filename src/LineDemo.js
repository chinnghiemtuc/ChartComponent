import React, { Component } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import moment from 'moment'
import { Select, DatePicker, Row, Col } from 'antd'
import { AgGridReact } from 'ag-grid-react'
import { BarChartComponent, PieChartComponent } from './ChartComponent'

const { RangePicker } = DatePicker

const mockData = [
	{
		customer: 'Chin',
		age: 25,
		testName: 'ADN test normal',
		price: 10000,
		start: 1557308405783,
		end: 1557481205783
	},
	{
		customer: 'Hung',
		age: 24,
		testName: 'echocardiography',
		price: 100000,
		start: 1557394805783,
		end: 1557481205783
	},
	{
		customer: 'Phong',
		age: 24,
		testName: 'ADN test',
		price: 10000,

		start: 1557394805783,
		end: 1557481205783
	},
	{
		customer: 'Tam',
		age: 24,
		testName: 'skin allergy test',
		price: 140000,
		start: 1557481205783,
		end: 1557481205783
	},
	{
		customer: 'Toan',
		age: 20,
		testName: 'ADN test normal',
		price: 20000,
		start: 1557481205783,
		end: 1557481205783
	},
	{
		customer: 'Hoan',
		age: 22,
		testName: 'Genetic testing',
		price: 110000,
		start: 1557308405783,
		end: 1557481205783
	},
	{
		customer: 'Trung',
		age: 30,
		testName: 'Genetic testing',
		price: 60000,
		start: 1557481205783,
		end: 1557481205783
	},
	{
		customer: 'Hang',
		age: 25,
		testName: 'coloscopy',
		price: 100000,
		start: 1557481205783,
		end: 1557481205783
	},
	{
		customer: 'Quynh',
		age: 22,
		testName: 'ADN test normal',
		price: 70000,
		start: 1557481205783,
		end: 1557481205783
	},
	{
		customer: 'Ngoc',
		age: 25,
		testName: 'coloscopy',
		price: 100000,
		start: 1557394805783,
		end: 1557481205783
	}
]

export default class LineDemo extends Component {
	state = {
		barData: [],
		pieData: [],
		columnDefs: [
			{
				headerName: 'testName',
				field: 'testName'
			},
			{
				headerName: 'price',
				field: 'price'
			},
			{
				headerName: 'start',
				field: 'start'
			},
			{
				headerName: 'end',
				field: 'end'
			}
		],
		defaultColDef: {
			sortable: true,
			filter: true,
			resizable: true
		},
		rowData: null
	}

	componentWillMount() {
		this.setState({
			barData: mockData,
			pieData: mockData
		})
		this.load(mockData)
	}

	load = data => {
		// data.map((item, index) => {
		// 	const testName = uppercaseFristLetter(item[label])
		// 	const price = item[dataset]
		// 	const start = item.start
		// 	const end = item.end
		// 	// const compare = chartData.labels.some(item => item === testName)
		// 	// console.log('B', index)
		// 	const exist = chartData.labels.indexOf(testName)
		// 	// console.log('C', index, exist)
		// 	if (exist > -1) {
		// 		// console.log(chartData.datasets[0].data[exist])
		// 		chartData.datasets[0].data[exist] += price
		// 		// console.log('A', index, exist)
		// 		// console.log(pieRowData[exist])
		// 		const duplicate = pieRowData[exist]
		// 		if (start < duplicate.start) {
		// 			pieRowData[exist].start = start
		// 		}
		// 		if (end > duplicate.end) {
		// 			pieRowData[exist].end = end
		// 		}
		// 	} else {
		// 		chartData.labels.push(testName)
		// 		chartData.datasets[0].data.push(price)
		// 		pieRowData.push(item)
		// 	}
		// 	return item
		// })
	}

	onPicker = (date, dateString) => {
		const startInput = +moment(date[0]._d)
		const endInput = +moment(date[1]._d)

		this.setState({
			pieData: mockData
		})
	}

	onGridReady = params => {
		this.gridApi = params.api
		this.gridColumnApi = params.columnApi

		this.gridApi.sizeColumnsToFit()
	}

	render() {
		const { barData, pieData } = this.state
		return (
			<div
				style={{
					backgroundColor: '#ff4d4f',
					height: '100vh',
					padding: '20px',
					overflow: 'auto'
				}}
			>
				<div
					style={{
						padding: '20px',
						marginBottom: '20px',
						backgroundColor: '#ffffff'
					}}
				>
					{/* Bar */}
					<BarChartComponent
						data={barData}
						options={{
							label: 'testName',
							dataset: 'price',
							// type: 'D',
							title: 'Top 10 referrals by months',
							scales: {
								yAxes: [
									{
										ticks: {
											callback: function(label, index, labels) {
												return label / 1000 + 'k'
											}
										},
										scaleLabel: {
											display: true,
											labelString: '1k = 1000'
										}
									}
								]
							}
						}}
					/>
				</div>
				<Row>
					<Col span={8}>
						<div
							style={{
								padding: '20px',
								marginRight: '20px',
								backgroundColor: '#ffffff',
								minHeight: '47vh'
							}}
						>
							{/* RangePicker */}
							<RangePicker onChange={this.onPicker} style={{ float: 'left' }} />
							{/* Pie */}
							<PieChartComponent
								data={pieData}
								options={{
									label: 'testName',
									dataset: 'price',
									title: 'Top 10 referrals'
								}}
							/>
						</div>
					</Col>
					<Col span={16}>
						{/* Ag-grid */}
						<div
							className="ag-theme-balham"
							style={{
								height: '47vh',
								width: '100%'
							}}
						>
							<AgGridReact
								columnDefs={this.state.columnDefs}
								rowData={this.state.rowData}
								defaultColDef={this.state.defaultColDef}
								onGridReady={this.onGridReady}
							/>
						</div>
					</Col>
				</Row>
				<div />
			</div>
		)
	}
}
