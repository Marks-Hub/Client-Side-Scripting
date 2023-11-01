const MyFoodMarket = {
   data() {
      return {
         user_choice: [],
         Food: [],
         //used to calculate customer order
         total: 0.0,
      } //end return 
   }, //end data property 
   mounted() {
      console.log("mounted")
      /* 
         pre-selecting a radio button has moved
         
         mounted occurs after created; however, 
         created is calling fetch which is asynchronous 
         so do anything relying on data in the 
         fetch-then 
      */
   },
   methods: {
      calc() { // calculates cost of all selected
         this.user_choice.push
         //alert("HI");
         this.total = 0.0;
         for (i = 0; i < this.user_choice.length; i++) {
            this.total += this.user_choice[i].price;
         }
         this.total = parseFloat(this.total).toFixed(2);

      },
      AddToCart() {
         //Graping copy from the react page
         var params = new URLSearchParams(window.location.search),
            two = JSON.parse(params.get("copy"));

         // (B) IT WORKS!
         console.log(two);
      }

   },
   created() {
      console.log("created")
      // use arrow function so fetch-then not claiming "this"
      // this "this" means the VUE object 
      fetch('project.json')
         .then(response => response.json())
         .then(data => {
            this.Food = data.Food  // object notation
            // for this JSON file, data is an object but 
            // data.sizes is an array 
            //this.sizes = data["sizes"] // associative array notation
            var params = new URLSearchParams(window.location.search),
            two = JSON.parse(params.get("copy"));
            for (let index = 0; index < two.length; index++) {
               this.user_choice.push(this.Food[two[index]]);
               
            }
             // pre-select first size Small
         })
         .catch(function (error) {
            console.log(error);
         })
   } //end created method			
} //end SIZE

Vue.createApp(MyFoodMarket).mount('#vue_FoodMarket')