import Link from "next/link"


export default function DepartmentCard(el){
	return (
		<Link href={'/department/' + el.id}>
			<h1>{el.name}</h1>
		</Link>
	)
}