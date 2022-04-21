import React from 'react';

const ProductContent = (props) => (
    <div class="col-lg-3 col-sm-6 d-flex flex-column align-items-center justify-content-center">
        <div class="thumbnail">
            <img src={props.product.details[0].image} alt={props.product.name} style={{ width: "100%" }} />
            <div className="text-center">
                <div><strong>{props.product.name}</strong></div>
                <div><strong>Color: </strong> {props.product.details[0].color.value}</div>
                <div><strong>Size: </strong> {props.product.details[0].size.value}</div>
                <div><strong>Price: </strong> {props.product.details[0].price}</div>
            </div>
        </div>
    </div>
);

export default ProductContent;