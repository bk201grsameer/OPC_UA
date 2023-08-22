from termcolor import cprint
import sys
from opcua import Client
from opcua.ua import UserTokenType
import time

url = "opc.tcp://Sameer:53530/OPCUA/SimulationServer"
username = "test"
password = "test"


def func():
    try:
        client = Client(url)

        username = input("[+] ENTER YOUR USERNAME : ").strip()
        password = input("[+] ENTER YOUR PASSWORD : ").strip()
        client.set_user(username)
        client.set_password(password)
        cprint("[+] CONNECTING TO OPCUA SERVER .. ", "green")
        client.connect()
        cprint("Connected to OPC UA Server", "green")
        # get node data from your server

        while True:
            # get nodes and node data from the server
            tempNode = client.get_node("ns=3;i=1008")
            temperature = tempNode.get_value()
            print("Temperature: ", temperature)
            # Set a node values
            # client.set_values([numNode], [num+1])
            time.sleep(0.5)
    except Exception as ex:
        if (str(ex)).find("server has rejected it"):
            cprint("[-] AUTHENTICATION FAILED ", "red")
        else:
            cprint(f"[-] ERROR OCCURED : {str(ex)}", "red")


def main():
    func()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        cprint("[-] OPERTATION CANCELLED : ", "red")
    except Exception as err:
        print("Failed to connect to OPC UA Server:", err)
        sys.exit(1)

    # Rest of your code remains the same...
