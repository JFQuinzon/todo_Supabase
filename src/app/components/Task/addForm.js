import { createTaskAction } from '@/actions/tasks';
import React, { useState, useTransition } from 'react';
import toast from 'react-hot-toast';

export function addModal() {
  document.getElementById('addModal').showModal();
}

export default function AddForm({ onTaskUpdated }) {
  const [isPending, startTransition] = useTransition();

  // State for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(async () => {
      const formData = { title, description, status, deadline };
      const { error } = await createTaskAction(formData);
      
      if (error) {
        toast.error(error);
      } else {
        if (onTaskUpdated) {
          onTaskUpdated();
          toast.success("Task Successfully Created.");
          // Clear the form
          setTitle('');
          setDescription('');
          setStatus('Not Started');
          setDeadline('');
        }
      }
      document.getElementById('closeAddModal').click();
    });
  };

  const handleClose = () => {
    // Reset form if necessary
    setTitle('');
    setDescription('');
    setStatus('Not Started');
    setDeadline('');
  };

  return (
    <>
      <dialog id="addModal" className="modal">
        <div className="modal-box ">
          <div>
            <h1 className="card-title text-5xl justify-center font-bold">
              Add Task
            </h1>
            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      autoComplete="title"
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      autoComplete="description"
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
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
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
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      required
                      autoComplete="deadline"
                      className="text-center block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  {isPending ? (
                    <button
                      disabled
                      type="submit"
                      className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white btn btn-primary"
                    >
                      Adding...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white btn btn-primary"
                    >
                      Add
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button
                id="closeAddModal"
                onClick={() => handleClose()}
                className="btn"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
