/**
 * @apiDefine UnauthorizedError
 * @apiVersion 1.0.0
 *
 * @apiError Unauthorized Only authenticated users can access the endpoint.
 */

/**
 * @apiDefine ServerError
 * @apiVersion 1.0.0
 *
 * @apiError (Error 500) 500 Something went wrong
 */

/**
 * @apiDefine NotFoundError
 * @apiVersion 1.0.0
 *
 * @apiError 404 Resource Not Found
 */

// AUTH

/**
 * @api {post} /login Login
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 * @apiParam (Request) {String} email A valid email that exists in system
 * @apiParam (Request) {String} password Password use for authentication
 * @apiSuccess {Boolean} status true/false.
 * @apiSuccess {Object} data Schema: { apiToken }
 * @apiUse ServerError
 */

/**
 * @api {post} /register Register
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Auth
 * @apiParam (Request) {String} username Name of user
 * @apiParam (Request) {String} email A valid email
 * @apiParam (Request) {String} password Password use for authentication
 * @apiSuccess {Boolean} status true/false.
 * @apiSuccess {Object} User {id, username, email, apiToken, createdAt, updatedAt}
 * @apiUse ServerError
 */

// USERS SECTION

/**
 * @api {get} /users List
 * @apiVersion 1.0.0
 * @apiName Users List
 * @apiGroup Users
 * @apiPermission authenticated api token
 *
 * @apiExample {js} Example usage:
 * let data = {
 *  _token: '794c8145-dfda-41a5-9f83-51008a202f53'
 * };
 * $http.get(url,data)
 * .success(()=>response)
 * .error(()=>err);
 *
 * @apiSuccess {array} list List of Users.
 * @apiSuccess {object} User {id, username, email, createdAt, updatedAt}
 *
 */

/**
 * @api {post} /users Create
 * @apiVersion 1.0.0
 * @apiName Create User
 * @apiGroup Users
 * @apiPermission authenticated api token
 * @apiParam (Request body) {Json} data {username, email, password}
 * @apiExample {js} Example usage:
 * let data = {
 *  _token: '794c8145-dfda-41a5-9f83-51008a202f53',
 *  username: 'test user',
 *  email: 'test@example.com',
 *  password: 'secret',
 * };
 * $http.post(url,data)
 * .success(()=>response)
 * .error(()=>err);
 *
 * @apiSuccess (Success 201) {object} User {id, username, email, createdAt, updatedAt}
 * @apiuse ServerError
 */

/**
 * @api {get} /users/:id Get
 * @apiVersion 1.0.0
 * @apiName Get User
 * @apiGroup Users
 * @apiPermission authenticated api token
 * @apiParam {Number} id The user id
 * @apiExample {js} Example usage:
 * let data = {
 *  _token: '794c8145-dfda-41a5-9f83-51008a202f53',
 * };
 * $http.get(url,data)
 * .success(()=>response)
 * .error(()=>err);
 *
 * @apiSuccess (Success 200) {object} User {id, username, email, createdAt, updatedAt}
 * @apiuse NotFoundError
 * @apiuse ServerError
 */

/**
 * @api {put} /users/:id Update
 * @apiVersion 1.0.0
 * @apiName Update User
 * @apiGroup Users
 * @apiPermission authenticated api token
 * @apiParam {Number} id The user id
 * @apiParam {Json} data {username, email}
 * @apiExample {js} Example usage:
 * let data = {
 *  _token: '794c8145-dfda-41a5-9f83-51008a202f53',
 * username: 'test user',
 * email: 'test@example.com',
 * };
 * $http.put(url,data)
 * .success(()=>response)
 * .error(()=>err);
 *
 * @apiSuccess (Success 200) {Boolean} updated true/false
 * @apiuse NotFoundError
 * @apiuse ServerError
 */

/**
 * @api {delete} /users/:id Delete
 * @apiVersion 1.0.0
 * @apiName Delete User
 * @apiGroup Users
 * @apiPermission authenticated api token
 * @apiParam {Number} id The user id
 * @apiExample {js} Example usage:
 * let data = {
 *  _token: '794c8145-dfda-41a5-9f83-51008a202f53',
 * };
 * $http.delete(url,data)
 * .success(()=>response)
 * .error(()=>err);
 *
 * @apiSuccess (Success 200) {Boolean} deleted true/false
 * @apiuse NotFoundError
 * @apiuse ServerError
 */

// EXPENSE SECTION

/**
 * @api {get} /expenses List
 * @apiVersion 1.0.0
 * @apiName Expenses List
 * @apiGroup Expenses
 * @apiPermission authenticated api token
 *
 * @apiSuccess {Array} list List of Expenses.
 * @apiSuccess {Object} Expense {id, amount, type, decription, createdBy, createdAt, updatedAt}
 *
 */

