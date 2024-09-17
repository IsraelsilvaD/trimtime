const mongoose = require('mongose');
const URI = 'mongodb+srv://israelsilva0218:<BarberApp24>@cluster0.pjy4vco.mongodb.net/';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(URI)
.then(() => console.log('DB is UP!'))
.catch(() => console.log(err));