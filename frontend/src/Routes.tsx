import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import HomePage from './pages/HomePage/HomePage';
import UploadPage from './pages/UploadPage/UploadPage';
import { RoutesNames } from './config/constants/RoutesNames';

const Routes = () => {
  return (
    <Switch>
      <Route exact path={RoutesNames.HOME} component={HomePage}/>
      <Route exact path={RoutesNames.UPLOAD} component={UploadPage}/>
      <Route path={RoutesNames.NOT_FOUND} component={NotFoundPage}/>
    </Switch>
  );
};

export default Routes;
