export default function Navbar() {
  return (
    <nav className="navbar flex fixed top-0 bg-white z-50 w-screen justify-start space-x-6 lg:px-40 md:px-20 px-6 border-b items-center text-sm font-medium ">
      <div className=" h-20 hover:border-b-4 hover:border-black text-center py-8">
        Photos
      </div>
      <div className=" h-20 hover:border-b-4 hover:border-black py-8">
        Location
      </div>
      <div className=" h-20 hover:border-b-4 hover:border-black py-8">
        Amenities
      </div>
      <div className="h-20 hover:border-b-4 hover:border-black py-8">Owner</div>
    </nav>
  );
}
