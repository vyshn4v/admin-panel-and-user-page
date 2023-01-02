const user = require('../models/user')
const AddUser = ({ firstName, lastName, email, role, password }) => {
    return new Promise(async (resolve, reject) => {
        const newUser = await user({
            firstName,
            lastName,
            email,
            password,
            role
        })
        try {
            resolve(newUser.save());
        } catch (err) {
            reject(err);
        }
    })
}


const findUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        try {
            user.findOne({ email: email }).then((user) => {
                if (user?.password === password) {
                    resolve(user)
                }
                reject()
            })
        } catch (err) {
            reject(err)
        }
    })
}

const findAllUsers = () => {
    return new Promise((resolve, reject) => {
        try {
            user.find({ role:"user" }).then((users) => {
                if (user) {
                    resolve(users)
                }
                reject()
            })
        } catch (err) {
            reject(err)
        }
    })
}
const findUserWithName=({firstName})=>{
    return new Promise((resolve, reject) => {
        try {
            user.find({firstName:new RegExp(firstName), role:"user" }).then((users) => {
                if (users) {
                    resolve(users) 
                }
                reject()
            })
        } catch (err) {
            reject()
        }
    })
}
const deleteUserWithId=({id})=>{
    return new Promise((resolve,reject)=>{
        user.deleteOne({_id:id}).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err)
        })
    })
}
module.exports = {
    AddUser,
    findAllUsers,
    findUser,
    findUserWithName,
    deleteUserWithId
}