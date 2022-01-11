// import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Card, CardImg, CardImgOverlay, CardTitle , Breadcrumb ,BreadcrumbItem } from 'reactstrap'




function RenderMenuItems({ dish }) {
    return (
        <Card>
            <Link to={`menu/${dish.id}`}>
                <CardImg width="100%" src={dish.image} alt={dish.image} />
                <CardImgOverlay>
                    <CardTitle heading>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>

    );
}
const MenuComponent = (props) => {


    const menu = props.dishes.map((dish) => {
        return (
            <div key={dish.id} className='col-12 col-md-5 mt-1'>
                <RenderMenuItems dish={dish} />
            </div>
        )
    });
    return (
        <div className='container'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr />
                </div>
            </div>
            <div className='row'>
                {menu}
            </div>
        </div>
    )
}




export default MenuComponent;
