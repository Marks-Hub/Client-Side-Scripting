// note the name of the class must be capitalized 
class MyMovieDisplay extends React.Component {
    constructor(props) {
       super(props)
       this.state = {
          selectedIndices: [],
          IMDBTop: [],
          isLoading: true
       }
    }
 
    handleChange = e => {
       // I could change selctedIndices "directly" but it was not affecting the page
       // so I made a copy, changed the copy, and then used the copy to set the state
       let copy = this.state.selectedIndices;
       if (e.target.checked) {
          //add to selectedIndices
          copy.push(e.target.value);
          copy.sort(function (a, b) { return a - b });
          //sort() assumes strings ("10"<"9") -- added anonymous "compare" function to force number (9<10)
       } else {
          //remove from selectedIndices
          copy = copy.filter(function (element) {
             return element != e.target.value;
          });
       }
       this.setState({ selectedIndices: copy });
    }
 
    // note the JSON starts with an object that has a property IMDBTop which is 
    // an array of objects
    componentDidMount() {
       fetch('IMDB.json')
          .then(response => response.json())
          .then(data => this.setState({ IMDBTop: data["IMDBTop"], isLoading: false }));
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
             <>
                <h2>React Movie Checkbox</h2>
                {
                   this.state.IMDBTop.map((IMDB, i) => {
                      return (
                         <div key={"div_" + i}>
                            <input key={"check_" + i} id={"IMDB_" + i} type="checkbox" name="IMDB" value={i} onChange={this.handleChange} />
                            <label key={"label_" + i} htmlFor={"IMDB_" + i}>
                               <span key={"span_" + i}>{IMDB.movieTitle}</span> 
                            </label>
                         </div>
                      )//match return of the if inside map                
                   }
                   ) //match map(
                }
                <br /><br />
                <h2>Movie Selected</h2>
                {
                   this.state.selectedIndices.map((index, i) => (
                    <img key={"poster_" + i} src={this.state.IMDBTop[index].moviePoster} />
                   ))
                }
             </>
          ) //match return in else of isLoading 
       } //match else of isLoading
    } //match render
 } //end MyMovieDisplay class
 
 const divBook = ReactDOM.createRoot(document.querySelector('#divMovieDisplay'));
 // call the render method  -- only one parent can be rendered -- so add surrounding div
 divBook.render(<MyMovieDisplay />);