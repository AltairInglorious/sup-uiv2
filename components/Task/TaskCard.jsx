'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


async function deleteTask(id, setLoadingFlag, refresh){
	setLoadingFlag(true)
	await fetch('https://altairdev.tech/api/tasks/'+id,
	{
		headers: {
			'Authorization': 'Bearer d47807a3d353011a939c7e00374285ca07cf58b1c208b27c3ae6b678cc83fd6a5fbf250dcad2146d28d0968a8507157eb6bb46f65c48cbab9566b33ddf9ffc7e23307d7efbaa72e9ac3ae240f969d3e707fb139105eda6682a59eb477a581b5df453360535f4ab8991abf1472c62407f1eb7f02df5332e1a782179ff9bf37a64'
		},
		method: 'DELETE'
	})
	refresh()
	setLoadingFlag(false)
}


async function editName(id, title, body, date, setEdit, setLoading, refresh){
	setLoading(true)
	await fetch('https://altairdev.tech/api/tasks/'+id,
	{
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer d47807a3d353011a939c7e00374285ca07cf58b1c208b27c3ae6b678cc83fd6a5fbf250dcad2146d28d0968a8507157eb6bb46f65c48cbab9566b33ddf9ffc7e23307d7efbaa72e9ac3ae240f969d3e707fb139105eda6682a59eb477a581b5df453360535f4ab8991abf1472c62407f1eb7f02df5332e1a782179ff9bf37a64',
		},
		method: 'PUT',
		body: JSON.stringify({
			data: {
				name: title,
				description: body,
				end_date: date,
			}
		})
	})
	refresh()
	setLoading(false)
	setEdit(false)
}


async function check(id, state, setLoading, refresh){
	setLoading(true)
	await fetch('https://altairdev.tech/api/tasks/'+id,
	{
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer d47807a3d353011a939c7e00374285ca07cf58b1c208b27c3ae6b678cc83fd6a5fbf250dcad2146d28d0968a8507157eb6bb46f65c48cbab9566b33ddf9ffc7e23307d7efbaa72e9ac3ae240f969d3e707fb139105eda6682a59eb477a581b5df453360535f4ab8991abf1472c62407f1eb7f02df5332e1a782179ff9bf37a64',
		},
		method: 'PUT',
		body: JSON.stringify({
			data: {
				compleate: state
			}
		})
	})
	refresh()
	setLoading(false)
}



export default function TaskCard(el){
	let router = useRouter()
	const [edit, setEdit] = useState(false)
	const [loading, setLoading] = useState(false)
	const [title, setTitle] = useState(el.name)
	const [body, setBody] = useState(el.description)
	const [date, setDate] = useState(el.end_date)

	return loading
	? <span>⏳ Loading...</span>
	: (
		<div className='flex flex-col border-2 p-4 max-w-sm w-1/3 m-2'>
			{
				edit
				? (
					<div className='flex flex-col'>
					<input className='border-b-2 my-2' type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
					<input className='border-b-2 my-2' type="text" value={body} onChange={(e) => setBody(e.target.value)}/>
					<input className='border-b-2 my-2' type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
					</div>
				)
				: (
					<div className='flex flex-col'>
					<h1 className='font-bold'>{el.name}</h1>
					<span>{el.description}</span>
					<span>🕘 {el.end_date}</span>
					</div>
				)
			}
			<div className='flex justify-between items-center'>
				{el.compleate
				? '✅ Compleate'
				: '⏳ In work...'}
				<button className='bg-gray-200 p-2 hover:bg-blue-500 hover:text-white' onClick={() => check(el.id, !el.compleate, setLoading, router.refresh)}>
					{
						el.compleate
						? '❌ Uncheck'
						: '✅ Check'
					}
				</button>
			</div>
			<div className='flex justify-around'>
				{
					edit
					? <button className='bg-gray-200 hover:bg-blue-500 hover:text-white p-2' onClick={() => editName(el.id, title, body, date, setEdit, setLoading, router.refresh)}>💾 Save</button>
					: <button className='bg-gray-200 hover:bg-blue-500 hover:text-white my-2 p-2' onClick={() => setEdit(!edit)}>🖉 Edit</button>
				}
				<button className='bg-gray-200 hover:bg-red-500 hover:text-white my-2 p-2' onClick={() => deleteTask(el.id, setLoading, router.refresh)}>🗑 Delete</button>
			</div>
		</div>
	)
}