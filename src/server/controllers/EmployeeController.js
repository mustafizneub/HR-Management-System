const firebase = require("firebase");
const admin = require("firebase-admin");
let streamifier = require("streamifier");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "mihrab-miah",
  api_key: "432263745922327",
  api_secret: "_ZoKJ21GiSg3vaz-wY4zQrgpIkE",
});

require("firebase/firestore");
require("firebase/auth");

const db = admin.firestore();
const auth = firebase.auth();

let uploadFromBuffer = (req) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream({
        folder: "employee-image",
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
  });
};


(exports.getEmployees = (req, res, next) => {
  try {
    db.collection("registered-table").where('basic.employee_status', '==', 'active').onSnapshot((snap) => {
      let data = [];
      snap.forEach((employee) => {
        data.push(employee.data());
      });

      if (data.length > 0) {
        return res.status(200).send(data);
      } else {
        return res.status(204).send({
          message: "No Data Found",
        });
      }
    });
  } catch (err) {
    return res.status(500).send({
      message: "Problem Occured While Fetching Data",
      error: err,
    });
  }
}),

(exports.addEmployee = async (req, res, next) => {
  try {
    let result = await uploadFromBuffer(req);
    let employee = {
      contact: {
        phone_number: "017XXXXXXXX",
        email: "david@host.com",
      },
      bankDetails: "eyJiYW5rbmFtZSI6IlN0YW5kYXJkIEJhbmsiLCJicmFuY2giOiJKYWlsIFJvYWQgQnJhbmNoLCBTeWxoZXQiLCJob2xkZXIiOiJEYW5pZWxsZSBQYW5hYmFrZXIiLCJhY2Nfbm8iOiIwMTIzNDU2Nzg5ODc0In0=",
      address: {
        state: "Bangladesh",
        zip: "3100",
        street: "Subidbazar",
        city: "Sylhet",
      },
      basic: {
        joining_date: "2020-05-05",
        employee_status: "active",
        lastname: "Andrew",
        avatar: "",
        designation: "Data Evangelist",
        username: "Andrew",
        gender: "Male",
        employee_id: "YT-105",
        password: "aA1_aA1",
        company: "YoTech",
        nid: "0123456789",
        department: "Artificial Intelligence",
        firstname: "David ",
      },
    };
    if (result["secure_url"]) {
      employee.basic.avatar = result["secure_url"];
      let registerEmployee = await auth.createUserWithEmailAndPassword(
        employee.contact.email,
        employee.basic.password
      );
      let addEMployee = await db.collection("registered-table").add(employee);

      await db
        .collection("registered-table")
        .doc("total-employees")
        .update({
          "total-employee": firebase.firestore.FieldValue.increment(1),
        });

      return res.send(addEMployee.data());
    }
  } catch (err) {
    return res.send(err);
  }
}),

(exports.getEmployee = async (req, res, next) => {
  try {
    let empId = req.params.id;
    let data = db.collection("registered-table").doc(empId);
    data.onSnapshot((snap) => {
      if (snap.data()) {
        return res.status(200).send(snap.data());
      } else {
        next(
          res.status(402).send({
            status: 402,
            message: "NO Employee Found!",
          })
        );
      }
    });
  } catch (err) {
    return res.status(500).send({
      message: "Problem Occured While Fetching Data",
      error: err,
    });
  }
}),

(exports.updateEmployee = async (req, res, next) => {
  try {
    let employee = {
      contact: {
        phone_number: "017XXXXXXXX",
        email: "david@host.com",
      },
      bankDetails: "eyJiYW5rbmFtZSI6IlN0YW5kYXJkIEJhbmsiLCJicmFuY2giOiJKYWlsIFJvYWQgQnJhbmNoLCBTeWxoZXQiLCJob2xkZXIiOiJEYW5pZWxsZSBQYW5hYmFrZXIiLCJhY2Nfbm8iOiIwMTIzNDU2Nzg5ODc0In0=",
      address: {
        state: "Bangladesh",
        zip: "3100",
        street: "Subidbazar",
        city: "Sylhet",
      },
      basic: {
        joining_date: "2020-05-05",
        employee_status: "active",
        lastname: "Andrew",
        avatar: "",
        designation: "Data Evangelist",
        username: "David",
        gender: "Male",
        employee_id: "YT-101",
        password: "aA1_aA1",
        company: "YoTech",
        nid: "0123456789",
        department: "Artificial Intelligence",
        firstname: "David ",
      },
    };

    if (req.file) {
      let result = await uploadFromBuffer(req);

      if (result["secure_url"]) {
        employee.basic.avatar = result["secure_url"];
        let updateEmployee = await db.collection("registered-table").doc(req.params.id).update(employee)
        return res.send(updateEmployee)
      }
    } else {
      let updateEmployee = await db.collection("registered-table").doc(req.params.id).update(employee)
      return res.send(updateEmployee);
    }
  } catch (err) {
    return res.send({
      "message": "Something went wrong while updating an employee"
    })
  }

}),

(exports.deleteEmployee = (req, res, next) => {
  try {
    db.collection('registered-table').doc(req.params.id).set({
      basic: {
        employee_status: 'inactive'
      }
    }, {
      merge: true
    });
    return res.send({
      "message": "Employee status set to inactive"
    })
  } catch (err) {
    res.send({
      "message": "Something went wrong while deleting an employee!"
    })
  }
});
