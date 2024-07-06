import { redirect } from "next/navigation";
import useGetCurrentUser from "../auth/useGetCurrentUser";
import { useEffect } from "react";


function useRedirect() {
    const { session, user, isLoading } = useGetCurrentUser()

    const redirectToHome = async () => {

        useEffect(() => {
            if (session) {
                console.log(session);
                console.log('Fetched user data:', user);
                if (user?.role === "user") {
                    redirect("/home"); // Redirect to '/home' for users
                } else if (user?.role === "admin") {
                    redirect("/admin"); // Redirect to '/admin' for admins
                }
            }
        }, [session]);
    }

    const redirectToIndex = async () => {
        // console.log(session);

        useEffect(() => {
            if (!session) {
                redirect("/");
            }
        }, [session]);
    }

    return { redirectToHome, redirectToIndex, isLoading }
}
export default useRedirect;
