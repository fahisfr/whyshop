
//set cors options
const corsOptions = {
    origin: ['http://localhost:3000', 'https://frbots.com,"https://test.frbots.com'], 
    credentials: true,
    optionsSuccessStatus: 200 ,
    sameSite: 'none'
}


module.exports = corsOptions;