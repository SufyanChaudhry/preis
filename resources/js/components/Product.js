import React from 'react';
import ReactDOM from 'react-dom';
import ProductContent from './ProductContent';
import ProductLoader from './ProductLoader';

class Product extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            progress: false,
            completed: false,
            colors: [],
            sizes: [],
            prevColorId: 0,
            prevSizeId: 0,
            selectedColorId: 0,
            selectedSizeId: 0,
            filterApplied: false
        };

        this.infiniteScroll = this.infiniteScroll.bind(this);
    }

    componentDidMount() {
        this.getInitailState();
        window.addEventListener('scroll', this.infiniteScroll);
    }

    getInitailState() {

        this.infiniteScroll();

        axios.post("products-sizes")
            .then((response) => {
                this.setState(() => ({
                    sizes: response.data,
                }));
            })
            .catch((error) => {
                console.log(error);
            });

        axios.post("products-colors")
            .then((response) => {
                this.setState(() => ({
                    colors: response.data,
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    infiniteScroll() {

        let sizeId = this.state.selectedSizeId;
        let colorId = this.state.selectedColorId;

        if (this.state.prevColorId != colorId ||
            this.state.prevSizeId != sizeId
        ) {
            this.state.products = [];
            this.state.completed = false;
        }

        if (!this.state.completed && !this.state.progress) {

            this.setState(() => ({
                progress: true,
            }));

            axios.post("products-listing", {
                'offset': this.state.products.length,
                colorId,
                sizeId
            })
                .then((response) => {
                    if (colorId == 0 && sizeId == 0) {
                        if (this.state.filterApplied) {
                            this.useNewState(response);
                            this.setState(() => ({
                                filterApplied: false,
                            }));
                        } else {
                            this.usePrevState(response);
                        }
                    } else {

                        if (this.state.prevColorId === colorId &&
                            this.state.prevSizeId === sizeId
                        ) {
                            this.usePrevState(response);
                        } else {

                            this.useNewState(response);
                        }

                        this.state.prevColorId = colorId;
                        this.state.prevSizeId = sizeId;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    usePrevState(response) {
        this.setState((prevState) => ({
            products: prevState.products.concat(response.data),
            progress: false,
            completed: response.data.length ? false : true
        }));
    }

    useNewState(response) {
        this.setState(() => ({
            products: response.data,
            progress: false,
            completed: response.data.length ? false : true
        }));
    }

    handleSizeChange = (event) => {
        this.state.prevSizeId = this.state.selectedSizeId;
        this.state.selectedSizeId = event.target.value;
        this.state.filterApplied = true;
        this.infiniteScroll();
    }

    handleColorChange = (event) => {
        this.state.prevColorId = this.state.selectedColorId;
        this.state.selectedColorId = event.target.value;
        this.state.filterApplied = true;
        this.infiniteScroll();
    }

    render() {

        const { colors, sizes } = this.state;

        const Product = this.state.products.map((product) => (
            <ProductContent key={product.id} product={product} />
        ));

        return (
            <div className="row">
                <div className="row mt-5 mb-5">
                    <div className="col-md-8 col-sm-12 text-center">
                        <h2>Product Listing</h2>
                    </div>
                    <div className="col-md-2 col-sm-12 text-center">
                        <select onChange={this.handleColorChange}>
                            <option value="0">Filter By Color</option>
                            {colors.map(item => (
                                <option key={item.value} value={item.id}>
                                    {item.value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2 col-sm-12 text-center">
                        <select onChange={this.handleSizeChange}>
                            <option value="0">Filter By Size</option>
                            {sizes.map(item => (
                                <option key={item.value} value={item.id}>
                                    {item.value}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    {Product.length > 0 && Product}
                    <ProductLoader progress={this.state.progress} completed={this.state.completed} />
                </div>
            </div>
        )
    }

}

if (document.getElementById('products-listing')) {
    ReactDOM.render(<Product />, document.getElementById('products-listing'));
}
