export default function LoginBtn() {
  function googleAuth() {
    window.open(`http://localhost:4000/auth/google/callback`, "_self");
  }
  function fbAuth() {
    window.open(`http://localhost:4000/auth/facebook/callback`, "_self");
  }
  function gbAuth() {
    window.open(`http://localhost:4000/auth/github/callback`, "_self");
  }
  return (
    <div className="px-8 py-4 flex flex-col space-y-1">
      <button
        className="border border-1 flex p-3 px-6 rounded-lg items-center border-black cursor-pointer"
        onClick={fbAuth}
      >
        <img src="/facebook.png" alt="" width={"20px"} className="text-left" />
        <span className="text-sm font-medium mx-auto">
          Continue with Facebook
        </span>
      </button>
      <button
        className="border border-1 flex p-3 px-6 rounded-lg items-center border-black cursor-pointer"
        onClick={googleAuth}
      >
        <img src="/google.png" alt="" width={"20px"} className="text-left" />
        <span className="text-sm font-medium mx-auto">
          Continue with Google
        </span>
      </button>
      <div className="border border-1 flex p-3 px-6 rounded-lg items-center border-black cursor-pointer">
        <img
          src="/apple-logo.png"
          alt=""
          width={"20px"}
          className="text-left"
        />
        <span className="text-sm font-medium mx-auto">Continue with Apple</span>
      </div>
      <button
        className="border border-1 flex p-3 px-6 rounded-lg items-center border-black cursor-pointer"
        onClick={gbAuth}
      >
        <img src="/github.png" alt="" width={"20px"} className="text-left" />
        <span className="text-sm font-medium mx-auto">
          Continue with Github
        </span>
      </button>
    </div>
  );
}
