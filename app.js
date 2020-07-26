const express = require('express');
const app = express();
//Routes
const userRoutes = require('./server/routes/user')


//enable json parsing on express
app.use(express.json());
//Router usage
app.use('/user', userRoutes);

//In case the router does not cover the error
app.use((req, res , next) => {
    const error = new Error('Not found');
    error.status = 404 ;
})

app.use((error, req, res , next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen (process.env.PORT || '3000', ()=> {
    console.log (`Server is running on port: ${process.env.PORT || '3000'}`);
});
