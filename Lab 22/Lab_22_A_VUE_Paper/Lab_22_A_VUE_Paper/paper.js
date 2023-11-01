//Mark Okin
const Paper = {
    data() {
        return {
            sheets: [],
            User_Sheets: { name: " ", factor: 1 },
            paper_sizes: [],
            paper_size: {},//{name: "6 by 6 inch", price: 1.75},
            Color: [],
            user_color: [],
            total: 0.0,

        }
    }, //end data property 	
    created() {
        fetch('paper.json')
            .then(response => response.json())
            .then(data => {
                this.sheets = data.numbers;
                this.paper_sizes = data.sizes;
                this.Color = data.colors;
                this.User_Sheets = this.sheets[0];
                this.paper_size = this.paper_sizes[0];

                this.user_color.push(this.Color[1]);
                /*  this.paper_size = {
                      "name": "6 by 6 inch",
                      "price": 1.75
                  };*/
            })
            .catch(function (error) {
                console.log(error);
            })


    }, //end created method	

    methods: {
        calc() {
            this.total = this.paper_size.price * this.User_Sheets.factor * this.user_color.length;
            this.total = parseFloat(this.total).toFixed(2);
        }
    }


} //end Vue object

Vue.createApp(Paper).mount('#vue_paper')