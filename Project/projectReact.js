
class MyFoodMarket extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            foodIndex: 0,
            selectedIndices: [],
            Food: [],
            category: ["chicken", "baked", "beef", "bread", "fish", "fruits", "water"],
            matches: [],
            isLoading: true,
            total: 0
        }
    }

    //###############################################################

    handleChange2 = e => {
        // setState() is async
        let copy = this.state.selectedIndices;
        if (e.target.checked) {
            //add to selectedIndices
            copy.push(e.target.value);
            //console.log(copy);
        } else {
            //remove from selectedIndices
            copy = copy.filter(function (element) {
                return element != e.target.value;
            });
        }
        this.setState({ selectedIndices: copy });
    }
    categoriesRadio = e => {
        // setState() is async
        this.setState({ foodIndex: e.target.value });
    }
    //this displays the food under the selected category
    btnSearch = e => {
        let copy = [];
        for (let i = 0; i < this.state.Food.length; i++) {
            if (this.state.Food[i].category.indexOf(this.state.category[this.state.foodIndex]) != -1) {
                copy.push(this.state.Food[i].image)
            }
        }
        this.setState({ matches: copy });
    }
    AddToCart = e => {
        let copy = this.state.selectedIndices;
        var params = new URLSearchParams();
        if (copy) {
            //appending copy so it can be used in other page
            params.append("copy", JSON.stringify(copy));
            console.log(copy);
            var url = "FoodMarketVue.html?" + params.toString();
            location.href = url;
        } else {
            //remove from selectedIndices
            copy = copy.filter(function (element) {
                return element != e.target.value;
            });
        }
        this.setState({ selectedIndices: copy });   

        // (C) GO!
        
        
    }

    //###############################################################

    //###############################################################
    //READ JSON FILE
    componentDidMount() {
        //this.setState({ isLoading: true });
        fetch('project.json')
            .then(response => response.json())
            .then(data => this.setState({ Food: data.Food, isLoading: false }));
    }

    //###############################################################
    render() {
        const style_a = { gridColumn: "1 / span 5", gridRow: "1" };

        // The following code use React Fragment
        // Recall .map() is a way to loop over an array 
        // React requires you to pass in the key={} prop
        // https://reactjs.org/docs/lists-and-keys.html 

        /*
           we cannot do the real rendering until the data file is read (asynchronously) 
           hence the introduction of the isLoading attribute of the state 
        */
        if (this.state.isLoading) {
            return (<p>Loading ....</p>)
        } else {
            return (
                <> {/* React Fragment instead of a div to meet the single parent criterion */}
                    <div className="box" style={style_a}>
                        <h2>Search By Category</h2>
                        {
                            this.state.category.map((category, i) => {
                                if (i == this.state.foodIndex) {
                                    return (
                                        <div key={"div_cat_" + i}>
                                            <input key={"radio_cat_" + i} id={"categories_" + i} type="radio" name="categories" defaultChecked="checked" value={i} onChange={this.categoriesRadio} />
                                            <label key={"label_cat_" + i} htmlFor={"categories_" + i}>
                                                {category}
                                            </label>
                                            <br />
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={"div_cat_" + i}>
                                            <input key={"radio_cat_" + i} id={"categories_" + i} type="radio" name="categories" value={i} onChange={this.categoriesRadio} />
                                            <label key={"label_cat_" + i} htmlFor={"categories_" + i}>
                                                {category}
                                            </label>
                                            <br />
                                        </div>
                                    )

                                }
                            }
                            )
                        }
                    </div>
                    <div className="box" >
                        <input type="button" value="Search by Category" onClick={this.btnSearch} />
                    </div>
                    

                    <div className="row" style={{ gridColumn: "2 / span 4" }}>
                        {this.state.matches.map((item, i) => {
                            return (
                                <span className="column" key={"div_res_" + i}>
                                    <span key={"span_" + i}><img src={item} /></span>

                                </span>
                            )
                        }

                        )}
                    </div>


                    <br />

                    <div className="box" style={{ gridColumn: "1", gridRow: "4 / span 4" }}><h2>Food Selection</h2>
                        {
                            this.state.Food.map((Foods, i) => {
                                return (
                                    <div key={"div_" + i}>
                                        <input key={"check_" + i} id={"Food_" + i} type="checkbox" name="Food" value={i} onChange={this.handleChange2} />
                                        <label key={"label_" + i} htmlFor={"Food_" + i}>
                                            <span key={"span_" + i}>{Foods.name}</span>
                                        </label>
                                    </div>
                                )//match return of the if inside map                
                            }
                            ) //match map(
                        }
                    </div>

                    <div className="row" style={{ gridColumn: "2 / span 4", gridRow: "4" }}>< h3 style={{color: "orange"}}> Selected Food</h3>
                        {
                            this.state.selectedIndices.map((index, i) => (
                                <span className="column" key={"div_res_" + i}>
                                    <img key={"poster_" + i} src={this.state.Food[index].image} width="200" height="250" />
                                </span>))
                        }
                    </div>
                    <div className="box" >
                        <input type="button" value="Add To Cart" onClick={this.AddToCart} />
                    </div>
                   

                </>
            ) //match return
        } // match else of if 
    } //match render
} //end MyFoodMarket class

//###############################################################
// call the render methods
const divMarket = ReactDOM.createRoot(document.querySelector('#divFoodMarket'));
divMarket.render(<MyFoodMarket />);