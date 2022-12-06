import bcrypt from "bcryptjs"

const users=[
    {
        name:"Admin User",
        email:"admin@example.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:true
    },
    {
        name:"urvish sojitra",
        email:"urvish@example.com",
        password:bcrypt.hashSync("123456",10),
    },
    {
        name:"jay Rakholia",
        email:"jay@example.com",
        password:bcrypt.hashSync("123456",10),
    }
]

export default users