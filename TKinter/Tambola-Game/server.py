import socket
from threading import Thread

IP_ADDR="127.0.0.1"
PORT=5000
CLIENTS={}

def acceptConn():
  while True:
    conn, addr = SERVER.accept()
    name = conn.recv(1024).decode("utf-8")
    player_num = len(CLIENTS.keys()) + 1
    print(f"Player {player_num}] {name} has connected")

    CLIENTS[name] = {
      "player_num": player_num,
      "name": name,
      "socket": conn,
      "address": addr,
      "turn": False
    }

    rcvThread = Thread(target=handleClients, args=(conn, name))
    rcvThread.start()

def handleClients(conn, name):
  for cli in CLIENTS.values():
    print(cli["socket"])
  while True:
    try:
      msg = conn.recv(1024)
      if msg:
        print(f"<{name}>: {msg}")
        for cli in CLIENTS.values():
          cli["socket"].send(msg.encode("utf-8"))
    except:
      pass

print("\n")
print("\t"*4, end="~~*** Tambola Game ***~~\n")

SERVER=socket.socket(socket.AF_INET, socket.SOCK_STREAM)
SERVER.bind((IP_ADDR, PORT))
SERVER.listen(10)

print("Starting the server...")
acceptConn()
