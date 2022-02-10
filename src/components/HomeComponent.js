import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { Loading } from './LoadingComponent';

import { BASE_URL } from "../shared/base_url";
import { FadeTransform } from 'react-animation-components';

function RenderCardItem({ item, isLoading, errMess }) {
    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    } else {
        console.log("promotion_item : ", item);
        return (
            <FadeTransform in 
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}
            >
            <Card>
                <CardImg src={BASE_URL+item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>
                        {item.description}
                    </CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
    }

}

function HomeComponent(props) {
    return (
        <div className='container'>
            <div className='row align-items-start'>
                <div className='col-12 col-md m-1'>
                    <RenderCardItem item={props.dish} isLoading={props.dishesLoading} errMess={props.dishesErrMess} />
                </div>
                <div className='col-12 col-md m-1'>
                    <RenderCardItem item={props.promotion} isLoading={props.promotionsLoading} errMess={props.promotionsErrMess} />
                </div>
                <div className='col-12 col-md m-1'>
                    <RenderCardItem item={props.leader} isLoading={props.leadersLoading} errMess={props.leadersErrMess} />
                </div>
            </div>
        </div>
    );
}

export default HomeComponent;