require("dotenv").config();
const { match } = require("assert");
const seeder = require('mongoose');
const team = require('./api/models/team');
const match = require('./api/models/match');
 
// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGO_URL_LOCAL)
seeder.connection.on("connected", async () => {
    await team.deleteMany()
    await match.deleteMany()
    await team.insertMany(data)
    seeder.disconnect()
    console.log("mongodb connection established successfully");
  });
seeder.connection.on("error", () => {
    console.log("mongodb connection Failed");
});
var data = [
    {
        'name': 'Costa Rica',
        'flag': "https://www.sciencekids.co.nz/images/pictures/flags680/Costa_Rica.jpg"
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