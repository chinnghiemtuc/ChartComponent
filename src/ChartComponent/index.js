import React from 'react'
import { Bar } from 'react-chartjs-2'
import moment from 'moment'

const daysCount = moment().daysInMonth() + 1 // 31
const days = [...Array(daysCount).keys()].slice(0)

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
	console.log(data, label, dataset, type, title)

	let chartData = { labels: [], datasets: [] }

	const labels = type === 'D' ? days : months

	const dateFormat = type === 'D' ? type : 'M'

	data.map(item => {
		const testName = uppercaseFristLetter(item[label])
		// console.log(item.testName, 'vs', item[label])
		// 	// const testName = item.testName
		const price = item[dataset]
		const start = moment(item.start).format(dateFormat) - 1
		const end = moment(item.end).format(dateFormat) - 1
		for (let i = 0; i < labels.length; i++) {
			// console.log(label)
			const compare = chartData.datasets.some(item => item.label === testName)
			if (compare) {
				const compareArray = chartData.datasets.filter(
					item => item.label === testName
				)
				if (compareArray[0].data.length === labels.length) {
					if (i >= start && i <= end) {
						compareArray[0].data[i] += price
					}
				} else {
					if (i >= start && i <= end) {
						compareArray[0].data.push(price)
					} else {
						compareArray[0].data.push(0)
					}
				}
			} else {
				// console.log(label)
				chartData.datasets.push({
					label: testName,
					backgroundColor: colors[chartData.datasets.length],
					// backgroundColor: colors,
					data: []
				})
				const compareArray = chartData.datasets.filter(
					item => item.label === testName
				)
				if (i >= start && i <= end) {
					compareArray[0].data.push(price)
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

export { BarChartComponent }

// export default { ConvertBarChart }
