import {Link} from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="max-w-6xl mx-auto mb-6 px-3 text-center">
      <h1 className="text-3xl mt-6 font-bold mb-6">We couldn’t find what you’re looking for.</h1>
      <p>
        The page you are looking for moved or doesn't exist anymore. Go back to the&nbsp;
        <Link to="/" className="underline">homepage</Link>
        &nbsp;to try a different search.
      </p>
    </div>
  );
}
