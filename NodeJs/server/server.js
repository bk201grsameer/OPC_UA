const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { OPCUAClient, UserTokenType } = require('node-opcua');
const path = require('path');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


// Set the view engine to EJS
app.set('view engine', 'ejs');
// Morgan logging middleware
app.use(morgan('dev'));
// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


const url = 'opc.tcp://Sameer:53530/OPCUA/SimulationServer';
const username = 'test'; // Change this to your username
const password = 'test'; // Change this to your password

let opcuaClient;

const connectToOPCUA = async () => {
    try {
        opcuaClient = OPCUAClient.create({
            endpointMustExist: false,
            connectionStrategy: {
                maxRetry: 2,
                initialDelay: 2000,
                maxDelay: 10 * 1000
            }
        });
        await opcuaClient.connect(url);
        console.log('[+] Connected to OPC UA Server');

        const session = await opcuaClient.createSession({ type: UserTokenType.UserName, userName: username, password: password });
        console.log('[+] Created OPC UA session');

        startFetchingData(session);
    } catch (error) {
        console.log(`[-] ERROR OCCURRED: ${error.message}`);
    }
};

const startFetchingData = (session) => {
    setInterval(async () => {
        try {
            const temperatureNode = await session.readVariableValue('ns=3;i=1008');
            const temperature = temperatureNode.value.value;
            console.log('Temperature:', temperature);

            io.emit('temperature', temperature); // Sending data to the connected clients
        } catch (error) {
            console.log('[-] Failed to fetch data:', error.message);
        }
    }, 200);
};

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log('A client connected');
});

server.listen(3000, () => {
    console.log('Express server listening on port 3000');
    connectToOPCUA();
});
