import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <h1>Welcome to Our Todo App!</h1>
            <p>This is our awesome landing page.</p>
            <Link to="/todo">Go to Todo App</Link>
        </div>
    );
};

export default LandingPage;
