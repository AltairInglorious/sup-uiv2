'use client'
import TaskCard from "./TaskCard"
import AddTask from './AddTask'
import { useState, useEffect } from 'react'


export default async function TaskList(props){
	const [taskList, setTaskList] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			let fetchedData = await fetch('https://altairdev.tech/api/tasks?sort[0]=compleate&sort[1]=end_date&filters[department][id][$eq]='+id,
			{
				headers: {
					'Authorization': 'Bearer '+localStorage.getItem('token')
				}
			})
			.then((res) => res.json())
			.then((data) => {return data})

			setTaskList(fetchedData)
			setLoading(false)
		}
		fetchData()
	}, [])

	return (
		loading
		? <h1>⏳ Loading...</h1>
		: (
			<div  className='flex flex-wrap justify-around items-center'>
			<AddTask id={props.id}/>
			{taskList.data.map((el) => <TaskCard key={el.id} id={el.id} {...el.attributes}/>)}
			</div>
		)
	)
}