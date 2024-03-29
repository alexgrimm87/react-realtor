import {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default function Header() {
  const [pageState, setPageState] = useState("Sign in");
  const location = useLocation();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign in");
      }
    });
  }, [auth]);

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <Link to={"/"} className="py-3">
          <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo" className="h-5" />
        </Link>
        <nav className="ml-5">
          <ul className="flex space-x-3 sm:space-x-10">
            <li className={`cursor-pointer text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
              pathMatchRoute("/") && "!text-black !border-b-red-500"}`}>
              <Link to="/" className="inline-block py-3">Home</Link>
            </li>
            <li className={`cursor-pointer text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
              pathMatchRoute("/offers") && "!text-black !border-b-red-500"}`}>
              <Link to="/offers" className="inline-block py-3">Offers</Link>
            </li>
            <li className={`cursor-pointer text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
              (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
              "!text-black !border-b-red-500"}`}>
              <Link to="/profile" className="inline-block py-3">{pageState}</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
