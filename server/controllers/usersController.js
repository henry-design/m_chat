const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
var connection = mysql.createConnection({
  host: "db-mysql-nyc1-48935-do-user-11744856-0.b.db.ondigitalocean.com",
  user: "mash",
  password: "AVNS_VXRv3Ay_4B0-w5xskYr",
  database: "wisdomwater_history",
  port: 25060,
  ssl: {
    rejectUnauthorized: false,
  },

});

connection.connect();

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username: username });
    if (usernameCheck)
      return res.json({ msg: "username already in use", status: false });
    const emailCheck = await User.findOne({ email: email });
    if (emailCheck)
      return res.json({ msg: "email already in use", status: false });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    delete user.password;
    res.json({ msg: "user created successfully", status: true, user });
  } catch (err) {
    next(err);
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.json({ msg: "User Does not exist", status: false });

    const isPasswordsValid = await bcrypt.compare(password, user.password);
    if (!isPasswordsValid)
      return res.json({ msg: "password is incorrect", status: false });

    delete user.password;
    res.json({ msg: "user logged in successfully", status: true, user });
  } catch (err) {
    next(err);
  }
};
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage: avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};
module.exports.getMeterData = async (req, res, next) => {
  try {
    console.log(req.body);

   


    // let days = ((startDate.getTime() / 1000)-(6*86400)) - (await req.body.days) * 86400;
    // let days= (startDate.setDate(startDate.getDate()-await req.body.days))
    //let days =(startDate-(await req.body.days*86400));
let std=new Date(await req.body.startDate)
let endd= new Date(await req.body.endDate)
std =std.getTime()/1000;
endd =endd.getTime()/1000;
if (std > endd){
  let x=std
  std=endd;
  endd=x;
}


    const userId = await req.body.userId;

    await connection.query(
      `SELECT meter_code,daily_flow,collect_time,daily_use_time FROM wisdomwater_history.t_data_resident_history_detail_2022 where meter_code=${userId} and collect_time >${std} and collect_time < ${endd}`,
      function (error, results, fields) {
        if (error) throw error;
        console.log((plotD = results));

        return res.json({
          data: plotD,

          
        });
      }
    );
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

module.exports.getMeterMetaData = async (req, res, next) => {
  try {
    // console.log(req.body);

    // let startDate = new Date();
    // console.log(startDate);
    // let days = startDate.getTime() / 1000 - (await req.body.days) * 86400;
    // // let days= (startDate.setDate(startDate.getDate()-await req.body.days))
    // //let days =(startDate-(await req.body.days*86400));

    const userId = await req.body.userId;

    await connection.query(
      `SELECT  *  FROM( t_data_resident_history_detail_2022 join t_data_resident_history_2022 on t_data_resident_history_detail_2022.meter_id=t_data_resident_history_2022.meter_id)where t_data_resident_history_2022.meter_code=${userId} order by t_data_resident_history_2022.collect_time desc limit 0,1 `,
      function (error, results, fields) {
        if (error) throw error;
        console.log((Data = results));

        return res.json({
          data: Data,

          
        });
      }
    );
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};
