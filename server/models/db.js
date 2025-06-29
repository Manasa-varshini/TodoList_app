const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todolist', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => {
    console.log('MongoDB connection success...');
})
.catch(err => {
    console.log(`Error in DB connection: ${err}`);
});
