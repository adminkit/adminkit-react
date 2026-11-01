import { Link } from "react-router";

export default function Page() {
  return (
    <div className="text-center">
      <h1 className="display-1 fw-bold">500</h1>
      <p className="h2">Internal server error.</p>
      <p className="lead fw-normal mt-3 mb-4">
        The server encountered something unexpected that didn&apos;t allow it to
        complete the request.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        Return to website
      </Link>
    </div>
  );
}
