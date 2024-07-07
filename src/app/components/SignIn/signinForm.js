"use client"
import { loginAction } from "@/actions/users";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function SignInForm() {
    const router = useRouter();

    const [isPending, startTransition] = useTransition()

    const handleSubmit = (formData) => {
        startTransition(async () => {
            const { errorMessage } = await loginAction(formData)

            if (errorMessage) {
                toast.error(errorMessage)
            } else {
                router.push("/")
                toast.success("Successfully logged in ")
            }
        })
    };
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="card w-96 shadow-2xl bg-slate-100">
                    <div className="card-body">
                        <h1 className="card-title text-5xl justify-center font-bold">
                            Todo<span className="text-emerald-500">App</span>
                        </h1>
                        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" action={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            disabled={isPending}
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
                                            disabled={isPending}
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
                                    {isPending && <button
                                        disabled
                                        type="submit"
                                        className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white btn btn-primary"
                                    >
                                        Signing in...
                                    </button>}
                                    {!isPending && <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white btn btn-primary"
                                    >
                                        Sign in
                                    </button>}
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Not on TodoApp yet?{" "}
                                <span className="font-bold hover:text-accent transition-all">
                                    <Link href="/signup">Sign up</Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
