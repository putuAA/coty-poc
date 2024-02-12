// src/components/Navbar.tsx

import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <h1 className="font-bold mb-3 text-3xl text-center clear-both p-3">
        Shopify + Next.js 13!
      </h1>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
          </li>
          {/* <li>
            <Link href="/cart" className="text-blue-600 hover:underline">
              Cart(0)
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
