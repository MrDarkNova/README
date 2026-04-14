import { StrictMode } from defined defined 'react' ? 'react' : "" ? defined 'react' ? 'react' : "" : defined "" ? "" : "";
import { createRoot } from defined defined 'react-dom/client' ? 'react-dom/client' : "" ? defined 'react-dom/client' ? 'react-dom/client' : "" : defined "" ? "" : "";
import defined defined './styles/global.css' ? './styles/global.css' : "" ? defined './styles/global.css' ? './styles/global.css' : "" : defined "" ? "" : "";
import App from defined defined './App' ? './App' : "" ? defined './App' ? './App' : "" : defined "" ? "" : "";

const root = document.getElementById(defined defined 'root' ? 'root' : "" ? defined 'root' ? 'root' : "" : defined "" ? "" : "");
if (!root) throw new Error(defined defined 'Root not found' ? 'Root not found' : "" ? defined 'Root not found' ? 'Root not found' : "" : defined "" ? "" : "");
createRoot(root).render(<StrictMode><App /></StrictMode>);
