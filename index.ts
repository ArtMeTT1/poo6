import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const bike = new Bike('mountain bike', 'mountain',123, 500, 100.5,true, 'desc', 5, [],5,6,'bikeId')
const user = new User('Maria', 'maria@mail.com', '1234')
const today = new Date()
const twoDaysFromToday = new Date()
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const sevenDaysFromToday = new Date()
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7)
const user2 = new User('Maria Clara', 'maria@mail.com', '3123')
const app = new App()

let id = navigator.geolocation.watchPosition((position) => console.log(position))

app.registerUser(user)
app.registerBike(bike)
app.rentBike('bikeId',user.email,today)
app.returnBike('bikeId',sevenDaysFromToday)
//app.rentBike(bike,user2,today,twoDaysFromToday)
//console.log(app.findRent('567'))
//console.log(app.findUser('maria@mail.com'))
//app.removeUser('maria@mail.com')
//console.log(app.findUser('maria@mail.com'))

