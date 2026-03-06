import socket, random
from tkinter import *
from threading import Thread
from PIL import ImageTk, Image

IP_ADDR="127.0.0.1"
PORT=5000

SERVER=socket.socket(socket.AF_INET, socket.SOCK_STREAM)
SERVER.connect((IP_ADDR, PORT))

window1=None
window2=None
scrW=None
scrH=None
gameCanvas=None
gameOver=False

flashText=None
flashNumLst=[]
ticketGrid=[]
curNumLst=[]

def askName():
  global window1, scrW, scrH
  window1= Tk()
  window1.title("Tambola Game")

  scrW=window1.winfo_screenwidth()
  scrH=window1.winfo_screenheight()
  window1.state("zoomed")

  canvas=Canvas(window1, width=scrW, height=scrH)
  canvas.pack(fill=BOTH, expand=True)

  bg=Image.open("./bg1.png")
  bg=bg.resize((scrW, scrH))
  bg=ImageTk.PhotoImage(bg)
  canvas.create_image(0, 0, image=bg, anchor=NW)

  canvas.create_text(
    scrW/2, scrH/5,
    anchor=CENTER,
    text="Enter your name:",
    font=("Chalkboard SE", 50)
  )

  name_entry=Entry(window1, justify=CENTER, font=("Helvetica", 35))
  name_entry.place(relx=0.5, rely=0.5, anchor=CENTER)

  button = Button(
    window1,
    text="Join",
    bg="royalblue",
    fg="white",
    font=("Helvetica", 25),
    command=lambda:saveName(name_entry.get()),
    padx=20
  )
  button.place(relx=0.5, rely=0.75, anchor=CENTER)

  window1.mainloop()

def saveName(name):
  if (name != ""):
    window1.destroy()
    SERVER.send(name.encode("utf-8"))
    gameWindow()
    
def gameWindow():
  global window2, scrW, scrW, flashText, gameCanvas
  window2=Tk()
  window2.title("Tambola Game")

  window2.state("zoomed")

  gameCanvas=Canvas(window2, width=scrW, height=scrH)
  gameCanvas.pack(fill=BOTH, expand=True)

  bg=Image.open("./bg2.png")
  bg=bg.resize((scrW, scrH))
  bg=ImageTk.PhotoImage(bg)
  gameCanvas.create_image(0, 0, image=bg, anchor=NW)
  gameCanvas.create_text(scrW/2, scrH/5.7, text="Tambola Game", font="Helvetica 45 bold italic", fill="gold", anchor=CENTER)
  flashText = gameCanvas.create_text(scrW/2, scrH/3.3, text="Waiting for players...", font=("Chalkboard SE", 30), fill="white", anchor=CENTER)

  createTicket()

  window2.mainloop()

def createTicket():
  ticketBg=Label(window2, bg="white")
  ticketBg.place(x=scrW/2, y=scrH/1.64, width=scrW/1.63, height=300, anchor=CENTER)

  for y in range(3):
    btnLst=[]
    for x in range(10):
      newBtn = Button(
        window2,
        bg="#ff7855",
        font=("Helvetica", 12, "bold"),
        relief="flat",
        width=6,
        height=4
      )
      btnLst.append(newBtn)
      newBtn.place(x=(scrW/4.9)+(x*77), y=(scrH/2.4)+(y*95))
    ticketGrid.append(btnLst)
  
  placeNumbers()
  
def placeNumbers():
  numDict={
    "0": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "1": [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    "2": [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    "3": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    "4": [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    "5": [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    "6": [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
    "7": [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
    "8": [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
  }

  for row in range(0, 3):
    randClLst=[]
    for i in range(5):
      randCol=random.randint(0, 8)
      if (randCol not in randClLst):
        randClLst.append(randCol)

    for i in range(len(randClLst)):
      colNum = randClLst[i]
      numbersListByIndex = numDict[str(colNum)]
      randNum = random.choice(numbersListByIndex)

      if randNum not in curNumLst:
        numberBox=ticketGrid[row][colNum]
        numberBox.config(text=randNum, bg="royalblue")
        curNumLst.append(randNum)
  
def receive():
  global gameOver
  numLst=[str(i) for i in range(1, 91)]
  while True:
    msg = SERVER.recv(1024).decode()
    if msg in numLst and flashText and not gameOver:
      flashNumLst.append(int(msg))
      gameCanvas.itemconfig(flashText, text=msg)
    elif "won" in msg:
      gameOver=True
      gameCanvas.itemconfig(flashText, text=msg)

recv_thread=Thread(target=receive)
recv_thread.start()

askName()
