//set cors options
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
  sameSite: "none",
};

module.exports = corsOptions;
