// EditForm.js

import { updateTaskAction } from '@/actions/tasks';
import React, { useState, useEffect, useTransition } from 'react';
import toast from 'react-hot-toast';

export function openModal() {
  document.getElementById('editModal').showModal();
}

export default function EditForm({ task, onTaskUpdated }) {

  const [newFormData, setNewFormData] = useState({
    id: '',
    title: '',
    description: '',
    status: '',
    deadline: '',
  });

  useEffect(() => {
    if (task) {
      setNewFormData({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        deadline: task.deadline,
      });
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFormData({
      ...newFormData,
      [name]: value,
    });
  };

  const handleClose = () => {
    setNewFormData({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      deadline: task.deadline,
    });
  }

  const [isPending, startTransition] = useTransition()

  const handleSubmit = () => {
    startTransition(async () => {
      const { errorMessage } = await updateTaskAction(newFormData)

      if (errorMessage) {
        toast.error(errorMessage)
      } else {
        toast.success("Task Successfully Updated.")
        if (onTaskUpdated) {
          onTaskUpdated(); // Trigger the callback to refetch tasks
        } 
      }
    })
  }

  return (
    <>
      <dialog id="editModal" className="modal">
        <div className="modal-box ">
          <div>
            <h1 className="card-title text-5xl justify-center font-bold">
              Edit Task
            </h1>
            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action={handleSubmit}>
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <input
                      name="title"
                      type="text"
                      required
                      autoComplete="title"
                      value={newFormData.title}
                      onChange={handleInputChange}
                      className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      name="description"
                      required
                      autoComplete="description"
                      value={newFormData.description}
                      onChange={handleInputChange}
                      className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      rows={4} // Adjust rows as needed
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Status
                  </label>
                  <div className="mt-2">
                    <select
                      name="status"
                      value={newFormData.status}
                      onChange={handleInputChange}
                      className="select select-bordered text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="On Progress">On Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="deadline"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Deadline
                  </label>
                  <div className="mt-2">
                    <input
                      name="deadline"
                      type="date"
                      required
                      autoComplete="deadline"
                      value={newFormData.deadline}
                      onChange={handleInputChange}
                      className="text-center block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  {isPending &&
                    <button
                      disabled
                      type="submit"
                      className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white btn btn-primary"
                    >
                      Updating...
                    </button>
                  }
                  {!isPending &&
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white btn btn-primary"
                    >
                      Update
                    </button>
                  }
                </div>
              </form>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button onClick={() => handleClose()} className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
