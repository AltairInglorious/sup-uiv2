'use client'
import { useRouter } from "next/navigation"
import { useState } from 'react'


async function addProject(name, setLoadingFlag, setName, refresh){
	setLoadingFlag(true)
	await fetch('https://altairdev.tech/api/projects/',
	{
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+localStorage.getItem('token'),
		},
		method: 'POST',
		body: JSON.stringify({
			data: {
				name: name
			}
		})
	})
	setName('')
	refresh()
	setLoadingFlag(false)
}


export default function AddProject(){
	const router = useRouter()
	const [name, setName] = useState()
	const [loadingFlag, setLoadingFlag] = useState(false)
	return loadingFlag
	? <span>⏳ Loading...</span>
	: (
		<div className='flex flex-col border-2 p-4 max-w-sm self-center w-1/3 m-2'>
			<input className='border-b-2' type="text" placeholder='Project name' value={name} onChange={(e) => setName(e.target.value)}/>
			<button className='bg-gray-200 mt-2 hover:bg-green-400 p-2' onClick={() => addProject(name, setLoadingFlag, setName, router.refresh)}>➕ Add</button>
		</div>
	)
}