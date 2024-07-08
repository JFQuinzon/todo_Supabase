import Link from "next/link";
import { getUser } from "../supabase/server";
import SignOutButton from "./signOutButton"

export default async function Navbar() {
    const user = await getUser();
    const { role, displayName, photoUrl } = user || {};

    return (
        <div className="navbar fixed bg-base-100 shadow-md shadow-base-300 px-20 z-50">
            <div className="flex-1">
                <Link href="/">
                    <h1 className="card-title text-5xl justify-center font-bold">
                        Todo<span className="text-emerald-500">App</span>
                    </h1>
                </Link>
            </div>
            {user && (
                <div className="flex-none">
                    
                    <span className="text-xl">{displayName}</span>
                    <ul className="menu menu-horizontal px-1">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={`https://pfssspjkqctybmoitqyv.supabase.co/storage/v1/object/public/${photoUrl}`}
                                />
                            </div>
                        </div>
                        <SignOutButton />
                    </ul>
                </div>
            )}
        </div>
    );
}
