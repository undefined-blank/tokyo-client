/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div className="flex flex-col items-center gap-2 p-8">
      <h1>Oops! 😭</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>

      <Link to={"/"} className="w-fit border border-gray-600 p-2 rounded">
        ← Reload the app
      </Link>
    </div>
  );
}
