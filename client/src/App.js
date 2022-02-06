import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';

const App = () => {
	return (
		<div>
			<Navbar />
			<BrowserRouter>
				<Route path="/" exact component={Landing} />
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/dashboard" exact component={Dashboard} />
			</BrowserRouter>
		</div>
	);
};

export default App;
