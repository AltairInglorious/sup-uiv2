import TaskList from "../../../components/Task/TaskList"


export default function ProjectInfo(props){
	return <TaskList id={props.params.id}/>
}