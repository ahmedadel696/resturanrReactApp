import * as ActionTypes from './ActionTypes';
import { BASE_URL } from '../shared/base_url';


export const fetchComments = () => (dispatch) => {
    return fetch(BASE_URL + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error' + response.status + ' : ' + response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});
export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});



export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return fetch(BASE_URL + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error : ' + response.status + ' : ' + response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(response => response.json())
        .then(comment => dispatch(addComment(comment)))
        .catch(error => { console.log('post comments', error.message); alert('Your comment could not be posted\nError: ' + error.message); });
}

export const postFeedback = (firstname, lastname, telnum, email,agree,contactType,message) => (dispatch) => {
    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    };

    return fetch(BASE_URL + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                // alert(response.json());
                return response;
            } else {
                var error = new Error('Error : ' + response.status + ' : ' + response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(response => response.json())
        .then(feedback => dispatch(addFeedback(feedback)))
        .catch(error => { console.log('post feedback', error.message); alert('Your feedback could not be posted\nError: ' + error.message); });
}


export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(BASE_URL + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error  ' + response.status + ' : ' + response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
}

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));
    return fetch(BASE_URL + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error' + response.status + ' : ' + response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(response => response.json())
        .then(promotions => dispatch(addPromos(promotions)))
        .catch(error => dispatch(promosFailed(error.message)))
}

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));
    return fetch(BASE_URL + 'leaders')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error' + response.status + ' : ' + response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
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

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});


