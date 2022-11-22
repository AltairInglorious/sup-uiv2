'use client'
import { useRouter } from "next/navigation"
import { useState } from 'react'


async function addTask(department, name, body, date, setLoadingFlag, refresh){
	setLoadingFlag(true)
	await fetch('http://185.181.8.111:1337/api/tasks/',
	{
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer d47807a3d353011a939c7e00374285ca07cf58b1c208b27c3ae6b678cc83fd6a5fbf250dcad2146d28d0968a8507157eb6bb46f65c48cbab9566b33ddf9ffc7e23307d7efbaa72e9ac3ae240f969d3e707fb139105eda6682a59eb477a581b5df453360535f4ab8991abf1472c62407f1eb7f02df5332e1a782179ff9bf37a64',
		},
		method: 'POST',
		body: JSON.stringify({
			data: {
				department: department,
				name: name,
				description: body,
				end_date: date,
			}
		})
	})
	refresh()
	setLoadingFlag(false)
}


export default function AddTask(props){
	const router = useRouter()
	const [name, setName] = useState('')
	const [body, setBody] = useState('')
	const [date, setDate] = useState()
	const [loadingFlag, setLoadingFlag] = useState(false)
	return loadingFlag
	? <span>Loading...</span>
	: (
		<div className='flex flex-col border-2 p-4 max-w-sm self-center w-1/3 m-2'>
			<input className='border-b-2' type="text" placeholder='Task name' value={name} onChange={(e) => setName(e.target.value)}/>
			<input className='border-b-2' type="text" placeholder='Task description' value={body} onChange={(e) => setBody(e.target.value)}/>
			<input className='border-b-2' type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
			<button className='bg-gray-200 mt-2 hover:bg-green-400 p-2' onClick={() => addTask(props.id, name, body, date, setLoadingFlag, router.refresh)}>➕ Add</button>
		</div>
	)
}