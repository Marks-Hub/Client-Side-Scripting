// note the name of the class must be capitalized 
class MyPotterDisplay extends React.Component {
   constructor(props) {
      super(props)
      // potterIndex is the only part of the state that will be changed by the user 
      // the property calls films which is an array of potter objects which will come from reading a json file
      // the isLoading property lets one know when the file has been read
      this.state = {
         potterIndex: 0,
         films: [], 
         isLoading: true
      }
   }

   handleChange = e => {
      // setState() is async
      this.setState({ potterIndex: event.target.value });
      /*
         that means don't do anything here that requires an updated potterIndex
         because of the way the cover image and author are handled (see below) 
         they will change when setState has finished
      */
   }

   componentDidMount() {
      //this.setState({ isLoading: true });
      fetch('Potter.json')
         .then(response => response.json())
         .then(data => {
            let index = Math.floor(Math.random()*data.films.length);
            console.log(index);
            this.setState({films: data.films, isLoading: false, potterIndex: index })})
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
               <h1>React Harry Display -- Reading Data from JSON File</h1>
               <select value={this.state.potterIndex} onChange={this.handleChange}>
               {
                  this.state.films.map((potter, i) =>
                  (
                     <option key={"potter"+i} value={i}>
                        {potter.title}
                     </option>
                  )
                  )
               }
            </select>
               <br />
               {/*	THIS IS A JSX COMMENT WITHIN REACT -- note curly braces around JS comment
							this.state.films is an array of objects
							we want the element with an index this.state.potterIndex 
							we want the book_cover property of that object	
					*/ }
               {/* 
							https://www.youtube.com/watch?v=Jh47pOXwGq0 
							youtube video about React wanted the key property seen above
					*/}
               <img src={this.state.films[this.state.potterIndex].image} height="300" />
               <br />
               <span>Director: </span>{this.state.films[this.state.potterIndex].director}
               <br />
               <span>Writer: </span>{this.state.films[this.state.potterIndex].writer}
               <br />
               <span>Producer: </span>{this.state.films[this.state.potterIndex].producer}
               <br />
               <span>Music: </span>{this.state.films[this.state.potterIndex].music}
               <br/>
               <iframe src= {"https://www.youtube.com/embed/" + this.state.films[this.state.potterIndex].youtubecode} width="420" height="345" />
            </>
         ) //match return
      } // match else of if 
   } //match render
} //end MyPotterDisplay class

const divPotterDisplay = ReactDOM.createRoot(document.querySelector('#divPotterDisplay'));
divPotterDisplay.render(<MyPotterDisplay />)