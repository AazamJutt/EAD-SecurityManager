var SecurityManager = {};

SecurityManager = (function () {

    //private data members
    var _users = { key: '_users', data: [] };
    var _roles = { key: '_roles', data: [] };
    var _permissions = { key: '_permissions', data: [] };
    var _rolePermissions = { key: '_rolePermissions', data: [] };
    var _userRoles = { key: '_userRoles', data: [] };

    var _countries = [];
    var _cities = [];



    //private functions
    function _initialize() {
        _loadDataFromLocalStorage();
        _setCountries();
        _setCities();
    }
    function _setCountries() {
        _countries.push({ CountryID: 1, Name: 'Pakistan' });
        _countries.push({ CountryID: 2, Name: 'India' });
        _countries.push({ CountryID: 3, Name: 'China' });
    }
    function _setCities() {
        _cities.push({ CityID: 1, CountryID: 1, Name: 'Lahore' });
        _cities.push({ CityID: 2, CountryID: 1, Name: 'Karachi' });
        _cities.push({ CityID: 3, CountryID: 1, Name: 'Islamabad' });
        _cities.push({ CityID: 4, CountryID: 2, Name: 'Delhi' });
        _cities.push({ CityID: 5, CountryID: 2, Name: 'Bombay' });
        _cities.push({ CityID: 6, CountryID: 3, Name: 'Shanghai' });
        _cities.push({ CityID: 7, CountryID: 3, Name: 'Beijing' });

    }

    function _getCitiesByCountryId(cid) {
        var cities = [];

        for (var i = 0; i < _cities.length; i++) {
            if (_cities[i].CountryID == cid) {
                cities.push(_cities[i]);
            }
        }
        return cities;
    }

    function _loadDataFromLocalStorage() {

        debugger;
        if (window.localStorage) {
            if (window.localStorage[_users.key])
                _users = JSON.parse(window.localStorage[_users.key]);
            else
                _setInLocalStorage(_users);

            if (window.localStorage[_roles.key])
                _roles = JSON.parse(window.localStorage[_roles.key]);
            else
                _setInLocalStorage(_roles);

            if (window.localStorage[_permissions.key])
                _permissions = JSON.parse(window.localStorage[_permissions.key]);
            else
                _setInLocalStorage(_permissions);

            if (window.localStorage[_rolePermissions.key])
                _rolePermissions = JSON.parse(window.localStorage[_rolePermissions.key]);
            else
                _setInLocalStorage(_rolePermissions);

            if (window.localStorage[_userRoles.key])
                _userRoles = JSON.parse(window.localStorage[_userRoles.key]);
            else
                _setInLocalStorage(_userRoles);


            //if (!_users) {
            //    _users = [];
            //_users.push({ ID: 1, Name: 'Bilal1', Email: 'bilal.shahzad@pucit.edu.pk', Age: 100, Country: 1, City: 1, Login: 'bilal1', Password: 'abc' });
            //}

        }
    }
    function _setInLocalStorage(obj) {

        if (window.localStorage) {
            window.localStorage[obj.key] = JSON.stringify(obj);
        }
    }

    function _validateAdmin(login, password) {
        if (login == "admin" && password == "admin")
            return true;
        else
            return false;
    }

    //Create/Update
    function _save(obj, record, successFunction, errorFunction) {

        debugger;
        //New Record
        if (!record.ID || record.ID <= 0) {
            record.ID = _getMaxId(obj.data) + 1;
            obj.data.push(record);
        }
        else //Existing Record
        {
            var index = _findRecordIndex(obj.data, record.ID);
            if (index < 0) {
                if (errorFunction)
                    errorFunction("Invalid ID");
                return false;
            }
            else {
                obj.data[index] = record;
            }
        }//end of else

        _setInLocalStorage(obj);

        if (successFunction)
            successFunction(record);

        return true;
    }//end of _save

    //Delete
    function _delete(obj, id, successFunction, errorFunction) {

        var index = _findRecordIndex(obj.data, id);
        if (index < 0) {
            if (errorFunction)
                errorFunction("Invalid ID");

            return false;
        }
        else {
            obj.data.splice(index, 1);
        }

        _setInLocalStorage(obj);

        if (successFunction)
            successFunction(id);

        return true;
    }//end of _saveUser

    //Get By Id
    function _getById(list, id) {
        var index = _findRecordIndex(list, id);
        return list[index];
    }

    function _findRecordIndex(list, id) {
        var index = -1;
        for (var i = 0; i < list.length; i++) {
            if (list[i].ID == id) {
                index = i;
                break;
            }
        }
        return index;
    }
    function _getMaxId(list) {

        var maxId = 0;
        for (var i = 0; i < list.length; i++) {
            if (list[i].ID > maxId)
                maxId = list[i].ID;
        }
        return maxId;
    }

    //signleton object with public functions
    return {
        Initialize: function () {
            _initialize();
        },
        ValidateAdmin: function (login, password) {
            return _validateAdmin(login, password);
        },
        //User Functions
        SaveUser: function (userObj, successFunction, errorFunc) {
            return _save(_users, userObj, successFunction, errorFunc);
        },
        DeleteUser: function (userID, successFunction, errorFunc) {
            return _delete(_users, userID, successFunction, errorFunc);
        },
        GetUserById: function (userID) {
            return _getById(_users.data, userID);
        },
        GetAllUsers: function () {
            return _users.data;
        },

        //Role Functions
        SaveRole: function (roleObj, successFunction, errorFunc) {
            return _save(_roles, roleObj, successFunction, errorFunc);
        },
        DeleteRole: function (roleID, successFunction, errorFunc) {
            return _delete(_roles, roleID, successFunction, errorFunc);
        },
        GetRoleById: function (roleID) {
            return _getById(_roles.data, roleID);
        },
        GetAllRoles: function () {
            return _roles.data;
        },
        //Permission Functions
        SavePermission: function (permissionObj, successFunction, errorFunc) {
            return _save(_permissions, permissionObj, successFunction, errorFunc);
        },
        DeletePermission: function (permissionID, successFunction, errorFunc) {
            return _delete(_permissions, permissionID, successFunction, errorFunc);
        },
        GetPermissionById: function (permissionID) {
            return _getById(_permissions.data, permissionID);
        },
        GetAllPermissions: function () {
            return _permissions.data;
        },
        //RolePermission Functions
        SaveRolePermission: function (rolePermissionObj, successFunction, errorFunc) {
            return _save(_rolePermissions, rolePermissionObj, successFunction, errorFunc);
        },
        DeleteRolePermission: function (rolePermissionID, successFunction, errorFunc) {
            return _delete(_rolePermissions, rolePermissionID, successFunction, errorFunc);
        },
        GetRolePermissionById: function (rolePermissionID) {
            return _getById(_rolePermissions.data, rolePermissionID);
        },
        GetAllRolePermissions: function () {
            return _rolePermissions.data;
        },
        //UserRole Functions
        SaveUserRole: function (userRoleObj, successFunction, errorFunc) {
            return _save(_userRoles, userRoleObj, successFunction, errorFunc);
        },
        DeleteUserRole: function (userRoleID, successFunction, errorFunc) {
            return _delete(_userRoles, userRoleID, successFunction, errorFunc);
        },
        GetUserRoleById: function (userRoleID) {
            return _getById(_userRoles.data, userRoleID);
        },
        GetAllUserRoles: function () {
            return _userRoles.data;
        },
        GetCountries: function () {
            return _countries;
        },
        GetCitiesByCountryId: function (cid) {
            return _getCitiesByCountryId(cid);
        }

    }//end of singleton object


})();

