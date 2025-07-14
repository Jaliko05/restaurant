import { Outlet, useNavigate } from "react-router";

// Tipos que coinciden con el backend
type UserRole = "USER" | "ADMIN";

const navConfig = [
  {
    label: "Productos",
    path: "/dashboard/productos",
    roles: ["ADMIN"] as UserRole[],
  },
  {
    label: "Órdenes",
    path: "/dashboard/ordenes",
    roles: ["ADMIN", "USER"] as UserRole[],
  },
  { label: "Salir", action: true, roles: ["ADMIN", "USER"] as UserRole[] },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  // Obtiene el role desde localStorage
  const role = JSON.parse(localStorage.getItem("user") || "{}")
    .role as UserRole;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              {navConfig.map(
                (item) =>
                  item.roles.includes(role) &&
                  (item.action ? (
                    <button
                      key={item.label}
                      onClick={handleLogout}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <button
                      key={item.label}
                      onClick={() => {
                        if (item.path) {
                          navigate(item.path);
                        }
                      }}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      {item.label}
                    </button>
                  ))
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Abrir menú principal</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
            {navConfig.map(
              (item) =>
                item.roles.includes(role) &&
                (item.action ? (
                  <button
                    key={item.label}
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  >
                    {item.label}
                  </button>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.path) {
                        navigate(item.path);
                      }
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {item.label}
                  </button>
                ))
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
