import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import PracticePage from './pages/PracticePage';
import AssessmentsPage from './pages/AssessmentsPage';
import ResourcesPage from './pages/ResourcesPage';
import ProfilePage from './pages/ProfilePage';
import TestChecklistPage from './pages/TestChecklistPage';
import ShipLockPage from './pages/ShipLockPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'practice', element: <PracticePage /> },
      { path: 'assessments', element: <AssessmentsPage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  {
    path: '/prp/07-test',
    element: <TestChecklistPage />,
  },
  {
    path: '/prp/08-ship',
    element: <ShipLockPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
