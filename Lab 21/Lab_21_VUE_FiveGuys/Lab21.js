const FiveGuys = {
    data() {
        return {
            user_sandwich: { sandwich_name: " ", sandwich_price: 6.19},
            user_sides: [],
            User_cookLvl:{name:" ", time: 2.00},
            user_toppings: [],
            user_com_indices: [],
            sandwiches: [],
            cook_levels: [],
            toppings: [],
            sides: [],
            total: 0.0,

        }
    }, //end data property 	
    created() {
        fetch('FiveGuys.json')
            .then(response => response.json())
            .then(data => {
                this.sandwiches = data.sandwich;
                this.cook_levels = data.cook_level;
                this.toppings = data.toppings;
                this.sides = data.sides;

                this.user_sandwich = this.sandwiches[1]
                this.User_cookLvl = this.cook_levels[1]

                this.user_toppings.push(this.toppings[1]);
                this.user_sides.push(this.sides[0])
                

            })
            .catch(function (error) {
                console.log(error);
            })


    }, //end created method	

    methods: {

            calc(){
                this.user_toppings.push
                //alert("HI");
                this.total=0.0;
                if(this.user_sandwich){
                    this.total = this.user_sandwich.sandwich_price;
                }
                for(i=0; i< this.user_sides.length; i++){
                    this.total += this.user_sides[i].side_price;
                }
                this.total = parseFloat(this.total).toFixed(2);
            
        }		
        
    }


} //end Vue object

Vue.createApp(FiveGuys).mount('#vue_fiveGuys')