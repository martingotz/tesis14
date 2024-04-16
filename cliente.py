import socket
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

HOST = '127.0.0.1'  # Dirección IP del servidor (localhost)
PORT = 12345        # Puerto del servidor

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    message = "¡Hola, servidor!"
    s.sendall(message.encode())
    data = s.recv(1024)

print('Recibido del servidor:', data.decode())



# Crea un ChatBot
chatbot = ChatBot('Ejemplo')

# Entrena el ChatBot con datos del corpus
trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train('chatterbot.corpus.spanish')

# Bucle principal para interactuar con el chatbot
while True:
    try:
        # Obtiene la entrada del usuario
        user_input = input('Usuario: ')
        # Obtiene la respuesta del chatbot
        response = chatbot.get_response(user_input)
        # Imprime la respuesta del chatbot
        print('ChatBot:', response)

    except KeyboardInterrupt:
        break


