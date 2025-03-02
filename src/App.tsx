import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardView from './public/home';
import LoginView from './public/login';
import ProgressPage from './public/progress';
import RegistrationView from './public/registration';


// Create a QueryClient instance
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginView/>,
  },

  {
    path: '/register',
    element: <RegistrationView/>,
  },

  {
    path: '/dashboard',
    element: <DashboardView/>,
  },
  {
    path: '/progress',
    element: <ProgressPage/>,
  },


]);

function App() {
  return (
    <>
      {/* Wrap the RouterProvider with QueryClientProvider */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;