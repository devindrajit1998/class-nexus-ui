
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { UserRoleProvider } from './hooks/use-user-role';

createRoot(document.getElementById("root")!).render(
  <UserRoleProvider>
    <App />
  </UserRoleProvider>
);
