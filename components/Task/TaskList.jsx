import TaskCard from "./TaskCard"
import AddTask from './AddTask'


async function getDepartmentList(id){
	let departmentList = await fetch('http://185.181.8.111:1337/api/tasks?filters[department][id][$eq]='+id,
	{
		headers: {
			'Authorization': 'Bearer d47807a3d353011a939c7e00374285ca07cf58b1c208b27c3ae6b678cc83fd6a5fbf250dcad2146d28d0968a8507157eb6bb46f65c48cbab9566b33ddf9ffc7e23307d7efbaa72e9ac3ae240f969d3e707fb139105eda6682a59eb477a581b5df453360535f4ab8991abf1472c62407f1eb7f02df5332e1a782179ff9bf37a64'
		}
	})

	return departmentList.json()
}


export default async function TaskList(props){
	const taskList = await getDepartmentList(props.id)
	return (
		<>
		<AddTask id={props.id}/>
		{taskList.data.map((el) => <TaskCard key={el.id} id={el.id} {...el.attributes}/>)}
		</>
	)
}