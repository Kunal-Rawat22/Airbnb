import LoginHeader from "../../Components/Pages/LoginPage/LoginHeader";
import LoginForm from "../../Components/Pages/LoginPage/LoginForm";
import LoginBtn from "../../Components/Pages/LoginPage/LoginBtn";
import Divider from "../../Components/Pages/LoginPage/Divider";
export default function LoginPage() {
  return (
    <div className="flex flex-col border border-1 w-2/5 mx-auto rounded-2xl mt-10">
      <LoginHeader />
      <LoginForm />
      <Divider />
      <LoginBtn />
    </div>
  );
}
