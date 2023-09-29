import RegisterHeader from "../../Components/Pages/RegisterPage/RegisterHeader";
import RegisterBtn from "../../Components/Pages/RegisterPage/RegisterBtn";
import RegisterForm from "../../Components/Pages/RegisterPage/RegisterForm";
import Divider from "../../Components/Pages/LoginPage/Divider";
export default function RegisterPage() {
  return (
    <div className="flex flex-col border border-1 w-2/5 mx-auto rounded-2xl mt-10 pb-4" >
      <RegisterHeader />
      <RegisterForm />
      <Divider />
      <RegisterBtn />
    </div>
  );
}