SecurityManager.Initialize();

function gid(id) {
    return document.getElementById(id);
}

function redirect(url) {
    Window.location.href = url;
}

// Admdin Page
function loginAdmin() {
    var login = gid("admin-login").value
    var pass = gid("admin-password").value
    if (SecurityManager.ValidateAdmin(login, pass)) {
        window.location.href = "pages/admin.html"
        return false;
    }
}



// User Managerment Page
function loadUserManagePage() {
    addCountries()
    addCities()
    loadUserTable()
}
function addCountries() {
    var s = gid("countries");
    var countries = SecurityManager.GetCountries();
    for (const country of countries) {
        var opt = document.createElement("option");
        opt.value = country.CountryID;
        opt.innerText = country.Name;
        s.appendChild(opt);
    }
    s.selected = s.options[0];
}
function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for (i = L; i >= 0; i--) {
        selectElement.remove(i);
    }
}

function addCities() {
    var selected = gid("countries").value;
    var s = gid("cities");
    removeOptions(s);
    var cities = SecurityManager.GetCitiesByCountryId(selected);
    for (const city of cities) {
        var opt = document.createElement("option");
        opt.value = city.CityID;
        opt.innerText = city.Name;
        s.appendChild(opt);
    }
}

function getTD(data) {
    var td = document.createElement("td");
    td.innerText = data;
    return td;
}

function validateUser(new_user) {
    var users = SecurityManager.GetAllUsers()
    for (const user of users) {
        if (user.Login == new_user.Login || user.Email == new_user.Email) {
            return false
        }
    }
    return true
}

var editMode = false
function saveUserObject() {
    var user = {
        Login: gid("user-login").value,
        Password: gid("user-pass").value,
        Name: gid("user-name").value,
        Email: gid("user-email").value,
        Country: gid("countries").value,
        City: gid("cities").value
    }
    if (!editMode && !validateUser(user)) {
        alert("User with this Login or Email already exists")
        return
    }
    else if(editMode) {
        // Add Id if user already exists
        var id = getUserIdbyLogin(user)
        if (id != -1) {
            user.ID = id
        }
        editMode = false
    }
    SecurityManager.SaveUser(user, reload, error);
}

