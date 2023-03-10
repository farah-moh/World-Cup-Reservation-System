require("dotenv").config();
const { match } = require("assert");
const seeder = require('mongoose');
const Team = require('./api/models/team');
const Match = require('./api/models/match');
const User = require('./api/models/user');
const Staff = require('./api/models/staff');
const Stadium = require('./api/models/stadium');
 
// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGO_URL_LOCAL)
seeder.connection.on("connected", async () => {
    console.log("mongodb connection established successfully");
    // await Team.deleteMany()
    // await Match.deleteMany()
    await User.deleteMany()
    // await Stadium.deleteMany()
    // await Staff.deleteMany()
    // await Team.insertMany(data)
    // await Staff.insertMany(staff)
    // await Stadium.insertMany(stadiums)
    for(const user of users)
    {
        await User.create(user);
    }
    
    seeder.disconnect()
  });
seeder.connection.on("error", () => {
    console.log("mongodb connection Failed");
});
var stadiums = [
    {
        name:"Al-Bayt",
        rows:4,
        seatsPerRow:6
    },
    {
        name:"Lusail",
        rows:5,
        seatsPerRow:6
    },
    {
        name:"Al-Thumama",
        rows:4,
        seatsPerRow:7
    }
]
var staff = [
    {
        name:"Referee1",
        type:"referee"
    },
    {
        name:"Referee2",
        type:"referee"
    },
    {
        name:"Referee3",
        type:"referee"
    },
    {
        name:"Linesman1",
        type:"linesman"
    },
    {
        name:"Linesman2",
        type:"linesman"
    },
    {
        name:"Linesman3",
        type:"linesman"
    },
    {
        name:"Linesman4",
        type:"linesman"
    },
    {
        name:"Linesman5",
        type:"linesman"
    },
    {
        name:"Linesman6",
        type:"linesman"
    },

]

var users = [
    {
        "username": "admin",
        "firstName": "admin",
        "lastName": "admin",
        "email": "admin@gmail.com",
        "password": "admin123",
        "birthdate": "2001-07-26",
        "gender" : "M",
        "nationality": "admin",
        "role": "admin",
        "verified": true,
        "isApproved":true
    },
    {
        "username": "managerA",
        "firstName": "managerA",
        "lastName": "managerA",
        "email": "managerA@gmail.com",
        "password": "manager123",
        "birthdate": "2003-02-06",
        "gender" : "M",
        "nationality": "manager",
        "role": "manager",
        "verified": true,
        "isApproved":false
    },
    {
        "username": "manager",
        "firstName": "manager",
        "lastName": "manager",
        "email": "manager@gmail.com",
        "password": "manager123",
        "birthdate": "2001-05-26",
        "gender" : "M",
        "nationality": "manager",
        "role": "manager",
        "verified": true,
        "isApproved":false
    },
    {
        "username": "customer",
        "firstName": "customer",
        "lastName": "customer",
        "email": "customer@gmail.com",
        "password": "customer123",
        "birthdate": "2001-11-12",
        "gender" : "M",
        "nationality": "customer",
        "role": "customer",
        "verified": true,
        "isApproved":false
    },
]
    var data = [
    {
        'name': 'Costa Rica',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Costa_Rica.jpg"
    },
    {
        'name': 'Wales',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Wales.jpg"
    },
    {
        'name': 'Serbia',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Serbia.jpg"
    },
    {
        'name': 'Saudi Arabia',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Saudi_Arabia.jpg"
    },
    {
        'name': 'South Korea',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/South_Korea.jpg"
    },
    {
        'name': 'United States',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/United_States.jpg"
    },
    {
        'name': 'Croatia',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Croatia.jpg"
    },
    {
        'name': 'Argentina',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Argentina.jpg"
    },
    {
        'name': 'Brazil',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Brazil.jpg"
    },
    {
        'name': 'England',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/England.jpg"
    },
    {
        'name': 'Australia',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Australia.jpg"
    },
    {
        'name': 'Qatar',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Qatar.jpg"
    },
    {
        'name': 'Ecuador',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Ecuador.jpg"
    },
    {
        'name': 'Senegal',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Senegal.jpg"
    },
    {
        'name': 'Ghana',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Ghana.jpg"
    },
    {
        'name': 'Tunisia',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Tunisia.jpg"
    },
    {
        'name': 'Morocco',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Morocco.jpg"
    },
    {
        'name': 'Belgium',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Belgium.jpg"
    },
    {
        'name': 'Netherlands',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Netherlands.jpg"
    },
    {
        'name': 'Mexico',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Mexico.jpg"
    },
    {
        'name': 'Poland',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Poland.jpg"
    },
    {
        'name': 'Japan',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Japan.jpg"
    },
    {
        'name': 'Denmark',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Denmark.jpg"
    },
    {
        'name': 'Cameroon',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Cameroon.jpg"
    },
    {
        'name': 'Iran',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Iran.jpg"
    },
    {
        'name': 'Germany',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Germany.jpg"
    },
    {
        'name': 'Spain',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Spain.jpg"
    },
    {
        'name': 'Portugal',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Portugal.jpg"
    },
    {
        'name': 'Switzerland',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Switzerland.jpg"
    },
    {
        'name': 'Uruguay',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Uruguay.jpg"
    },
    {
        'name': 'Canada',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Canada.jpg"
    },
    {
        'name': 'France',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/France.jpg"
    }
];