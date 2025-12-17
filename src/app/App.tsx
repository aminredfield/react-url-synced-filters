import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CatalogPage from '../pages/CatalogPage';

/**
 * The root application component defines routes for the app. At the moment
 * there is a single catalog page at the root path. Additional routes can
 * be added here in the future if the project grows.
 */
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
    </Routes>
  );
};

export default App;