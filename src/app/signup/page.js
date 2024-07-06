"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import useSignup from "../hooks/auth/useSignup";
import useRedirect from "../hooks/protectRoutes/useRedirect";
import Preloader from "../admin/components/preloader";

export default function Signup() {
  const { redirectToHome, isLoading } = useRedirect();
  redirectToHome()

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const { signup, loading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(displayName, email, password, thumbnail);
    redirectToHome()
  };

  const handleFileChange = (e) => {
    let selected = e.target.files[0];
    setThumbnail(selected);
  };

  return (
    <>
      {isLoading ? <Preloader /> : (
        <>
          <div className="flex justify-center items-center h-screen">
            <div className="card w-96 shadow-2xl bg-slate-100">
              <div className="card-body">
                <h1 className="card-title text-5xl justify-center font-bold">
                  Todo<span className="text-emerald-500">App</span>
                </h1>
                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                  <h1 className="card-title text-2xl justify-center">Sign up</h1>
                  <form className="space-y-6"><div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Display Name
                    </label>
                    <div className="mt-2">
                      <input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          id="password"
                          name="password"
                          type="password"
                          required
                          autoComplete="current-password"
                          className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="profile"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Profile Picture
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          onChange={handleFileChange}
                          id="profile"
                          name="profile"
                          type="file"
                          required
                          autoComplete="profile"
                          className="text-center block w-full "
                        />
                      </div>
                    </div>

                    <div>
                      {!loading &&
                        <button
                          onClick={handleSubmit}
                          type="submit"
                          className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white btn btn-primary"
                        >
                          Sign in
                        </button>}
                      {loading &&
                        <button
                          onClick={handleSubmit}
                          type="submit"
                          disabled
                          className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white btn btn-primary"
                        >
                          Signing in...
                        </button>}
                    </div>
                  </form>

                  <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?{" "}
                    <span className="font-bold hover:text-accent transition-all">
                      <Link href="/">Sign in</Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
