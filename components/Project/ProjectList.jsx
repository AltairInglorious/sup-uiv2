'use client'
import ProjectCard from "./ProjectCard"
import AddProject from './AddProject'
import { useEffect, useState } from 'react'


export default function ProjectList(){
	const [projectList, setProjectList] = useState(() => '')
	const [loading, setLoading] = useState(true)


	useEffect(() => {
		const fetchData = async () => {
			let projectData = await fetch('https://altairdev.tech/api/projects?sort=id:desc',
			{
				headers: {
					'Authorization': 'Bearer '+localStorage.getItem('token'),
				}
			})
			.then((res) => res.json())
			.then((data) => {return data})

			setProjectList(projectData)
			setLoading(false)
		}
		fetchData()
	}, [])

	return (
		loading
		? <h1>⏳ Loading...</h1>
		: (
			<div className='flex flex-wrap justify-around items-center'>
				<AddProject/>
				{projectList.data.map((el, index) => <ProjectCard key={index} {...el}/>)}
			</div>
		)
	)
}