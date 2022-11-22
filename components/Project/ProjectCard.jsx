'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


async function deleteProject(id, setLoadingFlag, refresh){
	setLoadingFlag(true)
	await fetch('http://185.181.8.111:1337/api/projects/'+id,
	{
		headers: {
			'Authorization': 'Bearer d47807a3d353011a939c7e00374285ca07cf58b1c208b27c3ae6b678cc83fd6a5fbf250dcad2146d28d0968a8507157eb6bb46f65c48cbab9566b33ddf9ffc7e23307d7efbaa72e9ac3ae240f969d3e707fb139105eda6682a59eb477a581b5df453360535f4ab8991abf1472c62407f1eb7f02df5332e1a782179ff9bf37a64'
		},
		method: 'DELETE'
	})
	refresh()
	setLoadingFlag(false)
}


async function editName(id, name, setEditFlag, setLoadingFlag, refresh){
	setLoadingFlag(true)
	let res = await fetch('http://185.181.8.111:1337/api/projects/'+id,
	{
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer d47807a3d353011a939c7e00374285ca07cf58b1c208b27c3ae6b678cc83fd6a5fbf250dcad2146d28d0968a8507157eb6bb46f65c48cbab9566b33ddf9ffc7e23307d7efbaa72e9ac3ae240f969d3e707fb139105eda6682a59eb477a581b5df453360535f4ab8991abf1472c62407f1eb7f02df5332e1a782179ff9bf37a64',
		},
		method: 'PUT',
		body: JSON.stringify({
			data: {
				name: name
			}
		})
	})
	refresh()
	setLoadingFlag(false)
	setEditFlag(false)
}


export default function ProjectCard(el){
	const [editFlag, setEditFlag] = useState(false)
	const [loadingFlag, setLoadingFlag] = useState(false)
	const [name, setName] = useState(el.attributes.name)
	const router = useRouter()
	return loadingFlag
	? <span>Loading...</span>
	: (
		<div className='flex flex-col border-2 p-4 max-w-sm w-1/3 m-2'>
			{editFlag
			? (
				<div className='flex flex-col'>
				<input className='border-b-2 my-2' type="text" value={name} onChange={(e) => setName(e.target.value)}/>
				<button className='bg-gray-200 hover:bg-blue-500 hover:text-white' onClick={() => editName(el.id, name, setEditFlag, setLoadingFlag, router.refresh)}>Save</button>
				</div>
			)
			: (
				<div className='flex flex-col'>
					<Link className='hover:bg-orange-400 hover:text-white py-4 text-center font-bold' href={'/project/' + el.id}>
						{el.attributes.name}
					</Link>
					<button className='bg-gray-200 hover:bg-blue-500 hover:text-white my-2' onClick={() => setEditFlag(true)}>🖉 Edit</button>
				</div>
			)}

			<button className='bg-gray-200 hover:bg-red-500 hover:text-white my-2' onClick={() => deleteProject(el.id, setLoadingFlag, router.refresh)}>🗑 Delete</button>
		</div>
	)
}