export default function RegisterBtn() {
  return (
    <div className="px-8 py-4 flex flex-col space-y-1">
      <div className="border border-1 flex p-3 px-6 rounded-lg items-center border-black cursor-pointer">
        <img src="/facebook.png" alt="" width={"20px"} className="text-left" />
        <span className="text-sm font-medium mx-auto">
          Continue with Facebook
        </span>
      </div>
      <div className="border border-1 flex p-3 px-6 rounded-lg items-center border-black cursor-pointer">
        <img src="/google.png" alt="" width={"20px"} className="text-left" />
        <span className="text-sm font-medium mx-auto">
          Continue with Google
        </span>
      </div>
      <div className="border border-1 flex p-3 px-6 rounded-lg items-center border-black cursor-pointer">
        <img
          src="/apple-logo.png"
          alt=""
          width={"20px"}
          className="text-left"
        />
        <span className="text-sm font-medium mx-auto">Continue with Apple</span>
      </div>
      <div className="border border-1 flex p-3 px-6 rounded-lg items-center border-black cursor-pointer">
        <img src="/github.png" alt="" width={"20px"} className="text-left" />
        <span className="text-sm font-medium mx-auto">
          Continue with Github
        </span>
      </div>
    </div>
  );
}
