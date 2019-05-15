import React, { Component } from 'react'
import moment from 'moment'
import { Select, DatePicker, Row, Col, Typography } from 'antd'

import {
	BarChartComponent,
	PieChartComponent,
	PieChartToAgGrid
} from './ChartComponent'

const { Option } = Select
const { Title } = Typography

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
		pieData: []
	}

	componentWillMount() {
		this.setState({
			barData: mockData,
			pieData: mockData,
			aggridData: mockData
		})
		// this.load(mockData)
	}

	handleChange = value => {
		console.log(value)

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
		const { barData, pieData, aggridData } = this.state
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
					<Col span={7}>
						<div
							style={{
								padding: '20px',
								marginRight: '20px',
								backgroundColor: '#ffffff',
								minHeight: '47vh'
							}}
						>
							{/* Select */}
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Title level={4} type="secondary">
									Top 10 referrals
								</Title>
								<Select
									defaultValue="Today"
									style={{ width: 120, float: 'right' }}
									onChange={this.handleChange}
								>
									<Option value="Today">Today</Option>
									<Option value="This week">This week</Option>
									<Option value="1 month">1 month</Option>
									<Option value="3 months">3 months</Option>
									<Option value="6 months">6 months</Option>
									<Option value="YTD">YTD</Option>
								</Select>
							</div>

							{/* Pie */}
							<PieChartComponent
								data={pieData}
								options={{
									label: 'testName',
									dataset: 'price'
									// title: 'Top 10 referrals'
								}}
							/>
						</div>
					</Col>
					<Col span={17}>
						{/* Ag-grid */}
						<PieChartToAgGrid
							data={aggridData}
							options={{
								label: 'testName',
								dataset: 'price',
								defaultColDef: {
									sortable: true,
									filter: true,
									resizable: true
								},
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
								]
							}}
							onGridReady={this.onGridReady}
						/>
					</Col>
				</Row>
				<div />
			</div>
		)
	}
}
