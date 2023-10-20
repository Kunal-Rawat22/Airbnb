import LoginHeader from "../../Components/Pages/LoginPage/LoginHeader";
import LoginForm from "../../Components/Pages/LoginPage/LoginForm";
import LoginBtn from "../../Components/Pages/LoginPage/LoginBtn";
import Divider from "../../Components/Pages/LoginPage/Divider";
export default function LoginPage() {
  return (
    <div className="flex flex-col border border-1 lg:w-2/5 md:w-8/12 sm:w-2/3 w-10/12 mx-auto rounded-2xl mt-10 mb-10">
      <LoginHeader />
      <LoginForm />
      <Divider />
      <LoginBtn />
    </div>
  );
}
