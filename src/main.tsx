import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Starting MoodFlix app...');

try {
  const root = document.getElementById("root");
  if (!root) {
    console.error('Root element not found!');
  } else {
    console.log('Root element found, creating React root...');
    createRoot(root).render(<App />);
    console.log('App rendered successfully!');
  }
} catch (error) {
  console.error('Error starting app:', error);
}
