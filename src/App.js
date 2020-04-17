import React,{Suspense} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

// import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
// import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import {useAuth} from './shared/hooks/auth-hook';
import LoadinSpinner from './shared/components/UIElements/LoadingSpinner';

const Users =React.lazy(()=>import('./user/pages/Users'));
const UpdatePlace =React.lazy(()=>import('./places/pages/UpdatePlace'));

const App = () => {

  const {token,userId,login,logout}=useAuth();
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
         isLoggedIn:!!token,
         token: token,
         userId: userId,
         login: login,
         logout: logout
         }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
          fallback={
            <div className='center'>
              <LoadinSpinner/>
            </div>
          }>
          {routes}
          </Suspense>
          </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
