import TaskCard from "./TaskCard"


export default function TaskList(){
	const projectList = [
		{
			id: 1,
			name: 'Task 1',
			description: 'Super full description of task',
			compleate: false,
			end_date: null
		},
		{
			id: 2,
			name: 'Task 2',
			description: 'Super full description of task',
			compleate: true,
			end_date: null
		},
		{
			id: 3,
			name: 'Task 3',
			description: 'Super full description of task',
			compleate: false,
			end_date: null
		},
		{
			id: 4,
			name: 'Task 4',
			description: 'Super full description of task',
			compleate: false,
			end_date: null
		},
	]
	return (
		<>
		{projectList.map((el, index) => <TaskCard key={index} {...el}/>)}
		</>
	)
}