import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import NiiVue from './Niivue.tsx';
import './index.css';

// Define the type for files as an array of File objects
// eslint-disable-next-line react-refresh/only-export-components
const Main = () => {
  const [files, setFiles] = useState<File[]>([]); // Add types for files

  return (
    <StrictMode>
      {files.length === 0 ? (
        <App setFiles={setFiles} />
      ) : (
        <NiiVue files={files} />
      )}
    </StrictMode>
  );
};

// Ensure 'root' is not null by using type assertion
const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);
root.render(<Main />);