function error(msg) {
    console.log(msg)
}

function editUser(id) {
    editMode = true
    var row = gid("users").rows[Number(id) + 1]
    id = Number(row.cells[0].innerText)
    var user = SecurityManager.GetUserById(id)
    gid("user-login").value = user.Login
    gid("user-pass").value = ""
    gid("user-name").value = user.Name
    gid("user-email").value = user.Email
    gid("countries").value = Number(user.Country)
    addCities()
    gid("cities").value = Number(user.City)
}
function reload() {
    location.reload()
}
function getUserIdbyLogin(user) {
    var users = SecurityManager.GetAllUsers()
    for (const u of users) {
        if (u.Login == user.Login || u.Email == user.Email) {
            return users[i].ID
        }
    }
    return -1
}
function deleteUser(id) {
    var r = confirm("Are you sure you want to Delete?");
    if (r) {
        var row = gid("users").rows[Number(id) + 1]
        id = Number(row.cells[0].innerText)
        SecurityManager.DeleteUser(Number(id), reload, error)
    } else {
        return;
    }
}

function loadUserTable() {
    var table = gid("users-tbody");
    var users = SecurityManager.GetAllUsers()
    for (let i = 0; i < users.length; i++) {
        var row = document.createElement("tr");
        row.appendChild(getTD(users[i].ID))
        row.appendChild(getTD(users[i].Name))
        row.appendChild(getTD(users[i].Email))
        row.innerHTML += `<td><button id=${i} class="edit-btn" onclick="editUser(this.id)">Edit</button></td>`
        row.innerHTML += `<td><button id=${i} onclick="deleteUser(this.id)" style="color:red;">Delete</button></td>`
        table.appendChild(row)
    }
}



// Permission Management

function validatePermission(obj){
    var perms = SecurityManager.GetAllPermissions()
    console.log(perms)
    for (const perm of perms) {
        if (perm.Name == obj.Name) {
            return false
        }
    }
    return true
}

function getPermissionId(obj) {
    var perms = SecurityManager.GetAllPermissions()
    for (const perm of perms) {
        if (perm.Name == obj.Name) {
            return perm.ID
        }
    }
    return -1
}

function editPermission(id) {
    editMode = true
    var row = gid("permissions").rows[Number(id) + 1]
    id = Number(row.cells[0].innerText)
    var perm = SecurityManager.GetPermissionById(id)
    gid("perm-name").value = perm.Name
    gid("perm-name").disabled = true
    gid("perm-desc").value = perm.Description
    
}

function deletePermission(id) {
    var r = confirm("Are you sure you want to Delete?");
    if (r) {
        var row = gid("permissions").rows[Number(id) + 1]
        id = Number(row.cells[0].innerText)
        SecurityManager.DeletePermission(Number(id), reload, error)
    } else {
        return;
    }
}


function savePermissionObject() {
    var permission = {
        Name: gid("perm-name").value,
        Description: gid("perm-desc").value
    }
    console.log(permission)
    if (!editMode && !validatePermission(permission)) {
        alert("Permission with this Name already exists")
        return false
    }
    else if(editMode) {
        // Add Id if user already exists
        var id = getPermissionId(permission)
        if (id != -1) {
            permission.ID = id
        }
        editMode = false
    }
    SecurityManager.SavePermission(permission, reload, error);
}

function loadPermissions() {
    var table = gid("permissions-tbody");
    var perms = SecurityManager.GetAllPermissions()
    for (let i = 0; i < perms.length; i++) {
        var row = document.createElement("tr");
        row.appendChild(getTD(perms[i].ID))
        row.appendChild(getTD(perms[i].Name))
        row.appendChild(getTD(perms[i].Description))
        row.innerHTML += `<td><button id=${i} class="edit-btn" onclick="editPermission(this.id)">Edit</button></td>`
        row.innerHTML += `<td><button id=${i} onclick="deletePermission(this.id)" style="color:red;">Delete</button></td>`
        table.appendChild(row)
    }
}

// Role Management

function validateRole(obj){
    var roles = SecurityManager.GetAllPermissions()
    console.log(roles)
    for (const role of roles) {
        if (role.Name == obj.Name) {
            return false
        }
    }
    return true
}

function getRoleId(obj) {
    var roles = SecurityManager.GetAllRoles()
    for (const role of roles) {
        if (role.Name == obj.Name) {
            return perm.ID
        }
    }
    return -1
}

