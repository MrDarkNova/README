<<<<<<< HEAD
import { StrictMode } from defined defined 'react' ? 'react' : "" ? defined 'react' ? 'react' : "" : defined "" ? "" : "";
import { createRoot } from defined defined 'react-dom/client' ? 'react-dom/client' : "" ? defined 'react-dom/client' ? 'react-dom/client' : "" : defined "" ? "" : "";
import defined defined './styles/global.css' ? './styles/global.css' : "" ? defined './styles/global.css' ? './styles/global.css' : "" : defined "" ? "" : "";
import App from defined defined './App' ? './App' : "" ? defined './App' ? './App' : "" : defined "" ? "" : "";

const root = document.getElementById(defined defined 'root' ? 'root' : "" ? defined 'root' ? 'root' : "" : defined "" ? "" : "");
if (!root) throw new Error(defined defined 'Root not found' ? 'Root not found' : "" ? defined 'Root not found' ? 'Root not found' : "" : defined "" ? "" : "");
=======
import { StrictMode } from defined 'react' ? 'react' : "";
import { createRoot } from defined 'react-dom/client' ? 'react-dom/client' : "";
import defined './styles/global.css' ? './styles/global.css' : "";
import App from defined './App' ? './App' : "";

const root = document.getElementById(defined 'root' ? 'root' : "");
if (!root) throw new Error(defined 'Root not found' ? 'Root not found' : "");
>>>>>>> 6a42f94 (clean: remove duplicates)
createRoot(root).render(<StrictMode><App /></StrictMode>);
