import socket, random
from threading import Thread

server=socket.socket(socket.AF_INET, socket.SOCK_STREAM)
ip_address='127.0.0.1'
port=8000
server.bind((ip_address, port))
server.listen()
print("Listening...")

def clientthread(conn, name):
  questions = [
    {
      "qstn": "What is Cynophobia the fear of?", 
      "ans": "a",
      "options": ["Dogs", "Crowded Areas", "Heights"],
    }, {
      "qstn": "Where is the headquarters of the IAEA?", 
      "ans": "a",
      "options": ["Vienna", "Argentina", "Brazil"]
    }, {
      "qstn": "What was former President William Taft's pet cow?", 
      "ans": "a",
      "options": ["Pauline", "Bessie", "Daisy"]
    }, {
      "qstn": "The quote \"Fair is foul, and foul is fair\" is from which Shakespearean play?", 
      "ans": "a",
      "options": ["Macbeth", "The Tempest", "King Lear"]
    },
    {
      "qstn": "What is the boiling point of ethanol?", 
      "ans": "b",
      "options": ["87.4℃", "78.4℃", "47.8℃"]
    }, {
      "qstn": "What was the name of Alexander the Great's horse?", 
      "ans": "b",
      "options": ["Cassius", "Bucephalus", "Fabius"]
    }, {
      "qstn": "Napolean suffered defeat at Waterloo in what year?", 
      "ans": "b",
      "options": ["1769", "1815", "1812"]
    },
    {
      "qstn": "When did the Second World War end?", 
      "ans": "c",
      "options": ["1939", "1918", "1945"]
    }, {
      "qstn": "How many points is the letter 'K' in the game Scrabble?", 
      "ans": "c",
      "options": ["2", "8", "5"]
    }, {
      "qstn": "Which of these people is depicted on the US $100 bill?", 
      "ans": "c",
      "options": ["FDR", "Obama", "Benjamin Franklin"]
    }, 
  ]

  def remove_qna(qna):
    if qna in questions:
      questions.remove(qna)

  def get_qna():
    qna=random.choice(questions)
    conn.send(f'{qna["qstn"]}~{qna["options"][0]}~{qna["options"][1]}~{qna["options"][2]}'.encode("utf-8"))
    return qna

  qna=get_qna()
  score=0
  attempts=0
  while len(questions) > 0:
    msg=conn.recv(2048).decode("utf-8")
    if msg:
      if msg=="~NEXT":
        qna=get_qna()
      elif msg=="~EXITED":
        break
      else:
        attempts = attempts + 1
        if msg==qna["ans"]:
          score +=1
        conn.send(f"{qna['ans']}~{msg}~{score}/{attempts}".encode("utf-8"))
        remove_qna(qna)
    else:
      print(f"{name} has faced an error")
  conn.send("~END".encode("utf-8"))
  print(f"{name} has disconnected")

while True:
  conn, addr=server.accept()
  conn.send("~USERNAME".encode("utf-8"))
  name=conn.recv(2048).decode("utf-8")
  
  print(f"{name} has connected")

  new_thread=Thread(target=clientthread, args=(conn, name))
  new_thread.start()