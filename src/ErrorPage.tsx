import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>Oops...</h1>
      <p>An error occured. Sorry about that.</p>
      <p>
        <i>
          {isRouteErrorResponse(error)
            ? error.statusText || error.data?.message
            : "Unknown error message."}
        </i>
      </p>
    </div>
  );
}
