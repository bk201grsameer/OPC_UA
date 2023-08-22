const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { Client } = require('opcua');
const readline = require('readline');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const url = 'opc.tcp://Sameer:53530/OPCUA/SimulationServer';

let opcuaClient;

const connectToOPCUA = async () => {
  try {
    opcuaClient = new Client({ endpoint_must_exist: false });
    await opcuaClient.connect(url);

    rl.question('[+] ENTER YOUR USERNAME : ', (username) => {
      rl.question('[+] ENTER YOUR PASSWORD : ', async (password) => {
        await opcuaClient.createSession({ type: UserTokenType.UserName, userName: username, password: password });
        console.log('[+] Connected to OPC UA Server');
        startFetchingData();
      });
    });
  } catch (error) {
    if (error.message.includes('BadUserAccessDenied')) {
      console.log('[-] AUTHENTICATION FAILED');
    } else {
      console.log(`[-] ERROR OCCURRED: ${error.message}`);
    }
    rl.close();
  }
};

const startFetchingData = () => {
  setInterval(async () => {
    try {
      const temperatureNode = await opcuaClient.readVariableValue('ns=3;i=1008');
      const temperature = temperatureNode.value.value;
      console.log('Temperature:', temperature);

      io.emit('temperature', temperature); // Sending data to the connected clients
    } catch (error) {
      console.log('[-] Failed to fetch data:', error.message);
    }
  }, 500);
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A client connected');
});

server.listen(3000, () => {
  console.log('Express server listening on port 3000');
  connectToOPCUA();
});
