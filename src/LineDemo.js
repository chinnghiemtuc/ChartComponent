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

	uppercaseFristLetter = item => item.charAt(0).toUpperCase() + item.slice(1)

	convertPieData = dataInput => {
		let chartData = {
			labels: [],
			datasets: [
				{
					data: [],
					backgroundColor: []
				}
			]
		}

		let pieRowData = []

		const colors = [
			'rgba(235, 59, 90, 0.6)',
			'rgba(250, 130, 49, 0.6)',
			'rgba(247, 183, 49, 0.6)',
			'rgba(32, 191, 107, 0.6)',
			'rgba(15, 185, 177, 0.6)',
			'rgba(45, 152, 218, 0.6)',
			'rgba(56, 103, 214, 0.6)',
			'rgba(136, 84, 208, 0.6)',
			'rgba(165, 177, 194, 0.6)',
			'rgba(75, 101, 132, 0.6)'
		]

		// console.log(dataInput)

		dataInput.map((item, index) => {
			const testName = this.uppercaseFristLetter(item.testName)
			const price = item.price
			const start = item.start
			const end = item.end

			// const compare = chartData.labels.some(item => item === testName)

			// console.log('B', index)

			const exist = chartData.labels.indexOf(testName)

			console.log('C', index, exist)
			// Ag-grid test
			// pieRowData.push(item)

			if (exist > -1) {
				console.log('A', testName, chartData.datasets[0].data[exist], price)
				chartData.datasets[0].data[exist] += price
				console.log('B', chartData.datasets[0].data[exist])
				// console.log(pieRowData[exist])

				// Ag-grid
				const duplicate = pieRowData[exist]
				if (duplicate) {
					if (price > 0) {
						duplicate.price += price
					}
					// if (start < duplicate.start) {
					// duplicate.start = start
					// }
					// if (end > duplicate.end) {
					// duplicate.end = end
					// }
				}
			} else {
				chartData.labels.push(testName)
				chartData.datasets[0].data.push(price)
				// Ag-grid
				// pieRowData.push(item)
			}
			return item
		})

		chartData.datasets[0].backgroundColor = colors

		// console.log('C', chartData)
		// console.log('D', pieRowData)

		pieRowData = pieRowData.map(item => ({
			testName: item.testName,
			price: item.price,
			start: moment(item.start).format('DD/MM/YYYY'),
			end: moment(item.end).format('DD/MM/YYYY')
		}))

		this.setState({
			pieData: chartData,
			rowData: dataInput
		})
	}

	componentWillMount() {
		// setTimeout(
		// 	function() {
		// 		// this.convertBarData('M', mockData)
		// 		this.convertPieData(mockData)
		// 	}.bind(this),
		// 	2000
		// )
		this.setState({
			source: mockData
		})
		// this.convertPieData(mockData)
	}

	// onPicker = (date, dateString) => {
	// 	const startInput = +moment(date[0]._d)
	// 	const endInput = +moment(date[1]._d)

	// 	const copyMockData = [...mockData]

	// 	this.convertPieData(copyMockData)
	// }

	onGridReady = params => {
		this.gridApi = params.api
		this.gridColumnApi = params.columnApi

		this.gridApi.sizeColumnsToFit()
	}

	render() {
		const { barData, pieData } = this.state
		// console.log(this.state.source)
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
						data={this.state.source}
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
							{/* <RangePicker onChange={this.onPicker} style={{ float: 'left' }} /> */}
							<PieChartComponent
								data={this.state.source}
								options={{
									label: 'testName',
									dataset: 'price',
									title: 'Top 10 referrals'
								}}
							/>
							{/* Pie */}
							{/* <article style={{ height: '40vh' }}>
								<Pie
									data={pieData.datasets ? pieData : {}}
									options={{
										title: {
											display: true,
											text: 'Top 10 referrals',
											fontSize: 20
										},
										legend: {
											display: false,
											position: 'left'
										},
										maintainAspectRatio: false // Don't maintain w/h ratio
									}}
									height={50}
								/>
							</article> */}
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
