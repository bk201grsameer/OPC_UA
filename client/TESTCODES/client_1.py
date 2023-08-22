from termcolor import cprint
import sys
from opcua import Client
from opcua.ua import UserTokenType
import time

url = "opc.tcp://Sameer:53530/OPCUA/SimulationServer"
username = "test"
password = "test123"


def func():
    try:
        client = Client(url)
        client.set_user(username)
        client.set_password(password)
        cprint("[+] CONNECTING TO OPCUA SERVER .. ")
        client.connect()
        print("Connected to OPC UA Server")
    except Exception as ex:
        cprint(f"[-] ERROR OCCURED : {str(ex)}", "red")


def main():
    func()


if __name__ == "__main__":
    try:
        client = Client(url)

        # Set user authentication credentials
        user_identity = username, password
        # client.set_user(user_identity)
        client.set_user(username)
        client.set_password(password)
        client.connect()
        print("Connected to OPC UA Server")
    except Exception as err:
        print("Failed to connect to OPC UA Server:", err)
        sys.exit(1)

    # Rest of your code remains the same...
