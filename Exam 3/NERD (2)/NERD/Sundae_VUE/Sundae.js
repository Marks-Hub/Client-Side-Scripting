// Mark Okin
const sundaeIce = {
    data() {
        return {
            user_scoops: {},
            // sizes is an array of  objects 
            scoops: [],

            user_flavors: {},
            // drinks is an array of  objects 
            flavors: [],

            user_toppings: [],
            // drinks is an array of  objects 
            toppings: [],

            total: 0,


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
        fetch('sundae.json')
            .then(response => response.json())
            .then(data => {
                this.scoops = data.scoops;
                this.flavors = data.flavors;
                this.toppings = data.toppings;// object notation
                // for this JSON file, data is an object but 
                // data.sizes is an array 
                //this.sizes = data["sizes"] // associative array notation
                // pre-select first size Small
                this.user_scoops = this.scoops[0];
                this.user_flavors = this.flavors[0];
                //this.user_toppings.push(this.toppings[1]);
                
            })
            .catch(function (error) {
                console.log(error);
            })
    }, //end created method		

    methods: {
        PriceCalculate () {
            //alert("Hours: "+this.userhours);
            //alert("Wage: "+this.userwage);
        this.total = (this.user_scoops.scoop_price + this.user_scoops.topping_price) + user_toppings.length;
        console.log(this.total);

        }
    },
}
Vue.createApp(sundaeIce).mount('#Sundae')