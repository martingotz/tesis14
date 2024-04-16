import socket

# Configuración del servidor
HOST = '127.0.0.1'  # Dirección IP del servidor
PORT = 12345        # Puerto que escucha el servidor

# Crear un socket TCP/IP
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    # Enlazar el socket a la dirección y puerto
    s.bind((HOST, PORT))
    # Escuchar conexiones entrantes
    s.listen()
    print(f"Servidor escuchando en {HOST}:{PORT}")
    # Aceptar la primera conexión entrante
    conn, addr = s.accept()
    with conn:
        print('Conectado por', addr)
        # Recibir datos del cliente y enviarlos de vuelta
        while True:
            data = conn.recv(1024)
            if not data:
                break
            conn.sendall(data)
            
