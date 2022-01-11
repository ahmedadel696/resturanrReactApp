import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'


function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <div className='col-12 col-md-5 mt-1'>
                <Card>
                    <CardImg width="50%" height="50%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

function RenderComments({commentsArr }) {
    if (commentsArr != null) {
        return (
            <div className='col-12 col-md-5 mt-1'>
                <h4>Comments</h4>
                {
                    commentsArr.map((dishCom) => {
                        return (
                            <ul className='list-unstyled' key={dishCom.id} >
                                <li>{dishCom.comment}</li>
                                <li>--{dishCom.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(dishCom.date)))}</li>
                            </ul>
                        );
                    })
                }
            </div>
        );
    } else {
        return (
            <div>
            </div>
        );
    }

}

const DishdetailComponent = (props) => {

    return (
        <div className='container'>
            <div className='row'>
                <RenderDish dish={props.singleDish} />
                {props.singleDish !== undefined ?
                    <RenderComments commentsArr={props.singleDish.comments} /> :
                    <div></div>
                }
            </div>
        </div>
    )





    // const dish = props.singleDish;

    // return (
    //     <div className='container'>


    //         <div className='row'>
    //             {renderDish(dish)}
    //             {renderComments(dish.comments)}

    //         </div>
    //     </div>


    // )


}
export default DishdetailComponent;