/**
 * @api {post} /expenses Create
 * @apiVersion 1.0.0
 * @apiName Create Expense
 * @apiGroup Expenses
 * @apiPermission authenticated api token
 * @apiParam (Request (json)) {String} type Type of Expense like: Sports, Food, Drinks etc.
 * @apiParam (Request (json)) {Number} amount The amount of expense in currency.
 * @apiParam (Request (json)) {Text} description The details of expense.
 * @apiParam (Request (json)) {Number} createdBy The id of user who created the expense.
 *
 * @apiSuccess (Success 201) {Object} Expense Schema: {id, username, email, createdBy, createdAt, updatedAt}
 * @apiuse ServerError
 */

/**
 * @api {get} /expenses/:id Get
 * @apiVersion 1.0.0
 * @apiName Get Expense
 * @apiGroup Expenses
 * @apiPermission authenticated api token
 * @apiParam {Number} id The expense id
 *
 * @apiSuccess (Success 200) {Object} Expense Schema: {id, amount, type, description, createdBy, createdAt, updatedAt}
 * @apiuse NotFoundError
 * @apiuse ServerError
 */

/**
 * @api {put} /expenses/:id Update
 * @apiVersion 1.0.0
 * @apiName Update Expense
 * @apiGroup Expenses
 * @apiPermission authenticated api token
 * @apiParam {Number} id The expense id
 * @apiParam (Request (json)) {String} type Type of Expense like: Sports, Food, Drinks etc.
 * @apiParam (Request (json)) {Number} amount The amount of expense in currency.
 * @apiParam (Request (json)) {Text} description The details of expense.
 * @apiParam (Request (json)) {Number} createdBy The id of user who created the expense.
 * @apiSuccess (Success 200) {Boolean} updated true/false
 * @apiuse NotFoundError
 * @apiuse ServerError
 */

/**
 * @api {delete} /expenses/:id Delete
 * @apiVersion 1.0.0
 * @apiName Delete Expense
 * @apiGroup Expenses
 * @apiPermission authenticated api token
 * @apiParam {Number} id The expense id
 * @apiSuccess (Success 200) {Boolean} deleted true/false
 * @apiuse NotFoundError
 * @apiuse ServerError
 */

// GROUPS SECTION

/**
 * @api {get} /groups List
 * @apiVersion 1.0.0
 * @apiName Groups List
 * @apiGroup Groups
 * @apiPermission authenticated api token
 *
 * @apiSuccess {Array} list List of Groups.
 * @apiSuccess {Object} Group Schema: {id, name, createdBy, createdAt, updatedAt}
 *
 */

/**
 * @api {post} /groups Create
 * @apiVersion 1.0.0
 * @apiName Create Group
 * @apiGroup Groups
 * @apiPermission authenticated api token
 * @apiParam (Request (json)) {String} name The name of group.
 * @apiParam (Request (json)) {Number} createdBy The id of user who created the group.
 *
 * @apiSuccess (Success 201) {Object} Group Schema: {id, name, createdBy, createdAt, updatedAt}
 * @apiuse ServerError
 */

/**
 * @api {get} /groups/:id Get
 * @apiVersion 1.0.0
 * @apiName Get Group
 * @apiGroup Groups
 * @apiPermission authenticated api token
 * @apiParam {Number} id The group id
 *
 * @apiSuccess (Success 200) {Object} Group Schema: {id, name, createdBy, createdAt, updatedAt}
 * @apiuse NotFoundError
 * @apiuse ServerError
 */

/**
 * @api {put} /groups/:id Update
 * @apiVersion 1.0.0
 * @apiName Update Group
 * @apiGroup Groups
 * @apiPermission authenticated api token
 * @apiParam {Number} id The group id
 * @apiParam (Request (json)) {String} name The name of group.
 * @apiParam (Request (json)) {Number} createdBy The id of user who created the group.
 * @apiSuccess (Success 200) {Boolean} updated true/false
 * @apiuse NotFoundError
 * @apiuse ServerError
 */

/**
 * @api {delete} /groups/:id Delete
 * @apiVersion 1.0.0
 * @apiName Delete Group
 * @apiGroup Groups
 * @apiPermission authenticated api token
 * @apiParam {Number} id The group id
 * @apiSuccess (Success 200) {Boolean} deleted true/false
 * @apiuse NotFoundError
 * @apiuse ServerError
 */

/**
 * @api {post} /groups/user/:group_id/:user_id Add User
 * @apiVersion 1.0.0
 * @apiName Add User
 * @apiGroup Groups
 * @apiPermission authenticated api token
 * @apiParam {Number} id The group id
 * @apiSuccess (Success 200) {Boolean} status true/false
 * @apiuse NotFoundError
 * @apiuse ServerError
 */

/**
 * @api {delete} /groups/user/:group_id/:user_id Remove User
 * @apiVersion 1.0.0
 * @apiName Remove User
 * @apiGroup Groups
 * @apiPermission authenticated api token
 * @apiParam {Number} id The group id
 * @apiSuccess (Success 200) {Boolean} status true/false
 * @apiuse NotFoundError
 * @apiuse ServerError
 */
