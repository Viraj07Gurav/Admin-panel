export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-10 relative bottom-0 w-full ">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          
          {/* Left Section - Logo & Copyright */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold">Your Logo</h2>
            <p className="text-sm text-gray-400">© 2024 Your Company. All rights reserved.</p>
          </div>
  
          {/* Middle Section - Navigation Links */}
          <nav className="flex flex-col space-x-6 my-4 md:my-0">
            <a href="#" className="hover:text-gray-400">Home</a>
            <a href="#" className="hover:text-gray-400">About Us</a>
            <a href="#" className="hover:text-gray-400">Features</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
          </nav>
  
          {/* Right Section - Social Media */}
          <div className="flex flex-col space-x-4">
            <a href="#" className="hover:text-gray-400">Facebook</a>
            <a href="#" className="hover:text-gray-400">Twitter</a>
            <a href="#" className="hover:text-gray-400">Instagram</a>
          </div>
  
        </div>
      </footer>
    );
  }
  