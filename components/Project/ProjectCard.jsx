import Link from "next/link"


export default function ProjectCard(el, prefixUrl){
	console.log(prefixUrl)
	return (
		<Link href={'/project/' + el.id}>
			<h1>{el.name}</h1>
		</Link>
	)
}