module.exports =  async (app) => {
  var Customer = app.models.customers;
  try {
    let Admin = await Customer.findOne({username: 'Admin'});
    if(!Admin) {
        let Admins = await Customer.create([{username: 'Admin', email: 'admin@confusion.net', password: 'password'}])
        Admin = Admins[0];

        // console.log("Created Admin ", Admin);

        var Role = app.models.Role;
        var RoleMapping = app.models.RoleMapping;
        //console.log("Current Role Mapping ", RoleMapping);
        // console.log("Current Role Mapping User", RoleMapping.USER);
        
        Role.destroyAll();
        RoleMapping.destroyAll();
  
        let AdminRole = await Role.findOne({ name:"Admin"})
        if(!AdminRole) {
          AdminRole = await Role.create({ name: "Admin" });
          // console.log('New Role Created..', AdminRole);
        }
        
        let AdminPrincipal = await AdminRole.principals.create({
          principalType: RoleMapping.USER,
          principalId: Admin.id,
        })
  
        // console.log("new Admin Principal Created..", AdminPrincipal);
    } else {
      // console.log("Admin is already there..", Admin);
    }
  } catch(error) {
    console.log(error);
  }
};
