import DepartmentCard from "./DepartmentCard"


export default function DepartmentList(props){
	const projectList = [
		{
			id: 1,
			name: 'Department 1'
		},
		{
			id: 2,
			name: 'Department 2'
		},
		{
			id: 3,
			name: 'Department 3'
		},
		{
			id: 4,
			name: 'Department 4'
		},
	]
	return (
		<>
		<h1>Project: {props.id}</h1>
		{projectList.map((el, index) => <DepartmentCard key={index} {...el}/>)}
		</>
	)
}