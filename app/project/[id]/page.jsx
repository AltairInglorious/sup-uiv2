import DepartmentList from "../../../components/Department/DepartmentList";


export default function ProjectInfo(props){
	return <DepartmentList id={props.params.id}/>
}