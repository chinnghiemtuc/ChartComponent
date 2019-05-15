import React, { Component } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import moment from 'moment'
import { Select, DatePicker, Row, Col } from 'antd'
import { AgGridReact } from 'ag-grid-react'
// import HelloWorld from './ChartComponent'

const { RangePicker } = DatePicker

const mockData = [
	{
		testName: 'ADN test normal',
		price: 10000,
		start: 1557308405783,
		end: 1557481205783
	},
	{
		testName: 'echocardiography',
		price: 100000,
		start: 1557394805783,
		end: 1557481205783
	},
	{
		testName: 'ADN test',
		price: 10000,
		start: 1557394805783,
		end: 1557481205783
	},
	{
		testName: 'skin allergy test',
		price: 140000,
		start: 1557481205783,
		end: 1557481205783
	},
	{
		testName: 'ADN test normal',
		price: 20000,
		start: 1557481205783,
		end: 1557481205783
	},
	{
		testName: 'Genetic testing',
		price: 110000,
		start: 1557308405783,
		end: 1557481205783
	},
	{
		testName: 'Genetic testing',
		price: 60000,
		start: 1557481205783,
		end: 1557481205783
	},
	{
		testName: 'coloscopy',
		price: 100000,
		start: 1557481205783,
		end: 1557481205783
	},
	{
		testName: 'ADN test normal',
		price: 70000,
		start: 1557481205783,
		end: 1557481205783
	},
	{
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

	convertBarData = (type, dataInput) => {
		let chartData = { labels: [], datasets: [] }
		let { datasets } = chartData

		const daysCount = moment().daysInMonth() // 31
		const days = [...Array(daysCount).keys()]

		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		]

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

		const labelsInput = type === 'M' ? months : days

		dataInput.map(item => {
			const testName = this.uppercaseFristLetter(item.testName)
			// const testName = item.testName
			const price = item.price
			const start = moment(item.start).format(type) - 1
			const end = moment(item.end).format(type) - 1
			// console.log(
			// 	'startTime',
			// 	moment(item.start).format('DD/MMMM/YYYY hh:mm:ss')
			// )
			// console.log('endTime', moment(item.start).format('DD/MMMM/YYYY hh:mm:ss'))
			// console.log(start, end)
			for (let i = 0; i < labelsInput.length; i++) {
				const compare = datasets.some(item => item.label === testName)
				if (compare) {
					const compareArray = datasets.filter(item => item.label === testName)
					if (compareArray[0].data.length === labelsInput.length) {
						if (i >= start && i <= end) {
							// console.log('G', i, price)
							compareArray[0].data[i] += price
							// console.log('GA', i, compareArray[0].data[i])
						}
					} else {
						if (i >= start && i <= end) {
							// console.log('C', i, price)
							compareArray[0].data.push(price)
						} else {
							// console.log('D', i, 0)
							compareArray[0].data.push(0)
						}
					}
				} else {
					datasets.push({
						label: testName,
						backgroundColor: colors[datasets.length],
						// backgroundColor: colors,
						data: []
					})
					const compareArray = datasets.filter(item => item.label === testName)
					if (i >= start && i <= end) {
						// console.log('A', i, price)
						compareArray[0].data.push(price)
					} else {
						// console.log('B', i, 0)
						compareArray[0].data.push(0)
					}
				}
			}
			// console.log(datasets)
			return item
		})

		chartData.labels = labelsInput
		// labels.push(labelsInput)

		// console.log(chartData)

		this.setState({
			barData: chartData
		})
	}

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

			// console.log('C', index, exist)

			if (exist > -1) {
				// console.log(chartData.datasets[0].data[exist])
				chartData.datasets[0].data[exist] += price
				// console.log('A', index, exist)
				// console.log(pieRowData[exist])
				const duplicate = pieRowData[exist]
				if (start < duplicate.start) {
					pieRowData[exist].start = start
				}
				if (end > duplicate.end) {
					pieRowData[exist].end = end
				}
			} else {
				chartData.labels.push(testName)
				chartData.datasets[0].data.push(price)
				pieRowData.push(item)
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
			rowData: pieRowData
		})
	}

	componentWillMount() {
		setTimeout(
			function() {
				this.convertBarData('M', mockData)
				this.convertPieData(mockData)
			}.bind(this),
			2000
		)
		this.setState({
			source: mockData
		})
	}

	onPicker = (date, dateString) => {
		const startInput = +moment(date[0]._d)
		const endInput = +moment(date[1]._d)

		const copyMockData = [...mockData]

		this.convertPieData(copyMockData)
	}

	onGridReady = params => {
		this.gridApi = params.api
		this.gridColumnApi = params.columnApi

		this.gridApi.sizeColumnsToFit()
	}

	render() {
		const { barData, pieData } = this.state
		console.log(this.state.source)
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
					<article style={{ height: '43vh', paddingBottom: '20px' }}>
						<Bar
							ref="chart"
							data={barData.datasets ? barData : {}}
							options={{
								title: {
									display: true,
									text: 'Top 10 referrals by months',
									fontSize: 20
								},
								legend: {
									display: true,
									position: 'right'
								},
								maintainAspectRatio: false, // Don't maintain w/h ratio
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
							height={50}
						/>
					</article>
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
							<article style={{ height: '40vh' }}>
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
							</article>
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
