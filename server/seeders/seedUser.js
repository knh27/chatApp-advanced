import { User } from "../models/userSchema.js";
import { faker } from "@faker-js/faker";

const createDummyUser=async(numUsers)=>{
    try {
        const usersPromise=[];
        for(let i=0;i<numUsers;i++){
            
            const tempUser=await User.create({
                name:faker.person.fullName(),
                username:faker.internet.username(),
                bio:faker.lorem.sentence(10),
                password:"password",
                avatar:{
                    url:faker.image.avatar(),
                    public_id:faker.system.fileName(),
                }
            })


            usersPromise.push(tempUser);
        }
        await Promise.all(usersPromise);
        console.log("users created", numUsers)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

export default createDummyUser;