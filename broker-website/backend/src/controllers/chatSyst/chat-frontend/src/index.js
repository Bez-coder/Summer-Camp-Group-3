import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// If you want to keep web vitals reporting, import it correctly
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If not using web vitals, comment this out
// reportWebVitals();
