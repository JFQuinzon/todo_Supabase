import AdminHome from "./components/Home/adminHome";
import UserHome from "./components/Home/userHome";
import SignInForm from "./components/SignIn/signinForm";
import { getUser } from "./supabase/server";

export default async function Home() {
  const user = await getUser();

  return (
    <div>
      {!user && <SignInForm />}
      {user && (
        user.role === "admin" ? (
          <AdminHome />
        ) : (
          <UserHome />
        )
      )}
    </div>
  );
}
