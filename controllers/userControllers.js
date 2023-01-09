const user = require('../models/user')
const bcrypt = require('bcrypt')
const AddUser = ({ firstName, lastName, email, role, password }) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10).then(async (result) => {
            try {
                password = result
                const newUser = await user({
                    firstName,
                    lastName,
                    email,
                    password,
                    role
                })
                resolve(newUser.save());
            } catch (err) {
                reject(err);
            }
        }).catch((err) => {
            reject(err)
        })
    })
}


const findUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("email : " + email + "password" + password);
            user.findOne({ email: email }).then((user) => {
                console.log(user);
                if (user) {
                    bcrypt.compare(password, user.password).then((status) => {
                        if (status) {
                            resolve(user)
                        } else {
                            reject()
                        }
                    }).catch(() => {
                        reject()
                    })
                } else {
                    reject()
                }
            })
        } catch (err) {
            reject(err)
        }
    })
}

const findAllUsers = () => {
    return new Promise((resolve, reject) => {
        try {
            user.find({role:"user"}).then((users) => {
                if (users) {
                    resolve(users)
                }
                reject()
            })
        } catch (err) {
            reject(err)
        }
    })
}
const findUserWithName = ({ firstName }) => {
    return new Promise((resolve, reject) => {
        try {
            user.find({ firstName: new RegExp(firstName), role: "user" }).then((users) => {
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
const deleteUserWithId = ({ id }) => {
    return new Promise((resolve, reject) => {
        user.deleteOne({ _id: id }).then((result) => {
            resolve(result)
        }).catch((err) => {
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