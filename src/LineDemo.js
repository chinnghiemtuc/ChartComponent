import React, { Component } from 'react'
import { Row, Col } from 'antd'
import moment from 'moment'

import {
	BarChartComponent,
	PieChartComponent,
	PieChartToAgGrid,
} from './ChartComponent'

const colors = [
	'rgba(13, 71, 161, 0.6)',
	'rgba(63, 81, 181, 0.6)',
	'rgba(33, 150, 243, 0.6)',
	'rgba(0, 188, 212, 0.6)',
	'rgba(0, 150, 136, 0.6)',
	'rgba(76, 175, 80, 0.6)',
	'rgba(102, 187, 106, 0.6)',
	'rgba(76, 175, 80, 0.6)',
]

const mockData = [
	{
		customer: 'Chin',
		age: 25,
		testName: 'ADN test normal',
		price: 10000,
		start: 1557308405783,
		end: 1557481205783,
	},
	{
		customer: 'Hung',
		age: 24,
		testName: 'echocardiography',
		price: 100000,
		start: 1557394805783,
		end: 1557481205783,
	},
	{
		customer: 'Phong',
		age: 24,
		testName: 'ADN test',
		price: 10000,
		start: 1557394805783,
		end: 1557481205783,
	},
	{
		customer: 'Tin',
		age: 23,
		testName: 'ADN test',
		price: 10000,
		start: 1557394805783,
		end: 1557481205783,
	},
	{
		customer: 'Dien',
		age: 22,
		testName: 'ADN test',
		price: 120000,
		start: 1557394805783,
		end: 1557481205783,
	},
	{
		customer: 'Son',
		age: 28,
		testName: 'ADN test',
		price: 90000,
		start: 1557394805783,
		end: 1557481205783,
	},
	{
		customer: 'Tam',
		age: 24,
		testName: 'skin allergy test',
		price: 140000,
		start: 1557481205783,
		end: 1557481205783,
	},
	{
		customer: 'Toan',
		age: 20,
		testName: 'ADN test normal',
		price: 20000,
		start: 1557481205783,
		end: 1557481205783,
	},
	{
		customer: 'Hoan',
		age: 22,
		testName: 'Genetic testing',
		price: 110000,
		start: 1557308405783,
		end: 1557481205783,
	},
	{
		customer: 'Trung',
		age: 30,
		testName: 'Genetic testing',
		price: 60000,
		start: 1557481205783,
		end: 1557481205783,
	},
	{
		customer: 'Hang',
		age: 25,
		testName: 'coloscopy',
		price: 100000,
		start: 1557481205783,
		end: 1557481205783,
	},
	{
		customer: 'Quynh',
		age: 22,
		testName: 'ADN test normal',
		price: 70000,
		start: 1557481205783,
		end: 1557481205783,
	},
	{
		customer: 'Ngoc',
		age: 25,
		testName: 'coloscopy',
		price: 100000,
		start: 1557394805783,
		end: 1557481205783,
	},
	{
		customer: 'Han',
		age: 22,
		testName: 'coloscopy',
		price: 600000,
		start: 1557394805783,
		end: 1557481205783,
	},
	{
		customer: 'TuAnh',
		age: 26,
		testName: 'coloscopy',
		price: 900000,
		start: 1557394805783,
		end: 1557481205783,
	},
]

export default class LineDemo extends Component {
	state = {
		barData: [],
		pieData: [],
	}

	componentWillMount() {
		this.setState({
			barData: mockData,
			pieData: mockData,
			aggridData: mockData,
		})
	}

	handleChange = value => {
		console.log(value)

		let start
		let end

		const now = +moment()
		const startOfDay = +moment().startOf('day')
		const startOfWeek = +moment().startOf('week')
		const startOfMonth = +moment().startOf('month')
		const threeMonths = +moment().subtract(3, 'months')
		const startOf3Months = +moment(threeMonths).startOf('month')
		const sixMonths = +moment().subtract(6, 'months')
		const startOf6Months = +moment(sixMonths).startOf('month')
		const startOfYear = +moment().startOf('year')

		const startArray = [
			startOfDay,
			startOfWeek,
			startOfMonth,
			startOf3Months,
			startOf6Months,
			startOfYear,
		]

		start = startArray[value]
		end = now

		let copyMockData = [...mockData]

		copyMockData = copyMockData.filter(
			item => item.start >= start && item.end <= end
		)

		this.setState({
			pieData: copyMockData,
		})
	}

	onGridReady = params => {
		this.gridApi = params.api
		this.gridColumnApi = params.columnApi

		this.gridApi.sizeColumnsToFit()
	}

	render() {
		const { barData, pieData, aggridData } = this.state
		return (
			<div
				style={{
					backgroundColor: '#ff4d4f',
					height: '100vh',
					padding: '20px',
					overflow: 'auto',
				}}>
				<div
					style={{
						height: '46.8vh',
						padding: '20px',
						marginBottom: '20px',
						backgroundColor: '#ffffff',
					}}>
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
											callback: (label, index, labels) => label / 1000 + 'k',
										},
										scaleLabel: {
											display: false,
											labelString: '1k = 1000',
										},
									},
								],
							},
						}}
						colors={colors}
					/>
				</div>
				<Row>
					<Col span={7}>
						<div
							style={{
								height: '46.8vh',
								padding: '20px',
								marginRight: '20px',
								backgroundColor: '#ffffff',
							}}>
							{/* Pie */}
							<PieChartComponent
								data={pieData}
								options={{
									label: 'testName',
									dataset: 'price',
									title: 'Top 10 referrals',
								}}
								colors={colors}
								handleChange={this.handleChange}
							/>
						</div>
					</Col>
					<Col span={17}>
						<div
							style={{
								height: '46.8vh',
								padding: '20px',
								backgroundColor: '#ffffff',
							}}>
							{/* Ag-grid */}
							<PieChartToAgGrid
								data={aggridData}
								options={{
									label: 'testName',
									dataset: 'price',
									defaultColDef: {
										sortable: true,
										filter: true,
										resizable: true,
									},
									columnDefs: [
										{
											headerName: 'Test Name',
											field: 'testName',
											cellRenderer: params =>
												params.value.charAt(0).toUpperCase() +
												params.value.slice(1),
										},
										{
											headerName: 'Price',
											field: 'price',
										},
										{
											headerName: 'Start',
											field: 'start',
											cellRenderer: params =>
												moment(params.value).format('DD/MM/YYYY'),
										},
										{
											headerName: 'End',
											field: 'end',
											cellRenderer: params =>
												moment(params.value).format('DD/MM/YYYY'),
										},
									],
								}}
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
