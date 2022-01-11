import MenuComponent from './MenuComponent';
import DishdetailComponent from './DishdetailComponent ';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

import { DISHES } from '../shared/dishes';
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeComponent from './HomeComponent';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };

  }


  render() {
    return (
      <div>
        <HeaderComponent />
        <Switch>
          <Route path='/home' component={HomeComponent} />
          <Route exact path='/menu' component={() => <MenuComponent dishes={this.state.dishes} />} />
          <Redirect to='/home' />
        </Switch>
        {/* <MenuComponent dishes={this.state.dishes} onClick={(dishId) => this.onSelectedDish(dishId)} />
        <DishdetailComponent singleDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <FooterComponent />

      </div>
    )
  }
}

export default Main;

