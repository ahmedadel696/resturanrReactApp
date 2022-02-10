import * as ActionTypes from './ActionTypes';
import { BASE_URL } from '../shared/base_url';


export const fetchComments = () => (dispatch) => {    
    return fetch(BASE_URL + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});


export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(BASE_URL + 'dishes')
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
}

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));
    return fetch(BASE_URL + 'promotions')
        .then(response => response.json())
        .then(promotions => dispatch(addPromos(promotions)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const addPromos = (promotions) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promotions
});


