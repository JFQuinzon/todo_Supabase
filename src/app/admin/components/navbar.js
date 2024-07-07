
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="navbar fixed bg-base-100 shadow-md shadow-base-300 px-20 z-50">
            <div className="flex-1">
                <Link href="/admin">
                    <h1 className="card-title text-5xl justify-center font-bold">
                        Todo<span className="text-emerald-500">App</span>
                    </h1>
                </Link>
            </div>
            <div className="flex-none">
                <Link href="/admin/newtask" className="btn mr-5">New Task</Link>
                <span className=" text-xl">Admin</span>

                <ul className="menu menu-horizontal px-1">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg width="25px" height="25px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5 7.5L10.5 10.75M13.5 7.5L10.5 4.5M13.5 7.5L4 7.5M8 13.5H1.5L1.5 1.5L8 1.5" stroke="#000000" />
                            </svg>
                        </div>
                    </button>

                </ul>
            </div>
        </div>

    )
}