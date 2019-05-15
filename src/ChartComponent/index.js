import React from 'react'
import { Bar } from 'react-chartjs-2'
import moment from 'moment'

// const ConvertBarChart = props => {
// 	let chartData = { labels: [], datasets: [] }
// 	let { datasets } = chartData

// 	const daysCount = moment().daysInMonth() // 31
// 	const days = [...Array(daysCount).keys()]

// 	const months = [
// 		'January',
// 		'February',
// 		'March',
// 		'April',
// 		'May',
// 		'June',
// 		'July',
// 		'August',
// 		'September',
// 		'October',
// 		'November',
// 		'December'
// 	]

// 	const colors = [
// 		'rgba(235, 59, 90, 0.6)',
// 		'rgba(250, 130, 49, 0.6)',
// 		'rgba(247, 183, 49, 0.6)',
// 		'rgba(32, 191, 107, 0.6)',
// 		'rgba(15, 185, 177, 0.6)',
// 		'rgba(45, 152, 218, 0.6)',
// 		'rgba(56, 103, 214, 0.6)',
// 		'rgba(136, 84, 208, 0.6)',
// 		'rgba(165, 177, 194, 0.6)',
// 		'rgba(75, 101, 132, 0.6)'
// 	]

// 	const labelsInput = props.type === 'M' ? months : days

// 	props.data.map(item => {
// 		const testName = this.uppercaseFristLetter(item.testName)
// 		// const testName = item.testName
// 		const price = item.price
// 		const start = moment(item.start).format(props.type) - 1
// 		const end = moment(item.end).format(props.type) - 1
// 		// console.log(
// 		// 	'startTime',
// 		// 	moment(item.start).format('DD/MMMM/YYYY hh:mm:ss')
// 		// )
// 		// console.log('endTime', moment(item.start).format('DD/MMMM/YYYY hh:mm:ss'))
// 		// console.log(start, end)
// 		for (let i = 0; i < labelsInput.length; i++) {
// 			const compare = datasets.some(item => item.label === testName)
// 			if (compare) {
// 				const compareArray = datasets.filter(item => item.label === testName)
// 				if (compareArray[0].data.length === labelsInput.length) {
// 					if (i >= start && i <= end) {
// 						// console.log('G', i, price)
// 						compareArray[0].data[i] += price
// 						// console.log('GA', i, compareArray[0].data[i])
// 					}
// 				} else {
// 					if (i >= start && i <= end) {
// 						// console.log('C', i, price)
// 						compareArray[0].data.push(price)
// 					} else {
// 						// console.log('D', i, 0)
// 						compareArray[0].data.push(0)
// 					}
// 				}
// 			} else {
// 				datasets.push({
// 					label: testName,
// 					backgroundColor: colors[datasets.length],
// 					// backgroundColor: colors,
// 					data: []
// 				})
// 				const compareArray = datasets.filter(item => item.label === testName)
// 				if (i >= start && i <= end) {
// 					// console.log('A', i, price)
// 					compareArray[0].data.push(price)
// 				} else {
// 					// console.log('B', i, 0)
// 					compareArray[0].data.push(0)
// 				}
// 			}
// 		}
// 		// console.log(datasets)
// 		return item
// 	})

// 	chartData.labels = labelsInput
// 	// labels.push(labelsInput)

// 	// console.log(chartData)

// 	// this.setState({
// 	// 	barData: chartData
// 	// })

// 	return <Bar data={chartData} />
// }

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
	const { label, dataset, type, title } = options
	console.log(label, dataset, type, title)

	let chartData = { labels: [], datasets: [] }
	let { datasets } = chartData

	const labels = type === 'D' ? days : months

	const dateFormat = type === 'D' ? type : 'M'

	data.map(item => {
		const testName = uppercaseFristLetter(item.testName)
		// 	// const testName = item.testName
		const price = item.price
		const start = moment(item.start).format(dateFormat) - 1
		const end = moment(item.end).format(dateFormat) - 1
		// 	// console.log(
		// 	// 	'startTime',
		// 	// 	moment(item.start).format('DD/MMMM/YYYY hh:mm:ss')
		// 	// )
		// 	// console.log('endTime', moment(item.start).format('DD/MMMM/YYYY hh:mm:ss'))
		// 	// console.log(start, end)
		for (let i = 0; i < labels.length; i++) {
			const compare = datasets.some(item => item.label === testName)
			if (compare) {
				const compareArray = datasets.filter(item => item.label === testName)
				if (compareArray[0].data.length === labels.length) {
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
		// 	// console.log(datasets)
		return item
	})

	chartData.labels = labels
	// labels.push(labels)

	// console.log(chartData)

	return (
		<article style={{ height: '43vh', paddingBottom: '20px' }}>
			<Bar
				data={chartData.datasets ? chartData : {}}
				options={{
					title: {
						display: true,
						text: title ? title : 'Bar Chart',
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
	)
}

export { BarChartComponent }

// export default { ConvertBarChart }
