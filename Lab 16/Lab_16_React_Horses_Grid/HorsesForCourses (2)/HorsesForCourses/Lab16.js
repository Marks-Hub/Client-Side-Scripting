// note the name of the class must be capitalized 
class MyHorseDisplay extends React.Component {
    constructor(props) {
       super(props)
 
       this.state = {
          horseIndex: 0,
          horses: [],
          isLoading: true,
          total: 0
       }
    }
 
    //###############################################################
    handleChange = e => {
       // setState() is async
       this.setState({ horseIndex: e.target.value });
    }
 
    //###############################################################

    //###############################################################
    //READ JSON FILE
    componentDidMount() {
       //this.setState({ isLoading: true });
       fetch('horseracing.json')
          .then(response => response.json())
          .then(data => this.setState({ horses: data.horses, isLoading: false }));
    }
 
    //###############################################################
    render() {
        const style_a = { gridColumn: "1 / span 1", gridRow: "1" };
        
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
            <select value={this.state.horseIndex} onChange={this.handleChange}>
               {
                  this.state.horses.map((horse, i) =>
                  (
                     <option key={"option_" + i} value={i}>
                        {horse.horseName}
                     </option>
                  )
                  )
               }
            </select>
         </div>
                 <br />
                 <div className="box" style={{ gridColumn: "3", gridRow: "1 / span 5" }}>
                  <img src={this.state.horses[this.state.horseIndex].horseSilks + ".jpg"} width="260" height="300" style={{ display: "block", marginRight: "auto", marginLeft: "auto" }} />
               </div>
               <div className="box">Horse Rank: </div>
               <div className="box"> {this.state.horses[this.state.horseIndex].horseRank}</div>
               <div className="box">Horse Rating: </div>
               <div className="box"> {this.state.horses[this.state.horseIndex].horseRating}</div>
               <div className="box">horse Sire: </div>
               <div className="box"> {this.state.horses[this.state.horseIndex].horseSire}</div>
               <div className="box">Horse Trainer: </div>
               <div className="box"> {this.state.horses[this.state.horseIndex].horseTrainer}</div>
               <div className="box">Horse Jockey: </div>
               <div className="box"> {this.state.horses[this.state.horseIndex].horseJockey}</div>
               <div className="box">Horse Race: 
               <iframe src={"https://www.youtube.com/embed/" + this.state.horses[this.state.horseIndex].horseYouTubeCode } width="260"></iframe>
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
  } //end MyPotterDisplay class
  
 //###############################################################
 // call the render methods
 const divHorse = ReactDOM.createRoot(document.querySelector('#divHorsesDisplay'));
 divHorse.render(<MyHorseDisplay />);