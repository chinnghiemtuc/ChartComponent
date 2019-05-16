import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import moment from 'moment'
import { AgGridReact } from 'ag-grid-react'

const daysInMonth = moment().daysInMonth() + 1 // 31
const days = [...Array(daysInMonth).keys()].slice(1)

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
	'December',
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
	'rgba(75, 101, 132, 0.6)',
]

const uppercaseFristLetter = item => item.charAt(0).toUpperCase() + item.slice(1)

const BarChartComponent = props => {
	// console.log(props)
	const { data, options } = props
	const { label, dataset, type, title, scales } = options
	// console.log(data, label, dataset, type, title)

	let chartData = { labels: [], datasets: [] }

	const labels = type === 'D' ? days : months

	const dateFormat = type === 'D' ? type : 'M'

	data &&
		data.map(item => {
			const labelItem = uppercaseFristLetter(item[label])
			const datasetItem = item[dataset]
			const start = moment(item.start).format(dateFormat) - 1
			const end = moment(item.end).format(dateFormat) - 1
			for (let i = 0; i < labels.length; i++) {
				// console.log(label)
				const compare = chartData.datasets.some(item => item.label === labelItem)
				if (compare) {
					const compareArray = chartData.datasets.filter(
						item => item.label === labelItem
					)
					if (compareArray[0].data.length === labels.length) {
						if (i >= start && i <= end) {
							compareArray[0].data[i] += datasetItem
						}
					} else {
						if (i >= start && i <= end) {
							compareArray[0].data.push(datasetItem)
						} else {
							compareArray[0].data.push(0)
						}
					}
				} else {
					// console.log(label)
					chartData.datasets.push({
						label: labelItem,
						backgroundColor: colors[chartData.datasets.length],
						// backgroundColor: colors,
						data: [],
					})
					const compareArray = chartData.datasets.filter(
						item => item.label === labelItem
					)
					if (i >= start && i <= end) {
						compareArray[0].data.push(datasetItem)
					} else {
						compareArray[0].data.push(0)
					}
				}
			}
			return item
		})

	chartData.labels = labels

	// console.log(chartData)
	if (!data) {
		return <div>a</div>
	}

	return (
		<article style={{ height: '42vh', paddingBottom: '20px' }}>
			<Bar
				data={chartData.datasets ? chartData : {}}
				options={{
					title: title && {
						display: true,
						text: title,
						fontSize: 20,
					},
					legend: {
						display: true,
						position: 'bottom',
					},
					maintainAspectRatio: false, // Don't maintain w/h ratio
					scales: scales,
				}}
				height={50}
			/>
		</article>
	)
}

const PieChartComponent = props => {
	// console.log(props)
	const { data, options } = props
	const { label, dataset, title } = options

	let chartData = {
		labels: [],
		datasets: [
			{
				data: [],
				backgroundColor: [],
			},
		],
	}

	let pieRowData = []

	data.map((item, index) => {
		const labelItem = uppercaseFristLetter(item[label])
		const datasetItem = item[dataset]
		const start = item.start
		const end = item.end

		const exist = chartData.labels.indexOf(labelItem)

		if (exist > -1) {
			chartData.datasets[0].data[exist] += datasetItem
			const duplicate = pieRowData[exist]
			if (start < duplicate.start) {
				pieRowData[exist].start = start
			}
			if (end > duplicate.end) {
				pieRowData[exist].end = end
			}
		} else {
			chartData.labels.push(labelItem)
			chartData.datasets[0].data.push(datasetItem)
			pieRowData.push(item)
		}
		return item
	})

	chartData.datasets[0].backgroundColor = colors

	return (
		<article
			style={{
				height: '40vh',
			}}>
			<Pie
				data={chartData.datasets ? chartData : {}}
				options={{
					title: title && {
						display: true,
						text: title,
						fontSize: 20,
					},
					legend: {
						display: false,
						position: 'left',
					},
					maintainAspectRatio: false, // Don't maintain w/h ratio
				}}
				height={50}
			/>
		</article>
	)
}

const PieChartToAgGrid = props => {
	// console.log(props)
	const { data, options, onGridReady } = props
	const { label, dataset, columnDefs, defaultColDef } = options
	// console.log(data)
	// console.log(label, dataset, columnDefs, defaultColDef)
	const rowData = []

	data &&
		data.map((item, index) => {
			const labelItem = item[label]
			const datasetItem = item[dataset]
			const start = item.start
			const end = item.end

			const compare = rowData.find(item => item[label] === labelItem)

			if (compare) {
				if (datasetItem > 0) {
					compare[dataset] += datasetItem
				}
				if (start < compare.start) {
					compare.start = start
				}
				if (end > compare.end) {
					compare.end = end
				}
			} else {
				const clone = JSON.parse(JSON.stringify(item))
				rowData.push(clone)
			}
			return item
		})
	// console.log('rowData', rowData)

	return (
		<div
			className="ag-theme-balham"
			style={{
				minHeight: '44vh',
				maxHeight: 'calc(50vh-20px)',
				height: '400px',
				width: '100%',
			}}>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={rowData}
				defaultColDef={defaultColDef}
				onGridReady={onGridReady}
			/>
		</div>
	)
}

export { BarChartComponent, PieChartComponent, PieChartToAgGrid }
