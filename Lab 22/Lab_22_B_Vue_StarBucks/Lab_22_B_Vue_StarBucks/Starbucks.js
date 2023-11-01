const Starbucks = {
    data() {
        return {
            user_size: {},
            // sizes is an array of  objects 
            sizes: [],

            user_drinks: {},
            // drinks is an array of  objects 
            drinks: [],

            fat: 0,


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



    created() {
        console.log("created")
        // use arrow function so fetch-then not claiming "this"
        // this "this" means the VUE object 
        fetch('starbucks.json')
            .then(response => response.json())
            .then(data => {
                this.sizes = data.sizes;
                this.drinks = data.drinks;// object notation
                // for this JSON file, data is an object but 
                // data.sizes is an array 
                //this.sizes = data["sizes"] // associative array notation
                // pre-select first size Small
                this.user_drinks = this.drinks[0];
                this.user_size = this.sizes[0];
                
            })
            .catch(function (error) {
                console.log(error);
            })
    }, //end created method		

    methods: {
        FatCalculate () {
            //alert("Hours: "+this.userhours);
            //alert("Wage: "+this.userwage);
        this.fat = this.user_size.size_factor * this.user_drinks.drink_fat;
        console.log(this.fat);

        }
    },
}
Vue.createApp(Starbucks).mount('#starbucks')