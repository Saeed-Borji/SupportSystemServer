import User from "../models/user.model.js";
import UserRecipt from "../models/userRecipt.model.js";
import httpStatus from "http-status";
//import urlJoin from "url-join";

// Register user controller
export default class UserController {
  static notFound(res, message = "Requested address not found") {
    res.status(httpStatus.NOT_FOUND).send(message);
  }

  // Crates a new user
  static async create(req, res) {
    console.log(req.body, req.file);

    const userData = {
      status: req.body.status,
      userName: req.body.username,
      accountType: req.body.accounttype,
      password: req.body.password,
      bankAccountNumber: req.body.accountnumber,
      bankAccountName:  req.body.accountname,
      bankName: req.body.bankname,
      checked: '-1'
    };

    const user = await User.create(userData);
    await UserRecipt.create({
      user: user._id,
      fileName: req.file.originalname,
      path: req.file.path
    })

    //const url = urlJoin(req.getPath(), `${user._id}`);
    res
      .status(httpStatus.CREATED)
      /*.location(url)*/
      .send({statusMessage: 'Test', resultID: 0});

    res.end();
  }

  static async login(req, res) {
    const {username, password} = req.body

    const user = await User.findOne({ userName: username, password  }).exec();

    console.log(user)

    res.status(httpStatus.OK)

    if(user){
      res.send({CheckID: user.checked, resultID: 0, statusMessage: ''})
    }else{
      res.send({CheckID: -1, resultID: 3})
    }

    res.end();
  }
}
