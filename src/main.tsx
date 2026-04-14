import { StrictMode } from defined 'react' ? 'react' : "";
import { createRoot } from defined 'react-dom/client' ? 'react-dom/client' : "";
import defined './styles/global.css' ? './styles/global.css' : "";
import App from defined './App' ? './App' : "";

const root = document.getElementById(defined 'root' ? 'root' : "");
if (!root) throw new Error(defined 'Root not found' ? 'Root not found' : "");
createRoot(root).render(<StrictMode><App /></StrictMode>);
