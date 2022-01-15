import MenuComponent from './MenuComponent';
import DishdetailComponent from './DishdetailComponent ';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';



import React, { Component } from 'react';
import { Redirect, Route, Switch ,withRouter } from 'react-router-dom';
import HomeComponent from './HomeComponent';
import ContactComponent from './ContactComponent';
import AboutComponent from './AboutComponent';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders

  }
}

class Main extends Component {

  constructor(props) {
    super(props);


  }

  render() {

    const Home = () => {
      return(
        <HomeComponent 
              dish={this.props.dishes.filter((dish)=> dish.featured )[0]} 
              promotion={this.props.promotions.filter((promo)=> promo.featured )[0]}
              leader={this.props.leaders.filter((leader)=> leader.featured )[0]}
             />
      );
    }

    const About = () => {
      return(
        <AboutComponent 
              leaders={this.props.leaders}
             />
      );
    }

    const RenderDishDetailComponent =({match})=>{
      return(
        <DishdetailComponent 
        singleDish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
        )
    }

    

    return (
      <div>
        <HeaderComponent />
        <Switch>
          <Route path='/home' component={Home} />
          <Route exact path='/aboutus' component={About} />

          <Route exact path='/menu' component={() => <MenuComponent dishes={this.props.dishes} />} />
          <Route  path='/menu/:dishId' component={RenderDishDetailComponent} />

          <Route exact path='/contactus' component={ContactComponent} />
          <Redirect to='/home' />
        </Switch>
        <FooterComponent />

      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(Main));


