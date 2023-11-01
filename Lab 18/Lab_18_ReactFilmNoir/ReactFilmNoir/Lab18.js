class MyNoirFilms extends React.Component { //Mark Okin
    constructor(props) {
        super(props)

        this.state = {
            filmsIndex: 0,
            films: [],
            isLoading: true,
            //total: 0
        }
    }


    handleChange = e => {
        // setState() is async
        this.setState({ filmsIndex: e.target.value })
    }
    //READ JSON FILE
    componentDidMount() {
        //this.setState({ isLoading: true });
        fetch('noir.json')
           .then(response => response.json())
           .then(data => {
              let index = Math.floor(Math.random()*data.films.length);
              console.log(index);
              this.setState({films: data.films, isLoading: false, filmsIndex: index })})
        /*
           the JSON file holds an array, there might be changes if
           the JSON file holds an object with a property that is an array
           something like films: data --> films: data.films
        */
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
                    <div className="box" style={{ gridColumn: "1 / span 2" }}>
                        <select value={this.state.filmsIndex} onChange={this.handleChange}>
                            {
                                this.state.films.map((film, i) =>
                                (
                                    <option key={"option_" + i} value={i}>
                                        {film.title}
                                    </option>
                                )
                                )
                            }
                        </select>
                    </div>

                    <div className="box" style={{ gridColumn: "3", gridRow: "1 / span 4" }}>
                        <img src={this.state.films[this.state.filmsIndex].still} width="350" />
                    </div>
                    <div className="box" style={{ gridColumn: "4", gridRow: "1 / span 4" }}>
                        <iframe src={"https://www.youtube.com/embed/" + this.state.films[this.state.filmsIndex].youtube} width="480" height="270"></iframe>
                    </div>
                    <div className="box">Director: </div>
                    <div className="box"> {this.state.films[this.state.filmsIndex].director}</div>
                    <div className="box">Year: </div>
                    <div className="box"> {this.state.films[this.state.filmsIndex].year}</div>
                    <div className="box" style={{ gridColumn: "1 / span 2", gridRow: "4" }}>
                        {this.state.films[this.state.filmsIndex].stars}
                    </div>
                    <div className="box" style={{ gridColumn: "span 4"}}>
                        {this.state.films[this.state.filmsIndex].desc}
                        <br></br>
                        <a href={this.state.films[this.state.filmsIndex].imdb} target="_blank">IMBD</a>
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


const divNoir = ReactDOM.createRoot(document.querySelector('#divNoirFilms'));
divNoir.render(<MyNoirFilms />);