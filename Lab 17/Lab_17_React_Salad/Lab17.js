// note the name of the class must be capitalized 
class SaladOrder extends React.Component {

   constructor(props) {
      super(props)

      this.state = {

         Salad: [],
         saladIndex: 0,
         Dressing: [],
         dressingIndex: 0,
         Fixings: [],
         fixingsIndex: 0,
         Lettuce: [],
         lettuceIndex: 0,
         selectedIndices: [],
         selecFixings: [],
         isLoading: true,
      }

      //this.handleRoomChange = this.handleRoomChange.bind(this);
      //this.handleDayChange = this.handleDayChange.bind(this);
      //this.handleTimeChange = this.handleTimeChange.bind(this);
   }


   handleDressingChange = e => {
      // setState() is async
      this.setState({ dressingIndex: e.target.value });
   }
   handleLettuceChange = e => {
      // setState() is async
      this.setState({ lettuceIndex: e.target.value });
   }
   handleFixingsChange = e => {
      // setState() is async
      // I could change selctedIndices "directly" but it was not affecting the page
      // so I made a copy, changed the copy, and then used the copy to set the state
      this.setState({ fixingsIndex: e.target.value });

   }
   handleChange = e => {
      // I could change selctedIndices "directly" but it was not affecting the page
      // so I made a copy, changed the copy, and then used the copy to set the state
      let copy = this.state.selectedIndices;
      if (e.target.checked) {
         //add to selectedIndices
         copy.push(e.target.value);
         console.log(copy);
      } else {
         //remove from selectedIndices
         copy = copy.filter(function (element) {
            return element != e.target.value;
         });
      }
      this.setState({ selectedIndices: copy });
   }
   saladOrder = e => {
      let copy = this.state.selecFixings
      let toAdd = this.state.selectedIndices.length;
      console.log(toAdd)
      let price = (toAdd * 0.50) + 3.50;
      price.toFixed(2);
      if (copy.indexOf(toAdd) == -1) {
         copy.push(price)
      } else {
         alert("conflict")
      }
      this.setState({ selecFixings: copy })
   }
   componentDidMount() {
      //this.setState({ isLoading: true });
      fetch('SaladData.json')
         .then(response => response.json())
         .then(data => this.setState({ Dressing: data["dressings"], Lettuce: data["lettuce"], Fixings: data["fixings"], isLoading: false }));
   }




   render() {


      if (this.state.isLoading) {
         return (<p>Loading ....</p>)
      } else {
         return (
            <> {/* React Fragment instead of a div to meet the single parent criterion */}

               <div className="box" >
                  <h1>Dressing</h1>
                  <select value={this.state.handleDressingChange} onChange={this.handleChange}>
                     {
                        this.state.Dressing.map((Salad, i) =>
                        (
                           <option key={"option_" + i} value={i}>
                              {Salad.name}
                           </option>
                        )
                        )
                     }
                  </select>
               </div>
               <div className="box"  >
                  <h2>Lettuce</h2>
                  {
                     this.state.Lettuce.map((Lettuce, i) => {
                        if (i == this.state.lettuceIndex) {
                           return (
                              <div key={"div_day_" + i}>
                                 <input key={"radio_day_" + i} id={"lettuce_" + i} type="radio" name="lettuce" defaultChecked="checked" value={i} onChange={this.handleLettuceChange} />
                                 <label key={"label_day_" + i} htmlFor={"lettuce_" + i}>
                                    {Lettuce.name}
                                 </label>
                                 <br />
                              </div>
                           )
                        } else {
                           return (
                              <div key={"div_day_" + i}>
                                 <input key={"radio_day_" + i} id={"lettuce_" + i} type="radio" name="day" value={i} onChange={this.handleLettuceChange} />
                                 <label key={"label_day_" + i} htmlFor={"lettuce_" + i}>
                                    {Lettuce.name}
                                 </label>
                                 <br />
                              </div>
                           )

                        }
                     }
                     )
                  }
               </div>
               <div className="box"  ><h2>Fixings</h2>
                  {
                     this.state.Fixings.map((Fixings, i) => {
                        return (
                           <div key={"div_" + i}>
                              <input key={"check_" + i} id={"Fixing_" + i} type="checkbox" name="Fixings" value={Fixings.name} onChange={this.handleChange} />
                              <label key={"label_" + i} htmlFor={"Fixing_" + i}>
                                 <span key={"span_" + i}>{Fixings.name}</span>
                              </label>
                           </div>
                        )//match return of the if inside map                
                     }
                     ) //match map(
                  }


               </div>

               <div className="box">< h3 > Selected Fixings</h3>
                  {this.state.selectedIndices.map((item, i) => {
                     return (

                        <div key={"div_res_" + i}>

                           <span key={"span_" + i}>{item}</span>

                           <br />
                        </div>
                     )
                  }

                  )}
               </div>

               <div className="box" >
                  <input type="button" value="Order Salad" onClick={this.saladOrder} />
               </div>
               <div className="box" >
                  <h2>Salad Price</h2>
                  {this.state.selecFixings.map((items, i) => {
                     return (
                        <div key={"div_res_" + i}>
                           <span key={"span_" + i}>{"$" + items}</span>
                           <br />
                        </div>
                     )
                  }

                  )}
               </div>

            </>
         ) //match return
      }
   } //match render
} //end MyBookDisplay class

const div1 = ReactDOM.createRoot(document.querySelector('#divSaladOrder'));
// call the render method  -- only one parent can be rendered -- so add surrounding div
div1.render(<SaladOrder />);
