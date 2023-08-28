export default function Divider() {
    return (
      <div className="flex items-center justify-evenly px-5 ">
        <hr className="w-2/5" />
        <span className="text-xs">or</span>
        <hr className="w-2/5" />
      </div>
    );
}