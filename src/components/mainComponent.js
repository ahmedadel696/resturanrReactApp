import MenuComponent from './MenuComponent';
import DishdetailComponent from './DishdetailComponent ';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeComponent from './HomeComponent';
import ContactComponent from './ContactComponent';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,

    };

  }




  render() {

    const Home = () => {
      return(
        <HomeComponent 
              dish={this.state.dishes.filter((dish)=> dish.featured )[0]} 
              promotion={this.state.promotions.filter((promo)=> promo.featured )[0]}
              leader={this.state.leaders.filter((leader)=> leader.featured )[0]}
             />
      );
    }
    return (
      <div>
        <HeaderComponent />
        <Switch>
          <Route path='/home' component={Home} />
          <Route exact path='/menu' component={() => <MenuComponent dishes={this.state.dishes} />} />
          <Route exact path='/contactus' component={ContactComponent} />
          <Redirect to='/home' />
        </Switch>
        <FooterComponent />

      </div>
    )
  }
}

export default Main;

