import {Link, useLocation} from "react-router-dom";

const navItems = [
  {
    title: "Home",
    url: "/"
  },
  {
    title: "Offers",
    url: "/offers"
  },
  {
    title: "Sign In",
    url: "/sign-in"
  }
];

export default function Header() {
  const location = useLocation();

  function pathMatchRoute(route) {
    return (route === location.pathname) ? 'text-black border-b-red-500' : 'text-gray-400 border-b-transparent';
  }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <Link to={"/"} className="py-3">
          <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo" className="h-5" />
        </Link>
        <nav>
          <ul className="flex space-x-10">
            {navItems.map((item, index) => (
              <li key={index} className={`text-sm font-semibold border-b-[3px] ${pathMatchRoute(item.url)}`}>
                <Link to={item.url} className="inline-block py-3">{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  )
}
