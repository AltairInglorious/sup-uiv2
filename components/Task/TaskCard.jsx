import Link from "next/link"


export default function TaskCard(el){
	return (
		<div>
			<Link href={'/task/' + el.id}>
				<h1>{el.name}</h1>
			</Link>
			<span>{el.description}</span><br />
			<span>
				{el.compleate
				? 'Compleate'
				: 'Pending'}
			</span>
		</div>
	)
}