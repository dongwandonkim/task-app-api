const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_LOCAL_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    console.log('db connected');
    if (err) console.log(err);
  }
);
