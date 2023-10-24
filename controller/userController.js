var db = require("../models");
const {Sequelize ,Op,QueryTypes} = require('sequelize')
var User = db.user;
var Contact = db.contact;
var addUser = async(req,res) => {
const jane = await User.create({ firstName : "Robbin" , lastName :"singh" });
// const jane = User.build({ firstName : "Jane" , lastName :"singh" });
console.log(jane instanceof User); // true
console.log(jane.firstName); // "Jane";
// jane.set({
//   firstName  : "Anuj",
//   lastName :" Kumar"
//   });

await jane.update({firstName:'Arun' , lastName:"Kumar"})
await jane.save();
//await jane.reload();
console.log('Jane was saved to the database!');
//await  jane.destroy();
console.log(jane.toJSON());
res.status(200).json(jane.toJSON());

}

var getUsers = async(req,res) => {
    const data = await User.findAll({});
    res.status(200).json({data:data})
}

var getUser = async(req,res) => {
    const data = await User.findOne({
        where : {
            id:req.params.id
        }
    });
    res.status(200).json({data:data})
}

var postUsers = async(req,res) => {
    var postData = req.body;
    if(postData.length > 1) {
        var data = await User.bulkCreate(postData);
    }  
    else {
        var data = await User.create(postData);
    }
   
    res.status(200).json({data:data})
}


var deleteUser = async(req,res) => {
    const data = await User.destroy({
        where : {
            id:req.params.id
        }
});
res.status(200).json({data:data})
}

var patchUser = async(req,res) => {
    var updatedData = req.body;
    const data = await User.update(updatedData ,{
        where : {
            id:req.params.id
        }
});
res.status(200).json({data:data})
}

// var queryUser = async(req,res) => {
//     const data = await User.create({
//         firstName: 'Ajay',
//         lastName: "Gupta"
//       }, { fields: ['firstName'] });

//     res.status(200).json({data:data})
// }



// var queryUser = async(req,res) => {
//     const data = await User.findAll({
//        attributes : ["id",['firstName' , "first_Name"]  ,
//        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'] ]
    
    
//     });

//     res.status(200).json({data:data})
// }

// var queryUser = async(req,res) => {
//     // const data = await User.findAll({
//     //    attributes : {exclude : ['lastName',"firstName"],
//     //    include:['id',[ Sequelize.fn('COUNT',Sequelize.col('id')) , 'count']]
//     // }  
//     // });

//     res.status(200).json({data:data})
// }



 var queryUser = async(req,res) => {
  //const data = await User.findAll({
//     where: {
//         // id: {
//         //     [Op.eq]:17
//         // }

//         // [Op.and]: [
//         //     { id: 17 },
//         //     { firstName: 'Arun' }
//         //   ]
//     }

// order : [
//     ['id' , 'DESC']
//   ],
//   group :'lastName',
//   limit : 1,
//   offset : 1
//     })
// //desc 
//     res.status(200).json({data:data});


// const data = await User.count({
//     where: {
//       id: {
//         [Op.gt]: 3
//       }
//     }
//   });
//   res.status(200).json({data:data});
}


//findOne And findAll
// var findersUser = async(req,res) => {
// const data = await User.findOne({
//     where : {
//         lastName:'kumar'
//     }
//   });
//   res.status(200).json({data:data});
// }


// var findersUser = async(req,res) => {
//     const data = await User.findByPk(15);
      
//       res.status(200).json({data:data});
//     }

//  var findersUser = async(req,res) => {
//     const [user , created]= await User.findOrCreate({
//         where : {firstName:"Monu"},
//         default:{
//             lastName: 'Kumar'
//         }
//     });
      
//       res.status(200).json({data:user , created:created});
//     }


var findersUser = async(req,res) => {
    const {count , rows} = await User.findAndCountAll({
        where : {lastName:"singh"},
       
    });
      
      res.status(200).json({data:rows , count:count});
    }


