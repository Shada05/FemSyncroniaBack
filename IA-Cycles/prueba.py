import sys
user_id = 1
# Capturar el user_id pasado como argumento
if len(sys.argv) > 1:
    user_id = sys.argv[1]
    print(f"El user_id recibido es: {user_id}")
else:
    print("No se recibió ningún user_id")
