function Nav_Bar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50bg-white bg-gradient-to-r from-purple-300 via-pink-200 to-white">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        
        <div className="flex lg:flex-1">
          <h1 className="text-2xl font-bold  text-black">InterNeo.AI</h1>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 mr-6">
            Home
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 mr-6">
            Features
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 mr-6">
            About Us
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 mr-6">
            Teams
          </a>
        </div>

      </nav>
    </header>
  );
}
export default Nav_Bar