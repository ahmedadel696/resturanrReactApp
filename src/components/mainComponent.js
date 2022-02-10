import MenuComponent from './MenuComponent';
import DishdetailComponent from './DishdetailComponent ';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';



import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import HomeComponent from './HomeComponent';
import ContactComponent from './ContactComponent';
import AboutComponent from './AboutComponent';
import { connect } from 'react-redux';

import { actions } from 'react-redux-form';

import { postComment, fetchDishes,fetchLeaders, fetchComments, fetchPromos, postFeedback } from '../redux/ActionCreator';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,

  }
}

const mapDispatchToProps = dispatch => ({

  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  fetchLeaders: () => { dispatch(fetchLeaders()) },
  fetchComments: () => { dispatch(fetchComments()) },
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }

});
class Main extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {

    this.props.fetchPromos();
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchLeaders();
  }

  render() {

    const Home = () => {
      return (
        <HomeComponent
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promotionsLoading={this.props.promotions.isLoading}
          promotionsErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />
      );
    }

    const About = () => {
      return (
        <AboutComponent
          leaders={this.props.leaders.leaders}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />
      );
    }

    const RenderDishDetailComponent = ({ match }) => {
      return (
        <DishdetailComponent
          singleDish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      )
    }



    return (
      <div>
        <HeaderComponent />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames='page' timeout={300} >
            <Switch>
              <Route path='/home' component={Home} />
              <Route exact path='/aboutus' component={About} />

              <Route exact path='/menu' component={() => <MenuComponent dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={RenderDishDetailComponent} />

              <Route exact path='/contactus' component={() => <ContactComponent resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
              <Redirect to='/home' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <FooterComponent />

      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));


