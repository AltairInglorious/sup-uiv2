'use client'
import { useState } from 'react'


async function signIn(login, password, setLoading, setError, setErrorFlag){
	setErrorFlag(false)
	setError('')
	setLoading(true)
	let res = await fetch('https://altairdev.tech/api/auth/local',
	{
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({
			identifier: login,
			password: password,
		})
	})
	.then((res) => res.json())
	.then((credential) => {return credential})

	if(res.error){
		setError(res.error.message)
		setErrorFlag(true)
	}else{
		if(res.jwt){
			localStorage.setItem('token', res.jwt)
			window.location.replace('/')
		}else{
			setError(res.error.message)
			setErrorFlag(true)
		}
	}

	setLoading(false)
}


export default function page(){
	const [login, setLogin] = useState()
	const [password, setPassword] = useState()
	const [errorFlag, setErrorFlag] = useState(false)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	return loading
	? <h1>⏳ Loading...</h1>
	: (
		<div className='flex flex-col max-w-sm mx-auto border-2 border-black'>
			{
				errorFlag
				? (
					<div className='bg-red-500 text-white w-full'>
						<h1>Error</h1>
						<span>{error}</span>
					</div>
				)
				: null
			}
			<div className='flex flex-col max-w-sm mx-auto p-4 w-full'>
				<label className='mb-2'>👤 Login</label>
				<input className='border-2 mb-2 hover:border-green-400' type="text" onChange={(e) => setLogin(e.target.value)}/>
				<label className='mb-2'>🔑 Password</label>
				<input className='border-2 mb-2 hover:border-green-400' type="password" onChange={(e) => setPassword(e.target.value)}/>
				<button className='bg-gray-200 hover:bg-green-500 mt-2 p-2 hover:text-white' onClick={() => signIn(login, password, setLoading, setError, setErrorFlag)}>⎆ Login</button>
			</div>
		</div>
	)
}