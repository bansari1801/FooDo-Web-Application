const express = require('express');
const cors = require('cors');

const app = express();

const mongoose = require('mongoose');
const { DB_URL } = require('./configs/db.config.js');

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully Connected to Database'))
  .catch((err) => console.log('Could not connect to database...', err));

  const whitelist = ["http://localhost:3000", "https://magenta-creponne-eb2bea.netlify.app"]
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  }

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require('./routes/index.js')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