function editRole(id) {
    editMode = true
    var row = gid("roles").rows[Number(id) + 1]
    id = Number(row.cells[0].innerText)
    var perm = SecurityManager.GetroleById(id)
    gid("perm-name").value = perm.Name
    gid("perm-name").disabled = true
    gid("perm-desc").value = perm.Description
    
}

function deleteRole(id) {
    var r = confirm("Are you sure you want to Delete?");
    if (r) {
        var row = gid("roles").rows[Number(id) + 1]
        id = Number(row.cells[0].innerText)
        SecurityManager.DeleteRole(Number(id), reload, error)
    } else {
        return;
    }
}


function saveRoleObject() {
    var role = {
        Name: gid("perm-name").value,
        Description: gid("perm-desc").value
    }
    console.log(role)
    if (!editMode && !validateRole(role)) {
        alert("role with this Name already exists")
        return false
    }
    else if(editMode) {
        // Add Id if user already exists
        var id = getRoleId(role)
        if (id != -1) {
            role.ID = id
        }
        editMode = false
    }
    SecurityManager.SaveRole(role, reload, error);
}

function loadRoles() {
    var table = gid("roles-tbody");
    var perms = SecurityManager.GetAllRoles()
    for (let i = 0; i < perms.length; i++) {
        var row = document.createElement("tr");
        row.appendChild(getTD(perms[i].ID))
        row.appendChild(getTD(perms[i].Name))
        row.appendChild(getTD(perms[i].Description))
        row.innerHTML += `<td><button id=${i} class="edit-btn" onclick="editRole(this.id)">Edit</button></td>`
        row.innerHTML += `<td><button id=${i} onclick="deleteRole(this.id)" style="color:red;">Delete</button></td>`
        table.appendChild(row)
    }
}


// Role Permissions Management

function validateRolePermissions(obj){
    var rolePermissionss = SecurityManager.GetAllRolePermissions()
    console.log(rolePermissionss)
    for (const RolePermissions of rolePermissionss) {
        if (RolePermissions.Role == obj.Role && RolePermissions.Permission == obj.Permission) {
            return false
        }
    }
    return true
}

function getRolePermissionsId(obj) {
    var rolePermissions = SecurityManager.GetAllRolePermissions()
    for (const rolePermission of rolePermissions) {
        if (rolePermission.Role == obj.Role) {
            return rolePermission.ID
        }
    }
    return -1
}

function editRolePermissions(id) {
    editMode = true
    var row = gid("role-permissions").rows[Number(id) + 1]
    id = Number(row.cells[0].innerText)
    var rp = SecurityManager.GetRolePermissionById(id)
    gid("select-role").value = rp.Role
    gid("select-role").disabled = true
    gid("select-perm").value = rp.Permission
}

function deleteRolePermissions(id) {
    var r = confirm("Are you sure you want to Delete?");
    if (r) {
        var row = gid("role-permissions").rows[Number(id) + 1]
        id = Number(row.cells[0].innerText)
        SecurityManager.DeleteRolePermission(Number(id), reload, error)
    } else {
        return;
    }
}


function saveRolePermissionsObject() {
    var rolePermission = {
        Role: gid("select-role").value,
        Permission: gid("select-perm").value
    }
    if (!editMode && !validateRolePermissions(rolePermission)) {
        alert("Role-Permission already exists")
        return false
    }
    else if(editMode) {
        // Add Id if user already exists
        var id = getRolePermissionsId(rolePermission)
        if (id != -1) {
            rolePermission.ID = id
        }
        editMode = false
    }
    SecurityManager.SaveRolePermission(rolePermission, reload, error);
}

function loadRoleOptions(){
    var roles = SecurityManager.GetAllRoles()
    var s = gid("select-role");
    for (const role of roles) {
        var opt = document.createElement("option");
        opt.value = role.Name;
        opt.innerText = role.Name;
        s.appendChild(opt);
    }
}

function loadPermOptions(){
    var permissions = SecurityManager.GetAllPermissions()
    var s = gid("select-perm");
    for (const perm of permissions) {
        var opt = document.createElement("option");
        opt.value = perm.Name;
        opt.innerText = perm.Name;
        s.appendChild(opt);
    }
}

function loadRolePermissions() {
    loadRoleOptions()
    loadPermOptions()
    var table = gid("role-permission-tbody");
    var data = SecurityManager.GetAllRolePermissions()
    for (let i = 0; i < data.length; i++) {
        var row = document.createElement("tr");
        row.appendChild(getTD(data[i].ID))
        row.appendChild(getTD(data[i].Role))
        row.appendChild(getTD(data[i].Permission))
        row.innerHTML += `<td><button id=${i} class="edit-btn" onclick="editRolePermissions(this.id)">Edit</button></td>`
        row.innerHTML += `<td><button id=${i} onclick="deleteRolePermissions(this.id)" style="color:red;">Delete</button></td>`
        table.appendChild(row)
    }
}

