const Calculate = {
    data() {
        return {
            //tip options
            tipPercents: ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],

            userTip: "20",
            //user's bill amount
            billAmount: 20,
            total: 0,
            tipAmount: 0,
        }
    }, //e

    methods: {
        calcTip: function (event) {
            //alert("Hours: "+this.userhours);
            //alert("Wage: "+this.userwage);
            parseFloat(this.userTip);
            let tip = (this.userTip/100);
            this.tipAmount=this.billAmount*tip;
            this.total = this.billAmount+this.tipAmount;
        }
    }
}
Vue.createApp(Calculate).mount('#divCalculateTip')