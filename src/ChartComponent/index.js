import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import moment from 'moment'

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

const uppercaseFristLetter = item => item.charAt(0).toUpperCase() + item.slice(1)

const BarChartComponent = props => {
	// console.log(props)
	const { data, options } = props
	const { label, dataset, type, title, scales } = options
	// console.log(data, label, dataset, type, title)

	let chartData = { labels: [], datasets: [] }

	const labels = type === 'D' ? days : months

	const dateFormat = type === 'D' ? type : 'M'

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
					data: []
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

	return (
		<article style={{ height: '43vh', paddingBottom: '20px' }}>
			<Bar
				data={chartData.datasets ? chartData : {}}
				options={{
					title: title && {
						display: true,
						text: title,
						fontSize: 20
					},
					legend: {
						display: true,
						position: 'right'
					},
					maintainAspectRatio: false, // Don't maintain w/h ratio
					scales: scales
				}}
				height={50}
			/>
		</article>
	)
}

const PieChartComponent = props => {
	console.log(props)
	const { data, options } = props
	const { label, dataset, title } = options

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

	// console.log(dataInput)

	data.map((item, index) => {
		const testName = uppercaseFristLetter(item[label])
		const price = item[dataset]
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

	// pieRowData = pieRowData.map(item => ({
	// 	testName: item.testName,
	// 	price: item.price,
	// 	start: moment(item.start).format('DD/MM/YYYY'),
	// 	end: moment(item.end).format('DD/MM/YYYY')
	// }))

	// this.setState({
	// 	pieData: chartData,
	// 	rowData: pieRowData
	// })

	return (
		<article style={{ height: '40vh' }}>
			<Pie
				data={chartData.datasets ? chartData : {}}
				options={{
					title: {
						display: true,
						text: title ? title : 'Pie Chart',
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
	)
}

export { BarChartComponent, PieChartComponent }

// export default { ConvertBarChart }
