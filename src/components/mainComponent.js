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

import { actions } from 'react-redux-form';

import { addComment , fetchDishes , fetchComments, fetchPromos  } from '../redux/ActionCreator';
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders

  }
}

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  fetchPromos: () => { dispatch(fetchPromos())},
  fetchComments : ()=> { dispatch(fetchComments())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}

});
class Main extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount(){
    
    this.props.fetchPromos();
    this.props.fetchDishes();
    this.props.fetchComments();
  }

  render() {

    const Home = () => {
      return(
        <HomeComponent 
              dish={this.props.dishes.dishes.filter((dish)=> dish.featured )[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess} 
              promotion={this.props.promotions.promotions.filter((promo)=> promo.featured )[0]}
              promotionsLoading={this.props.promotions.isLoading}
              promotionsErrMess={this.props.promotions.errMess} 
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
        singleDish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        addComment ={this.props.addComment}
        />
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

          <Route exact path='/contactus' component={() => <ContactComponent resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Redirect to='/home' />
        </Switch>
        <FooterComponent />

      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(Main));


