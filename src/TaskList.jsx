import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tooltip, Badge, Button, Spinner } from "flowbite-react";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true); 
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
            const tasksData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTasks(tasksData);
            setLoading(false); 
        });

        return unsubscribe;
    }, [db]);

    const toggleStatus = async (id, currentStatus) => {
        const taskDoc = doc(db, "tasks", id);
        await updateDoc(taskDoc, { status: currentStatus === "completed" ? "pending" : "completed" });
    };

    const deleteTask = async (id) => {
        const taskDoc = doc(db, "tasks", id);
        await deleteDoc(taskDoc);
    };

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-xl font-semibold text-center mb-4">Task List</h2>
            {loading ? (
                <div className="flex justify-center my-8">
                    <Button color="gray">
                        <Spinner aria-label="Loading tasks" size="sm" />
                        <span className="pl-3">Loading...</span>
                    </Button>
                </div>
            ) : tasks.length > 0 ? (
                <Table hoverable>
                    <TableHead>
                        <TableHeadCell className="w-1">
                            <span className="sr-only">Checkbox</span>
                        </TableHeadCell>
                        <TableHeadCell>Task Title</TableHeadCell>
                        <TableHeadCell>Description</TableHeadCell>
                        <TableHeadCell>Status</TableHeadCell>
                        <TableHeadCell>
                            <span className="sr-only">Actions</span>
                        </TableHeadCell>
                    </TableHead>
                    <TableBody className="divide-y">
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell className="w-1 p-4">
                                    <Tooltip content={task.status === "completed" ? "Mark as Pending" : "Mark as Completed"}>
                                        <Checkbox
                                            checked={task.status === "completed"}
                                            onChange={() => toggleStatus(task.id, task.status)}
                                        />
                                    </Tooltip>
                                </TableCell>
                                <TableCell
                                    className={`whitespace-nowrap font-medium text-gray-900 dark:text-white ${task.status === "completed" ? "text-gray-500 line-through" : ""}`}
                                >
                                    {task.title}
                                </TableCell>
                                <TableCell className="text-left p-2">
                                    <div
                                        className={`whitespace-normal overflow-hidden text-left max-h-32 ${task.status === "completed" ? "line-through text-gray-500" : ""}`}
                                    >
                                        {task.description}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge color={task.status === "completed" ? "success" : "warning"}>
                                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <button
                                        className="ml-2 font-medium text-red-600 hover:underline dark:text-red-500"
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        Delete
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-center text-gray-500">No tasks available</p>
            )}
        </div>
    );
};

export default TaskList;
