'use client'
import { useRouter } from "next/navigation"
import { useState } from 'react'


async function addDepartment(name, project, setLoadingFlag, setName, refresh){
	setLoadingFlag(true)
	await fetch('http://185.181.8.111:1337/api/departments/',
	{
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+localStorage.getItem('token'),
		},
		method: 'POST',
		body: JSON.stringify({
			data: {
				name: name,
				project: project
			}
		})
	})
	setName('')
	refresh()
	setLoadingFlag(false)
}


export default function AddDepartment(props){
	const router = useRouter()
	const [name, setName] = useState('')
	const [loadingFlag, setLoadingFlag] = useState(false)
	return loadingFlag
	? <span>⏳ Loading...</span>
	: (
		<div className='flex flex-col border-2 p-4 max-w-sm self-center w-1/3 m-2'>
			<input className='border-b-2' type="text" placeholder='Department name' value={name} onChange={(e) => setName(e.target.value)}/>
			<button className='bg-gray-200 mt-2 hover:bg-green-400 p-2' onClick={() => addDepartment(name, props.id, setLoadingFlag, setName, router.refresh)}>➕ Add</button>
		</div>
	)
}