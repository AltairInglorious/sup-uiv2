'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


async function deleteDepartment(id, setLoadingFlag, refresh){
	setLoadingFlag(true)
	await fetch('http://185.181.8.111:1337/api/departments/'+id,
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
	let res = await fetch('http://185.181.8.111:1337/api/departments/'+id,
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


export default function DepartmentCard(el){
	const [editFlag, setEditFlag] = useState(false)
	const [loadingFlag, setLoadingFlag] = useState(false)
	const [name, setName] = useState(el.name)
	const router = useRouter()
	return loadingFlag
	? <span>Loading...</span>
	: (
		<div>
			{editFlag
			? (
				<>
				<input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
				<button onClick={() => editName(el.id, name, setEditFlag, setLoadingFlag, router.refresh)}>Save</button>
				</>
			)
			: (
				<>
				<Link href={'/department/' + el.id}>
					{el.name}
		 		</Link>
				<button onClick={() => setEditFlag(true)}>Edit</button>
				</>
			)}

			<button onClick={() => deleteDepartment(el.id, setLoadingFlag, router.refresh)}>Delete</button>
		</div>
	)
}