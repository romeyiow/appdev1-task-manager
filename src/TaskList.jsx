import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
            const tasksData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTasks(tasksData);
        });
        return unsubscribe;
    }, [db]);

    const markCompleted = async (id) => {
        const taskDoc = doc(db, "tasks", id);
        await updateDoc(taskDoc, { status: "completed" });
    };

    const deleteTask = async (id) => {
        const taskDoc = doc(db, "tasks", id);
        await deleteDoc(taskDoc);
    };

    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id} className={task.status === "completed" ? "completed" : "pending" }>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                    <button onClick={() => markCompleted(task.id)}>Mark as Completed</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
