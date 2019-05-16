import React from 'react'
import { Row } from 'antd'
import moment from 'moment'

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

export default class Color extends React.Component {
	render() {
		const url =
			'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1fcca197-a927-42f4-a737-83b6f9ec63d2/d8v70rf-6d087431-25e8-4723-b5e3-2bfa21ea14e7.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFmY2NhMTk3LWE5MjctNDJmNC1hNzM3LTgzYjZmOWVjNjNkMlwvZDh2NzByZi02ZDA4NzQzMS0yNWU4LTQ3MjMtYjVlMy0yYmZhMjFlYTE0ZTcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.HwlTywVPACoSKSFtIJgWICwCARLstT6lha2r9x7nGuk'
		const now = moment()
		const unix = +moment()
		const oneWeek = +now.add(1, 'day')
		console.log(now)
		console.log(unix)
		console.log(oneWeek)
		return (
			<div style={{ height: '100vh', backgroundImage: `url(${url})` }}>
				{colors &&
					colors.map((item, i) => (
						<Row style={{ backgroundColor: `${item}` }} key={i}>
							x
						</Row>
					))}
			</div>
		)
	}
}
