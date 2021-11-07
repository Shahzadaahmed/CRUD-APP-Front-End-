// Note: AppRoutes component...!

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
}
  from "react-router-dom";

// Note: Importing required components...!
import CreateUserScreen from "./components/create-user";
import UsersList from "./components/users-list";
import NotFound from "./components/not-found";

const AppRoutes = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<CreateUserScreen />} />
          <Route path="/users-list" element={<UsersList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default AppRoutes;