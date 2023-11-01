const Reservations = {
    data() {
        return {
            user_room: { name: "" },
            // rooms is an array of  objects 
            rooms: [],

            user_Days: { Date: "" },
            // Days is an array of  objects 
            Days: [],

            user_Times: { time: "" },
            // Times is an array of  objects 
            Times: [],


            reservations_list: [],
            
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
        fetch('Lab20.json')
            .then(response => response.json())
            .then(data => {
                this.rooms = data.rooms, this.Days = data.Days, this.Times = data.Times// object notation
                // for this JSON file, data is an object but 
                // data.sizes is an array 
                //this.sizes = data["sizes"] // associative array notation
                // pre-select first size Small
                this.user_room = this.rooms[1]
                this.user_Days = this.Days[1]
                this.user_Times = this.Times[1]
            })
            .catch(function (error) {
                console.log(error);
            })
    }, //end created method		

    methods: {
        AddToReservation: function (event) {
            //alert("Hours: "+this.userhours);
            //alert("Wage: "+this.userwage);
            this.reservations_list.push(this.user_room.name + " " + this.user_Days.Date + " " + this.user_Times.time + "\n");
            let mySet = new Set();
            
            for (let i = 0; i < this.reservations_list.length; i++) {
                
                mySet.add(this.reservations_list[i]);
                
            }
            if (mySet.size != this.reservations_list.length) {
                this.reservations_list.pop();
                alert("Duplicate Reservation");
               }
            console.log(mySet);
            console.log(this.reservations_list);
            console.log(this.reservations_list.length);
            console.log(mySet.size);
            
           
        }
    },
}
Vue.createApp(Reservations).mount('#room_reservations')