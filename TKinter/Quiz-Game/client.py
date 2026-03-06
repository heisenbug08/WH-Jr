import socket
from threading import Thread
from tkinter import *
from tkinter import messagebox

client=socket.socket(socket.AF_INET, socket.SOCK_STREAM)

ip_address='127.0.0.1'
port=8000

class GUI():
  def __init__(self):
    self.window=Tk()
    self.window.withdraw()
    self.window.protocol("WM_DELETE_WINDOW", lambda: self.exitQuiz())
    
    self.login_window=Toplevel(width=350, height=300, bg="#ddd")
    self.login_window.protocol("WM_DELETE_WINDOW", lambda: self.exitQuiz())
    self.login_window.resizable(width=False, height=False)
    self.login_window.title("Login")
    
    self.login_title=Label(
      self.login_window,
      bg="#ddd",
      font="Helvetica 16 bold underline",
      text="Welcome to the Quiz game!",
    )
    self.login_title.place(relx=0.5, rely=0.12, anchor=CENTER)
    
    self.name_label=Label(
      self.login_window,
      text="Enter your name:",
      font="Helvetica 13",
      bg="#ddd"
    )
    self.name_label.place(relx=0.1, rely=0.4)
    
    self.name_entry=Entry(self.login_window, font="Helvetica 10")
    self.name_entry.place(relx=0.5, rely=0.55, relwidth=0.82, height=30, anchor=CENTER)
    
    self.login_btn=Button(
      self.login_window,
      bg="royalblue",
      fg="white",
      text="Enter",
      font="Helvetica 13 bold",
      padx=10,
      command=lambda: self.goAhead(self.name_entry.get())
    )
    self.login_btn.place(relx=0.5, rely=0.75, anchor=CENTER)
    self.window.mainloop()
  
  def goAhead(self, name):
    if name != "":
      self.name=name
      client.connect((ip_address, port))
      print("\nConnected")

      self.login_window.destroy()
      self.layout()

      rcv=Thread(target=self.receive)
      rcv.start()
    
  def layout(self):
    self.window.deiconify()
    self.window.title("Quiz Game")
    self.window.resizable(width = False, height = False)
    self.window.configure(
      width = 450, 
      height = 500, 
      bg = "#50c5c5"
    )
    self.quiz_title=Label(
      self.window,
      bg="white",
      fg="#50c5c5",
      font="Helvetica 25 bold",
      text="Quiz game",
    )
    self.quiz_title.place(relwidth=1, height=50, y=10)

    self.qstn_txt=Text(
      self.window,
      bg="#50c8c8",
      fg="white",
      font="Helvetica 18 italic",
      wrap="word",
      relief="flat",
      state=DISABLED
    )
    self.qstn_txt.place(relx=0.5, rely=0.32, height=100, relwidth=0.9, anchor=CENTER)

    self.btn_a=Button(
      self.window,
      text="Option A",
      fg="white",
      bg="royalblue",
      font="Helvetica 13 bold",
      disabledforeground="white",
      padx=15,
      pady=5,
      command=lambda:client.send("a".encode("utf-8"))
    )
    self.btn_a.place(relx=0.5, rely=0.45, relwidth=0.5, anchor=CENTER)

    self.btn_b=Button(
      self.window,
      text="Option B",
      fg="white",
      bg="royalblue",
      font="Helvetica 13 bold",
      disabledforeground="white",
      padx=15,
      pady=5,
      command=lambda:client.send("b".encode("utf-8"))
    )
    self.btn_b.place(relx=0.5, rely=0.55, relwidth=0.5, anchor=CENTER)

    self.btn_c=Button(
      self.window,
      text="Option C",
      fg="white",
      bg="royalblue",
      font="Helvetica 13 bold",
      disabledforeground="white",
      padx=15,
      pady=5,
      command=lambda:client.send("c".encode("utf-8"))
    )
    self.btn_c.place(relx=0.5, rely=0.65, relwidth=0.5, anchor=CENTER)

    self.btn_next=Button(
      self.window,
      text="Skip for now",
      fg="white",
      bg="orange",
      font="Helvetica 12 bold",
      command=lambda:self.nextQstn()
    )
    self.btn_next.place(relx=0.5, rely=0.8, relwidth=0.4, anchor=CENTER)

    self.score_label=Label(
      self.window,
      text=f"Score: 0/0",
      bg="#50c8c8",
      fg="white",
      font="Helvetica 14",
    )
    self.score_label.place(relx=0.95, rely=0.99, anchor=SE)

  def question(self, qna):
    qstn, a, b, c = qna[0], qna[1], qna[2], qna[3]

    self.qstn_txt.config(state=NORMAL)
    self.qstn_txt.delete(1.0, END)
    self.qstn_txt.insert(END, qstn)
    self.qstn_txt.config(state=DISABLED)

    self.btn_a.config(text=a)
    self.btn_b.config(text=b)
    self.btn_c.config(text=c)
  
  def answer(self, ans):
    if ans[0] == "a":
      self.btn_a.config(bg="forestgreen")
    elif ans[0] == "b":
      self.btn_b.config(bg="forestgreen")
    elif ans[0] == "c":
      self.btn_c.config(bg="forestgreen")
    
    if ans[0] != ans[1]:
      if ans[1] == "a":
        self.btn_a.config(bg="#ff4530")
      elif ans[1] == "b":
        self.btn_b.config(bg="#ff4530")
      elif ans[1] == "c":
        self.btn_c.config(bg="#ff4530")
    
    self.score_label.config(text=f"Score: {ans[2]}")
    self.btn_a.config(state=DISABLED)
    self.btn_b.config(state=DISABLED)
    self.btn_c.config(state=DISABLED)
    if ans[2].split("/")[1] != "10":
      self.btn_next.config(text="Next Question")
    else:
      self.btn_next.config(text="End Quiz", command=lambda:self.endQuiz(ans[2]))

  def nextQstn(self):
    client.send("~NEXT".encode("utf-8"))
    self.btn_a.config(state=NORMAL, bg="royalblue")
    self.btn_b.config(state=NORMAL, bg="royalblue")
    self.btn_c.config(state=NORMAL, bg="royalblue")
    self.btn_next.config(text="Skip for now")
  
  def endQuiz(self, score):
    """ """
    self.btn_a.destroy()
    self.btn_b.destroy()
    self.btn_c.destroy()
    self.qstn_txt.destroy()
    self.score_label.destroy()
    self.end_label=Label(
      self.window,
      bg="#50c8c8",
      fg="white",
      font="Helvetica 18 italic",
      text=f"Score: {score}\nThanks for playing!"
    )
    self.end_label.place(relx=0.5, rely=0.5, anchor=CENTER)
    self.btn_next.config(text="Exit", command=lambda:self.exitQuiz())
    self.btn_next.place(relx=0.5, rely=0.7, relwidth=0.4, anchor=CENTER)
      
  def receive(self):
    while True:
      msg=client.recv(2048).decode('utf-8')
      if msg:
        if msg == "~USERNAME":
          client.send(self.name.encode("utf-8"))
          print("Username sent")
        elif msg == "~END":
          break
        else:
          if len(msg.split("~")) == 4:
            self.question(msg.split("~"))
          else:
            self.answer(msg.split("~"))

  def exitQuiz(self):
    if messagebox.askokcancel("Quiz Game", "Do you want to exit the game?"):
      try:
        client.send("~EXITED".encode("utf-8"))
        print("Disconnected")
      except:
        pass
      self.window.destroy()

gui=GUI()
