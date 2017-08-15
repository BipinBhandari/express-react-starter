const User = require("./models/User");
const R = require('ramda');

const users = [
    {
        name: "Admin User",
        email: "admin@test.com",
        role: "ADMIN",
        password: "admin123"
    },
    {
        name: "Staff",
        email: "staff@test.com",
        role: "STAFF",
        password: "staff123"
    }
]

module.exports = async () => {
    try {
        const dbUsers = await User.find({
            email: {$in: R.map(R.view(R.lensProp('email')))(users)}
        }).exec();

        if (!dbUsers.length) {
            console.log("No default users found. Creating 2 users....")
            const createPromises = users.map(async user => {
                const newUser = new User(user);
                return await newUser.save();
            })

            const createdUsers = await Promise.all(createPromises);
            console.log(`Created ${createdUsers.length} users.`)
        }
    } catch (err) {
        console.log("error", err)
    }
}