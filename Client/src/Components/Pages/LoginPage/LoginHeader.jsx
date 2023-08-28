import { Link } from "react-router-dom";
export default function LoginHeader()
{
    return (
      <div>
        <div className="LoginHeader flex items-center p-4 px-8">
          <Link to={"/"} className="fa-solid fa-x text-xs"></Link>
          <p className="font-bold mx-auto">Log in</p>
        </div>
        <hr />
      </div>
    );

}