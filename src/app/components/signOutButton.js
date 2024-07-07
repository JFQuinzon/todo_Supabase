"use client"
import { logoutAction } from "@/actions/users";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function SignOutButton() {
    const router = useRouter();

    const [isPending, startTransition] = useTransition()

    const handleSubmit = () => {
        startTransition(async () => {
            const { errorMessage } = await logoutAction()

            if (errorMessage) {
                toast.error(errorMessage)
            } else {
                router.push("/")
                toast.success("Successfully signed out")
            }
        })
    };
    return (
        <button className="btn btn-ghost btn-circle" onClick={handleSubmit}>
            {!isPending &&
                <div className="indicator">
                    <svg width="25px" height="25px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 7.5L10.5 10.75M13.5 7.5L10.5 4.5M13.5 7.5L4 7.5M8 13.5H1.5L1.5 1.5L8 1.5" stroke="#000000" />
                    </svg>
                </div>
            }
            {isPending &&
                <div className="indicator">
                    <span className="loading loading-spinner loading-md"></span>
                </div>
            }
        </button>
    );
}
