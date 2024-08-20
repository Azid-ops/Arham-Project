const userData = require('../Schema/userData');
const userInfo = require('../Schema/userInfo');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const salt = 10;

const Registration = async (req, res) => {
    console.log('Registring');
    const { userPassword, userEmail } = req.body;
    console.log(userPassword, userEmail)
    const data = new userData({

        schemaEmail: userEmail,

        schemaPassword: await bcrypt.hash(userPassword, salt),
    })
    // console.log(data.schemaEmail);

    userData.findOne({ schemaEmail: userEmail }).then(
        (user) => {
            if (user) {
                res.status(409).json({ message: "User Exist Already" })
            } else {
                data.save().then((user) => {
                    console.log("Saved: ", user);
                    const token = JWT.sign({ ID: user._id, userEmail: user.schemaEmail }, process.env.SECURITYKEY);
                    res.status(200).json({ message: "User Created", token, ID: user._id });
                }).catch(error => {
                    console.error(error);
                    res.status(404).json({ message: "User Not Created even tho he don't exist" });
                })
            }
        }
    ).catch(error => {
        console.error(error);
        res.status(404).json({ message: "We have a problem in outer catch" });
    })
}


const LogIn = (req, res) => {
    console.log('Loging In');
    const { userPassword, userEmail } = req.body;
    console.log(userEmail, userPassword);
    userData.findOne({ schemaEmail: userEmail }).then(
        async (user) => {
            if (user && await bcrypt.compare(userPassword, user.schemaPassword)) {
                const token = JWT.sign({ ID: user._id, userEmail: user.schemaEmail }, process.env.SECURITYKEY);
                // const userInformation = await userInfo.findById(user._id);
                res.status(200).json({ message: "You are logged in", token, ID: user._id });
                console.log("LogedIn");
            } else if (!user) {
                res.status(404).json({ message: "User don't exist" });
                console.log("User don't exist");
            } else {
                res.status(401).json({ message: "Wrong Password" });
                console.log("Wrong Password");
            }
        }
    ).catch(
        (error) => {
            console.log("here: 3");
            console.error(error);
            res.status(404).json({ message: "We have a problem in first outer catch" });
        }
    );
}

const userInfoSave = (req, res) => {
    console.log("Here: ");
    const { userID, userName, userAge, userGender, userDOB } = req.body;
    const user = {
        usdName: userName,
        usdAge: userAge,
        usdGender: userGender,
        usdDOB: userDOB
    };

    userInfo.findOneAndUpdate({ _id: userID }, user, { upsert: true, new: true })
        .then(updatedUser => {
            res.status(200).json({ message: "User Info Saved" });
        })
        .catch(err => {
            console.error(err);
            res.status(404).json({ message: "User Info not saved" });
        });
};

const userInfoGet = (req, res) => {
    console.log("Here: 1");
    const userID = req.query.userID;
    console.log(userID);
    userInfo.findOne({ _id: userID }).then(
        (user) => {
            if (user) {
                res.status(200).json({ message: "User Found", user });
            } else
                res.status(404).json({ message: "User Not Found" });
        }
    ).catch(
        (error) => {
            console.error(error);
            res.status(500).json({ message: "We have a problem in outer catch" })
        }
    )
}

const deleteUser = (req, res) => {
    const userID = req.query.userID;
    console.log(userID);

    userData.deleteOne({ _id: userID })
        .then(() => {
            userInfo.deleteOne({ _id: userID })
                .then(() => {
                    res.status(200).json({ message: "User and user info deleted successfully" });
                })
                .catch((error) => {
                    console.error(error);
                    res.status(404).json({ message: "User info not found or deletion failed" });
                });
        })
        .catch((error) => {
            console.error(error);
            res.status(404).json({ message: "User not found or deletion failed" });
        });
};


module.exports = { Registration, LogIn, userInfoSave, userInfoGet, deleteUser }