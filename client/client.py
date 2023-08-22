import sys
from opcua import Client
from opcua.ua.ua_binary import UserTokenPolicy, UserTokenType
import time

url = "opc.tcp://Sameer:53530/OPCUA/SimulationServer"
username = "your_username"
password = "your_password"

if __name__ == "__main__":
    try:
        client = Client(url)

        # # Set user authentication credentials
        # user_authentication = UserTokenPolicy()
        # user_authentication.TokenType = UserTokenType.UserName
        # user_authentication.SecurityPolicyUri = (
        #     "http://opcfoundation.org/UA/SecurityPolicy#None"
        # )

        # user_identity = username, password

        # client.set_user(user_identity, user_authentication)

        client.connect()
        print("Connected to OPC UA Server")
    except Exception as err:
        print("Failed to connect to OPC UA Server:", err)
        if hasattr(err, 'status'):
            print("Error Status:", err.status)
            print("Error Explanation:", err)

    # Rest of your code remains the same...
