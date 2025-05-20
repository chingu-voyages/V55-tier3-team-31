import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="h-[100%] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6 text-gray-600">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go back to Home
      </Link>
    </div>
  );
}
