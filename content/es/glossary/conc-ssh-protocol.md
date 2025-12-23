---
title: "Protocolo SSH | SSH Protocol"
date: 2025-07-17
tags:
  - "Seguridad e identificación"
  - "Redes y conexiones"
autor: "Belén"
draft: false
---
SSH, o Secure Shell, **es un protocolo de red que permite la conexión segura y remota a otro ordenador a través de una red no segura, como internet**. 



Se utiliza principalmente para la administración remota de sistemas y la transferencia segura de archivos. En esencia, SSH crea un "túnel" cifrado entre dos ordenadores, permitiendo la comunicación protegida de datos, contraseñas y otras informaciones sensibles (Fuente: [Cloudflare](https://www.cloudflare.com/learning/access-management/what-is-ssh/#:~:text=SSH))

**Más detalles:**

- **Acceso seguro:** SSH proporciona una forma segura de acceder a servidores remotos, como el servidor de tu sitio web, desde tu computadora.
- **Acceso seguro:** SSH proporciona una forma segura de acceder a servidores remotos, como el servidor de tu sitio web, desde tu computadora.
- **Autenticación:** Para establecer la conexión, SSH requiere autenticación, que puede realizarse mediante nombre de usuario y contraseña, o mediante claves criptográficas públicas y privadas.
- **Cifrado:** SSH cifra todos los datos transmitidos entre el cliente y el servidor, protegiendo la información de posibles ataques de interceptación.
- **Transferencia de archivos:** Además de permitir la ejecución de comandos remotos, SSH se utiliza para transferir archivos de forma segura utilizando protocolos como SFTP.
- **Sustituye a Telnet:** SSH se creó como un reemplazo seguro para Telnet, un protocolo de acceso remoto que no ofrecía cifrado.
- **Puertos:** SSH utiliza el puerto TCP 22 por defecto, aunque puede configurarse en otros puertos.
- **Implementaciones:** OpenSSH es una implementación popular de código abierto del protocolo SSH.

SSH es una herramienta esencial para la administración remota segura de sistemas, ofreciendo una conexión cifrada y protegida entre dispositivos a través de redes no seguras.

![SSH](/assets/images/conc-sshprotocol/conc-sshprotocol-screenshot.png)