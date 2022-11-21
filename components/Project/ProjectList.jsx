import ProjectCard from "./ProjectCard"


export default function ProjectList(){
	const projectList = [
		{
			id: 1,
			name: 'Project 1'
		},
		{
			id: 2,
			name: 'Project 2'
		},
		{
			id: 3,
			name: 'Project 3'
		},
		{
			id: 4,
			name: 'Project 4'
		},
	]
	return (
		<>
		{projectList.map((el, index) => <ProjectCard key={index} {...el}/>)}
		</>
	)
}