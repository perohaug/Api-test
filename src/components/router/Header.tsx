import { Link } from 'react-router-dom';
import { Router } from './Router';

export const Header = () => (
  <div className="bg-gray-100 w-full">
    <nav className="p-4 grid-rows-2 flex items-center justify-between">
      <Link className="text-2xl font-semibold whitespace-nowrap dark:text-white" to="/">
        Home
      </Link>
      <Link className="text-2xl font-semibold whitespace-nowrap dark:text-white" to="/AQ">
        AQ
      </Link>
      {/* Add more navigation links as needed */}
    </nav>
  </div>
);
