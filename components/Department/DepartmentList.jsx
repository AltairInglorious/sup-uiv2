'use client'
import DepartmentCard from "./DepartmentCard"
import AddDepartment from './AddDepartment'
import { useEffect, useState } from 'react'


export default async function DepartmentList(props){
	const [departmentList, setDepartmentList] = useState(() => '')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			let fetchedData = await fetch('https://altairdev.tech/api/departments?filters[project][id][$eq]='+id,
			{
				headers: {
					'Authorization': 'Bearer '+localStorage.getItem('token')
				}
			})
			.then((res) => res.json())
			.then((data) => {return data})
			
			setDepartmentList(fetchedData)
			setLoading(false)
		}
		fetchData()
	}, [])

	return (
		loading
		? <h1>⏳ Loading...</h1>
		: (
			<div className='flex flex-col justify-around items-center'>
				<h1 className='font-bold'>Project: {props.id}</h1>
				<div className='flex flex-wrap justify-around items-center w-full'>
					<AddDepartment id={props.id}/>
					{departmentList.data.map((el) => <DepartmentCard key={el.id} id={el.id} {...el.attributes}/>)}
				</div>
			</div>
		)
	)
}