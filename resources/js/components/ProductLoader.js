import React from 'react';

const ProductLoader = (props) => (
    <span>
        {
            props.progress && (<div className="row text-center">
                <img src="../images/loader.gif" width="10" height="10" />
            </div>)
        }
        {props.completed && (<div className="row text-center">
            <h5>No More Products Found!</h5>
        </div>)
        }
    </span>
);

export default ProductLoader;