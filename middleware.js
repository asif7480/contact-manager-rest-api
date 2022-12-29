const express = require('express')
const path = require('path')
const router = express.Router()
const app = express()
const PORT = 5001;

//Builtin middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, "public")))

//Application level middleware
const loggerMiddleware = (request, response, next) => {
    console.log(`${new Date()} ---REQUEST [${request.method}] [${request.url}]`);
    next()
}

app.use(loggerMiddleware)

//Router-level middleware
app.use("/api/users", router)
const fakeAuth = (request, response, next) => {
    const authStatus = true;
    if(authStatus){
        // console.log("User AuthStatus: ", authStatus);
        next()
    }else{
        response.status(401)
        throw new Error("User is not authorized.")
    } 
        
}
const getUser = (request, response) => {
    response.json({ message: "Get All Users."})
}

const createUser = (request, response) => {
    console.log('This is the request body received from the client', request.body);
    response.json({ message: "New User Created."})
}

router.use(fakeAuth)
router.route("/").get(getUser).post(createUser)

//builtin middleware for invalid route handling
app.all('*', (request, response) => {
    response.status(404)
    throw new Error("Route not found")
})
//Error-handling middleware
const errorHandler = (err, request, response, next) => {
    const statusCode = response.statusCode ? response.statusCode : 500;
    response.status(statusCode)
    switch (statusCode) {
        case 401:
            response.json({
                title: "Unauthorized",
                message: err.message
            })
            break;
        case 404:
            response.json({
                title: "Not Found",
                message: err.message
            })    
            break;
        case 500:
            response.json({
                title: "Server Error",
                message: err.message
            })    
            break;
        default:
            break;
    }
}
app.use(errorHandler)

//Third party middleware
app.listen(PORT, () => console.log(`Running at PORT: ${PORT}`))