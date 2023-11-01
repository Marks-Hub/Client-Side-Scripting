class MyChessDisplay extends React.Component {// Mark Okin
    constructor(props) {
        super(props)

        this.state = {
            moviesIndex: 0,
            movies: [],
            genre: ["Biography", "Crime", "Documentary", "Drama", "History", "Mystery", "Romance", "Sport", "Thriller"],
            genreIndex: 0,
            matches: [],
            isLoading: true,
            total: 0
        }
    }
    handleChange = e => {
        // setState() is async
        this.setState({ moviesIndex: e.target.value });
    }
    genreRadio = e => {
        // setState() is async
        this.setState({ genreIndex: e.target.value });
    }
    btnSearch = e => {
        let copy = [];
        for (let i = 0; i < this.state.movies.length; i++) {
            if (this.state.movies[i].genre.indexOf(this.state.genre[this.state.genreIndex]) != -1) {
                copy.push(this.state.movies[i].title)
            }
        }
        this.setState({ matches: copy });
    }
    componentDidMount() {
        //this.setState({ isLoading: true });
        fetch('chess_movies.json')
            .then(response => response.json())
            .then(data => this.setState({ movies: data.movies, isLoading: false }));
    }
    render() {


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
                    <div  >
                        <select value={this.state.moviesIndex} onChange={this.handleChange}>
                            {
                                this.state.movies.map((movies, i) =>
                                (
                                    <option key={"option_" + i} value={i}>
                                        {movies.title}
                                    </option>
                                )
                                )
                            }
                        </select>
                    </div>
                    <br />
                    <div >
                        <img src={this.state.movies[this.state.moviesIndex].poster} />
                    </div>
                    <div >Year: {this.state.movies[this.state.moviesIndex].year}|Director: {this.state.movies[this.state.moviesIndex].director}| Runtime:{this.state.movies[this.state.moviesIndex].runtime}</div>
                    <div >Cast: {this.state.movies[this.state.moviesIndex].cast}</div>
                    <div >Genre: {this.state.movies[this.state.moviesIndex].genre}</div>
                    <div >Description: {this.state.movies[this.state.moviesIndex].desc}</div>
                    <div > <a href={"https://www.imdb.com/title/" + this.state.movies[this.state.moviesIndex].imdb} target="_blank">IMBD Link</a>
                    </div>
                    <div>
                        <h2>Search By Genre</h2>
                        {
                            this.state.genre.map((genre, i) => {
                                if (i == this.state.genreIndex) {
                                    return (
                                        <div key={"div_day_" + i}>
                                            <input key={"radio_day_" + i} id={"Chess_" + i} type="radio" name="Chess" defaultChecked="checked" value={i} onChange={this.genreRadio} />
                                            <label key={"label_day_" + i} htmlFor={"Chess_" + i}>
                                                {genre}
                                            </label>
                                            <br />
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={"div_day_" + i}>
                                            <input key={"radio_day_" + i} id={"Chess_" + i} type="radio" name="Chess" value={i} onChange={this.genreRadio} />
                                            <label key={"label_day_" + i} htmlFor={"Chess_" + i}>
                                                {genre}
                                            </label>
                                            <br />
                                        </div>
                                    )

                                }
                            }
                            )
                        }
                        <div className="box" >
                            <input type="button" value="Search by Genre" onClick={this.btnSearch} />
                        </div>
                        <div className="box">
                            {this.state.matches.map((item, i) => {
                                return (
                                    <div key={"div_res_" + i}>
                                        <span key={"span_" + i}><ul><li>{item}</li></ul></span>
                                        <br />
                                    </div>
                                )
                            }

                            )}
                        </div>
                    </div>


                    {/*	THIS IS A JSX COMMENT WITHIN REACT -- note curly braces around JS comment
                              this.state.films is an array of objects
                              we want the element with an index this.state.potterIndex 
                              we want the book_cover property of that object	
                      */ }
                    {/* 
                              https://www.youtube.com/watch?v=Jh47pOXwGq0 
                              youtube video about React wanted the key property seen above
                      */}

                </>
            ) //match return
        } // match else of if 
    } //match render
}


const divChess = ReactDOM.createRoot(document.querySelector('#divChesssDisplay'));
divChess.render(<MyChessDisplay />);