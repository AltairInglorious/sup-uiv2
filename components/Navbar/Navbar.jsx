import Link from "next/link"


export default function Navbar(){
	return (
		<div className='flex w-full'>
			<Link className='bg-gray-200 hover:bg-blue-500 p-2' href="/">🏠 Home</Link>
			<Link className='bg-gray-200 hover:bg-blue-500 p-2' href="/login">⎆ Login</Link>
		</div>
	)
}