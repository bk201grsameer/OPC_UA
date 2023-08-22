# Real-Time Temperature Monitoring with OPC UA and Express.js

This project demonstrates how to create a real-time temperature monitoring system using OPC UA (Open Platform Communications Unified Architecture) and Express.js. OPC UA is a standardized communication protocol designed for secure and reliable data exchange in industrial automation and control systems. Express.js is a web application framework for Node.js that allows us to create web servers and handle HTTP requests.

In this project, we establish a connection to an OPC UA server, read the temperature data from a specific node on the server, and then send this data in real-time to a web client using WebSockets. The web client, which is an HTML page, dynamically updates to display the live temperature information.

## Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [About OPC UA](#about-opc-ua)
4. [How It Works](#how-it-works)
5. [Dependencies](#dependencies)
6. [Author](#author)
7. [License](#license)

## Installation

1. Ensure you have [Node.js](https://nodejs.org/) and npm (Node Package Manager) installed on your system.
2. Clone this repository or download the source code.
3. Open a terminal and navigate to the project directory.
4. Install the required dependencies using the command: `npm install`

## Usage

1. Start the Express.js server by running: `node app.js`
2. Open a web browser and navigate to `http://localhost:3000`
3. The webpage will display the real-time temperature data fetched from the OPC UA server.

## About OPC UA

OPC UA ([Open Platform Communications Unified Architecture](https://opcfoundation.org/about/opc-technologies/opc-ua/)) is a communication protocol and framework that allows secure and reliable data exchange between industrial devices, systems, and software applications. It's widely used in industrial automation, manufacturing, and other industries for establishing standardized communication between various components of a system.

## How It Works

1. The program establishes a connection to an OPC UA server using the [`node-opcua`](https://github.com/node-opcua/node-opcua) library.
2. A user provides their OPC UA server credentials (username and password) for authentication.
3. Upon successful authentication, the program creates an OPC UA session for communication.
4. The program continuously fetches the temperature data from a specific node on the OPC UA server at regular intervals.
5. The fetched temperature data is sent to the connected web clients using WebSockets through the [`socket.io`](https://socket.io/) library.
6. The web client, which is an HTML page using the EJS templating engine, displays the live temperature data in real-time.

## Dependencies

- [`express`](https://expressjs.com/): A web application framework for Node.js used to create the HTTP server.
- [`node-opcua`](https://github.com/node-opcua/node-opcua): A library for OPC UA communication.
- [`socket.io`](https://socket.io/): A library for implementing WebSockets and real-time communication.
- [`ejs`](https://ejs.co/): A template engine for generating HTML with dynamic content.

## Author

[Your Name]

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to replace `[Your Name]` in the Author section with your actual name or username. You can also customize the links to other relevant resources or documentation as needed.