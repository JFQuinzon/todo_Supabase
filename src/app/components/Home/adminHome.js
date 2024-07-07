"use client"

import { useEffect, useState } from "react";
import useFetchPage from "@/app/hooks/useFetchPage";
import useFormatDate from "@/app/hooks/useFormatDate";
import useFetchTaskLength from "@/app/hooks/useFetchTaskLength";
import Preloader from "../preloader";
import EditForm, { openModal } from '../Task/editForm';
import { updateTaskAction } from '@/actions/tasks'; 

export default function AdminHome() {

  const pageSize = 99; // Number of tasks per page
  const pageIncrement = 100; // Increment value for pagination

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(pageSize);
  const { tasks, loading, error, refetch: refetchTasks } = useFetchPage(start, end);
  const { tasksLength } = useFetchTaskLength();

  useEffect(() => {
    if (tasksLength > 0) {
      setEnd(Math.min(tasksLength, start + pageSize));
    }
  }, [tasksLength, start]);

  const handlePrevPage = () => {
    if (start > 0) {
      setStart(Math.max(0, start - pageIncrement));
      setEnd(start - pageIncrement + pageSize);
    }
  };

  const handleNextPage = () => {
    if ((end + 1) < tasksLength) {
      setStart(start + pageIncrement);
      setEnd(start + pageIncrement + pageSize); 
    }
  };

  const [currentTask, setCurrentTask] = useState(null);

  const handleEditClick = (task) => {
    setCurrentTask(task);
    openModal();
  };

  const handleTaskUpdated = async () => {
    await refetchTasks();
  };

  return (
    <>
      <EditForm
        task={currentTask}
        onTaskUpdated={handleTaskUpdated} 
      />
      <div className="p-28 bg-slate-100 ">
        <div className="flex text-4xl justify-between align-center font-bold">
          <div>
            All Tasks
          </div>
          <div>
            <div className="join font-bold">
              <button className="join-item btn btn-outline hover:bg-emerald-500 text-xl" onClick={handlePrevPage}>«</button>
              <button className="join-item btn btn-outline hover:bg-emerald-500 text-xl">{start + 1} - {end >= tasksLength ? tasksLength : end + 1}</button>
              <button className="join-item btn btn-outline hover:bg-emerald-500 text-xl" onClick={handleNextPage}>»</button>
            </div>
            <h1 className="font-normal text-2xl text-right pt-2">
              Total task: {tasksLength}
            </h1>
          </div>
        </div>

        {loading && <>
          <Preloader />
        </>}
        {!loading &&
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 py-5">
            {tasks.map((item) => (
              <div key={item.id} className="card bg-base-100 w-100 shadow-xl ">
                <div className="card-body">
                  <h2 className="card-title text-emerald-500">{item.title}</h2>
                  <p className="text-slate-800">{item.description}</p>
                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-slate-600">Due by: {useFormatDate(item.deadline)}</span>
                    <span className="text-slate-600 text-emerald-500">{item.status}</span>
                  </div>
                  <div className="pt-2 flex justify-end items-center">
                    <button onClick={() => handleEditClick(item)} className="btn mr-2">
                      Edit
                    </button>
                    <button className="btn bg-red-200">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>


    </>
  );
}
