
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { UserRoleProvider } from './hooks/use-user-role';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserRoleProvider>
      <App />
    </UserRoleProvider>
  </BrowserRouter>
);
