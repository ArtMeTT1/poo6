import { time } from "console";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
//import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }
    findRent(bikeId: string): Rent{
        return this.rents.find(rent => rent.bike.id === bikeId)
    }
    findBike(bikeId: string): Bike{
        return this.bikes.find(bike => bike.id === bikeId)
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id = crypto.randomUUID()
        this.users.push(user)
    }

    removeUser(email: string): void {
        let index : number
        index = this.users.indexOf(this.findUser(email))
        this.users.splice(index,1)
    }

    registerBike(bike: Bike): void{
        for(const rBike of this.bikes){
            if(rBike.id === bike.id) throw new Error('Duplicate bike')
        }
        bike.id = crypto.randomUUID()
        this.bikes.push(bike)
    }

    rentBike(bikeId: string, email: string, dateFrom: Date): void {
        const verBike : Bike = this.findBike(bikeId)
        const verUser : User = this.findUser(email)
        if(verBike == undefined || verUser == undefined){
            throw new Error('User or bike not registered.')
        }
        if(!verBike.available){
            throw new Error('Bike not available')
        }
        verBike.available = false
        const newRent = new Rent(verBike,verUser,dateFrom)
        this.rents.push(newRent)
    }

    returnBike(bikeId: string, dateReturned: Date): number{
        const verBike : Bike = this.findBike(bikeId)
        if(verBike == undefined){
            throw new Error('Bike not registered.')
        }
        const rents : Rent[] = this.rents.filter(rent => rent.bike.id === bikeId)
        let rentReturn = rents.find(rent => rent.dateReturned === undefined)
        rentReturn.dateReturned = dateReturned
        let diff : number = dateReturned.getTime() - rentReturn.dateFrom.getTime()
        diff = diff/3600000
        verBike.available = true
        console.log('bike returned')
        return verBike.rate*diff
    }

    listUsers(): User[] {
        return this.users.slice() 
    }

    listRents():Rent[]{
       return this.rents.slice()
    }
    listBikes():Bike[]{
        return this.bikes.slice()
    }
    userAuthentication(userId: string, password: string): boolean{
        let authUser: User = this.users.find(user => user.id == userId)
        if(authUser == undefined || authUser.password != password) return false
        else return true
    }
    
}