var getSetVirtualUser =  async(req,res) => {
    const data = await User.findAll({
    where : {lastName : 'singh'}
    })

    // const data = await User.create({
    //     firstName:'Naresh',
    //     lastName:'Kumar'
    //     })
    res.status(200).json({data:data});
}

var validateUser = async (req,res) =>{
    var data = {};
    var messages = {}
    try {

        
     data = await User.create({
        firstName:"rom1222",
        lastName:"Kumar"
          })

    } catch(e){
        //console.log(e.errors);
        let message;
        e.errors.forEach(error => {
            switch(error.validatorKey){
                case 'isAlpha' :
                 message = 'Only Alphabet is Allowed'
                    break;
                    case  'isLowercase' :
                    message = error.message;
                    break;
                    case  'len' :
                        message = 'min 2 and max 10 character is allowed';
                        break;

                   
            }
            messages[error.path] = message;
        })

    }
          res.status(200).json({data:data , messages:messages})
}



// var rawQueriesUser = async(req,res) => {
 
//     const users = await db.sequelize.query("SELECT * FROM `users`", 
//     { type: QueryTypes.SELECT,
//     model:User,
//     mapToModel:true,
    
    
//     });
    
// res.status(200).json({data:users})

// }



var rawQueriesUser = async(req,res) => {
 
    const users = await db.sequelize.query(
        // 'SELECT * FROM users WHERE lastName = ?',
        'SELECT * FROM users WHERE id = ?',
        {
          replacements: ["1"],
          type: QueryTypes.SELECT
        }
      );
    res.status(200).json({data:users})

}

var oneToOneUser = async (req,res) => {
//var data = await User.create({firstName:'guru',lastName:"Kumar"})
    // if(data && data.id) {
    //     await Contact.create({permanent_address:'abcd',
    //     'current_address':'axyz', 'user_id':data.id})
    // }
   
//    var data =  await User.findAll({
//       attributes:['firstName','lastName'],
//      include:[{
//         model:Contact,
//         as:'contactDetails',
//         attributes:['permanent_address','current_address']
//      }],
//    where:{id:3}
//    })

 
var data =  await Contact.findAll({
    attributes:['permanent_address','current_address'],
   include:[{
      model:User,
      as:'userDetails',
      attributes:['firstName','lastName']
   }],
 where:{id:3}
 })


res.status(200).json({data:data})
}

var oneToManyUser = async(req,res) =>{
//    const data =    await Contact.create({permanent_address:'Delhi',
//    'current_address':'Noida', 'user_id':3});

//    var data =  await User.findAll({
//       attributes:['firstName','lastName'],
//      include:[{
//         model:Contact,
//         as:'contactDetails',
//         attributes:['permanent_address','current_address']
//      }],
//    where:{id:3}
//    })

 
var data =  await Contact.findAll({
    attributes:['permanent_address','current_address'],
   include:[{
      model:User,
      as:'userDetails',
      attributes:['firstName','lastName']
   }],
 where:{id:3}
 })
    res.status(200).json({data:data})
}


var manyToManyUser = async (req,res)=>{

// var data = await User.create({firstName:'varun',lastName:"gupta"})
//     if(data && data.id) {
//         await Contact.create({permanent_address:'surat',
//         'current_address':'aagra'})
//     }
  
//     var data = {}


const data = await Contact.findAll({
    attributes: ['permanent_address', 'current_address'],
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName']
      }
    ]
  });
  

//    var data =  await User.findAll({
//       attributes:['firstName','lastName'],
//      include:[{
//         model:Contact,
//         attributes:['permanent_address','current_address']
//      }],
   
//    })
       
        res.status(200).json({data:data});
    }
    

module.exports = {
    addUser,
    getUsers,
    getUser,
    postUsers,
    deleteUser,
    patchUser,
    queryUser,
    findersUser,
    getSetVirtualUser,
    validateUser,
    rawQueriesUser,
    oneToOneUser,
    oneToManyUser,
    manyToManyUser
}








