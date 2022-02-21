import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
	id: number;
	title: string;
	isComplete: boolean;
}

export function TaskList() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTaskTitle, setNewTaskTitle] = useState("");

	function handleCreateNewTask() {
		// Crie uma nova task com um id random, não permita criar caso o título seja vazio.
		if (newTaskTitle) {
			let task = {
				id: Math.floor(Math.random() * 999999) + 100000,
				title: newTaskTitle,
				isComplete: false,
			};

			setTasks([...tasks, task]);
			setNewTaskTitle("");
		} else {
			alert("A tarefa precisa ter um título");
		}
	}

	function handleToggleTaskCompletion(id: number) {
		// Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
		let completedTask = tasks.find((task) => task.id === id);
		let tasksAux = tasks;
		if (tasks.find((task) => task.id === id)) {
			tasksAux = tasksAux.filter((task) => task.id != id);

			if (completedTask != tasksAux.find((task) => task.id === id) && !!completedTask) {
				completedTask.isComplete
					? ((completedTask.isComplete = false), tasksAux.unshift(completedTask))
					: ((completedTask.isComplete = true), tasksAux.push(completedTask));

				setTasks(tasksAux);
			}
		}
	}

	function handleRemoveTask(id: number) {
		// Remova uma task da listagem pelo ID
		if (tasks.find((task) => task.id === id)) {
			setTasks((tasks) => tasks.filter((task) => task.id != id));
		}
	}

	return (
		<section className="task-list container">
			<header>
				<h2>Minhas tasks</h2>

				<div className="input-group">
					<input
						type="text"
						placeholder="Adicionar novo todo"
						onChange={(e) => setNewTaskTitle(e.target.value)}
						value={newTaskTitle}
					/>
					<button
						type="submit"
						data-testid="add-task-button"
						onClick={handleCreateNewTask}
					>
						<FiCheckSquare size={16} color="#fff" />
					</button>
				</div>
			</header>

			<main>
				<ul>
					{tasks.map((task) => (
						<li key={task.id}>
							<div className={task.isComplete ? "completed" : ""} data-testid="task">
								<label className="checkbox-container">
									<input
										type="checkbox"
										readOnly
										checked={task.isComplete}
										onClick={() => handleToggleTaskCompletion(task.id)}
									/>
									<span className="checkmark"></span>
								</label>
								<p>{task.title}</p>
							</div>

							<button
								type="button"
								data-testid="remove-task-button"
								onClick={() => handleRemoveTask(task.id)}
							>
								<FiTrash size={16} />
							</button>
						</li>
					))}
				</ul>
			</main>
		</section>
	);
}
