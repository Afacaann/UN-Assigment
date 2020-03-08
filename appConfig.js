var developmentDatabase = {
    postgres: {
    host: 'localhost',
    port: 5432,
    database: 'd79qc82a3ljmo4',
    user: 'nlgjpyrbsshqtx',
    password: '08daa5d288dd242f232c9da1a038cd35e57fb38e1d4dcc19fa4aa8f47ff54fab'
    }
    }
    
    var connectionString = "postgres://nlgjpyrbsshqtx:08daa5d288dd242f232c9da1a038cd35e57fb38e1d4dcc19fa4aa8f47ff54fab@ec2-18-213-176-229.compute-1.amazonaws.com:5432/d79qc82a3ljmo4";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = true;
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }
    