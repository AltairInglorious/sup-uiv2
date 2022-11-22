'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


async function deleteTask(id, setLoadingFlag, refresh){
	setLoadingFlag(true)
	await fetch('http://185.181.8.111:1337/api/tasks/'+id,
	{
		headers: {
			'Authorization': 'Bearer d47807a3d353011a939c7e00374285ca07cf58b1c208b27c3ae6b678cc83fd6a5fbf250dcad2146d28d0968a8507157eb6bb46f65c48cbab9566b33ddf9ffc7e23307d7efbaa72e9ac3ae240f969d3e707fb139105eda6682a59eb477a581b5df453360535f4ab8991abf1472c62407f1eb7f02df5332e1a782179ff9bf37a64'
		},
		method: 'DELETE'
	})
	refresh()
	setLoadingFlag(false)
}


async function editName(id, title, body, setEdit, setLoading, refresh){
	setLoading(true)
	await fetch('http://185.181.8.111:1337/api/tasks/'+id,
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
			}
		})
	})
	refresh()
	setLoading(false)
	setEdit(false)
}


async function check(id, state, setLoading, refresh){
	setLoading(true)
	await fetch('http://185.181.8.111:1337/api/tasks/'+id,
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

	return loading
	? <span>Loading...</span>
	: (
		<div>
			{
				edit
				? (
					<>
					<input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/><br/>
					<input type="text" value={body} onChange={(e) => setBody(e.target.value)}/><br/><br/>
					</>
				)
				: (
					<>
					<h1>{el.name}</h1>
					<span>{el.description}</span><br/><br/>
					</>
				)
			}
			<span>
				{el.compleate
				? 'Compleate'
				: 'Pending'}
				<button onClick={() => check(el.id, !el.compleate, setLoading, router.refresh)}>
					{
						el.compleate
						? 'Uncheck'
						: 'Check'
					}
				</button>
			</span><br/>
			{
				edit
				? <button onClick={() => editName(el.id, title, body, setEdit, setLoading, router.refresh)}>Save</button>
				: <button onClick={() => setEdit(!edit)}>Edit</button>
			}
			<button onClick={() => deleteTask(el.id, setLoading, router.refresh)}>Delete</button>
		</div>
	)
}