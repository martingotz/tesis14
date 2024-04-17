import socket

HOST = '127.0.0.1'  # Dirección IP del servidor (localhost)
PORT = 12345        # Puerto del servidor

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    message = "¡Hola, servidor!"
    s.sendall(message.encode())
    data = s.recv(1024)

print('Recibido del servidor:', data.decode())


# Bucle principal para interactuar con el chatbot
while True:
    try:
        # Obtiene la entrada del usuario
        user_input = input('Usuario: ')

    except KeyboardInterrupt:
        break


