import DepartmentList from "../../../components/Department/DepartmentList";


export default function ProjectInfo(props){
	console.log(props.params.id)
	return <DepartmentList id={props.params.id}/>
}