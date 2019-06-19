import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
// Component tabs
import HomeTab from './HomeTab';
import MyPicksTab from './MyPicksTab';
import LoginTab from './LoginTab';
import FavoritesTab from './FavoritesTab';
import DrawingsTab from './DrawingsTab';
import WhiteballNumbersTab from './WhiteballNumbersTab';
import PowerballNumbersTab from './PowerballNumbersTab';
import JackpotsTab from './JackpotsTab';
import EditProfileTab from './EditProfileTab';
import CreateAccountTab from './CreateAccountTab';
import NumberTab from './NumberTab';

var currentRoute = '';

const getParentPathname = pathname => 
  pathname === '/'
    ? ''
    : (/([a-zA-Z])([^/]*)/).exec(pathname)[0];

const TabRoutes = ({ location }) => {

  // For nested routes we do not want to have transitions
  const nextRoute = getParentPathname(location.pathname);
  const isAnimated = 
        !currentRoute.includes(nextRoute) || 
        !nextRoute.includes(currentRoute)
  currentRoute = nextRoute;

  return (
    <div className="tab-content-no" style={{padding: ".75rem"}} id="myTabs">
      <TransitionGroup className="transition-group" enter={isAnimated} exit={isAnimated}>
        <CSSTransition key={location.key} classNames={"tab-fade"} timeout={{ enter: 300, exit: 300 }}>
          <section className="route-section">
            <Switch location={location}>
              <Route exact path='/' component={HomeTab}/>
              <Route path='/mypicks' component={MyPicksTab}/>
              <Route path='/favorites' component={FavoritesTab}/>
              <Route path='/drawings/:pageSize/:page' component={DrawingsTab}/>
              <Route path='/whiteballnumbers' component={WhiteballNumbersTab}/>
              <Route path='/powerballnumbers' component={PowerballNumbersTab}/>
              <Route path='/jackpots' component={JackpotsTab}/>
              <Route path='/login' component={LoginTab}/>
              <Route path='/editprofile' component={EditProfileTab}/>
              <Route path='/createaccount' component={CreateAccountTab}/>
              <Route path='/number/:numberType/:id' component={NumberTab}/>
              <Route render={() => <div>Not Found</div>}/>
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
};

export default withRouter(TabRoutes);
