from opcua import Server

server = Server()

url = "opc.tcp://192.168.0.167:4840"
server.set_endpoint(url)
name = "MY_SIMULATION_SEVER"
addspace = server.register_namespace(name)

node = server.get_objects_node()
Param = node.add_object(addspace, "Parameters")

Temp = Param.add_variable(addspace, "Temperature", 0)
Press=Param.add_variable(addspace,"Pressure",0)
Time=Param.add_variable(addspace,"Time",0)

Temp.set_writable