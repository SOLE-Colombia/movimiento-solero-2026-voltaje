---
title: Protocolo SSH | SSH Protocol
lang: en
slug: protocolo-ssh-ssh-protocol-conceptorio
aspectos:
- señal
- dispositivos
fecha: '2025-10-11'
---

# Protocolo SSH | SSH Protocol

Fecha de creación: 30 de agosto de 2025 23:19
Autor(a): Belen Sevilla Morillo
R2025: revisado
idioma: english, español

## Español

SSH, o Secure Shell, **es un protocolo de red que permite la conexión segura y remota a otro ordenador a través de una red no segura, como internet**. 

## English

SSH, or Secure Shell, **is a network protocol that allows secure, remote connection to another computer over an unsecured network, such as the Internet**. 

![Imagen](/assets/images/Antena 3 4G 3 4G Antenna 22b2bd68c5b68076a24ccc4e1d6ff4af/image-800w.webp)

Se utiliza principalmente para la administración remota de sistemas y la transferencia segura de archivos. En esencia, SSH crea un "túnel" cifrado entre dos ordenadores, permitiendo la comunicación protegida de datos, contraseñas y otras informaciones sensibles (tomado de [cloudflare.com](https://translate.google.com/translate?u=[:~:Text=Ssh](https://www.cloudflare.com/learning/access-management/what-is-ssh/&hl=es&sl=en&tl=es&client=sge#:~:text=SSH) (Secure Shell)%20es%20un,trav%C3%A9s%20de%20redes%20no%20seguras.)).

**Más detalles:**

- **Acceso seguro:** SSH proporciona una forma segura de acceder a servidores remotos, como el servidor de tu sitio web, desde tu computadora.
- **Autenticación:** Para establecer la conexión, SSH requiere autenticación, que puede realizarse mediante nombre de usuario y contraseña, o mediante claves criptográficas públicas y privadas.
- **Cifrado:** SSH cifra todos los datos transmitidos entre el cliente y el servidor, protegiendo la información de posibles ataques de interceptación.
- **Transferencia de archivos:** Además de permitir la ejecución de comandos remotos, SSH se utiliza para transferir archivos de forma segura utilizando protocolos como SFTP.
- **Sustituye a Telnet:** SSH se creó como un reemplazo seguro para Telnet, un protocolo de acceso remoto que no ofrecía cifrado.
- **Puertos:** SSH utiliza el puerto TCP 22 por defecto, aunque puede configurarse en otros puertos.
- **Implementaciones:** OpenSSH es una implementación popular de código abierto del protocolo SSH.

SSH es una herramienta esencial para la administración remota segura de sistemas, ofreciendo una conexión cifrada y protegida entre dispositivos a través de redes no seguras.

It is primarily used for remote system administration and secure file transfer. In essence, SSH creates an encrypted "tunnel" between two computers, allowing protected communication of data, passwords and other sensitive information (taken from [cloudflare.com](https://translate.google.com/translate?u=[:~:Text=Ssh](https://www.cloudflare.com/learning/access-management/what-is-ssh/&hl=es&sl=en&tl=es&client=sge#:~:text=SSH) (Secure Shell)%20es%20un,trav%C3%A9s%20de%20redes%20no%20seguras.)).

**More details:**

- **Secure Access:** SSH provides a secure way to access remote servers, such as your website server, from your computer.
- **Authentication:** To establish the connection, SSH requires authentication, which can be done by username and password, or by public and private cryptographic keys.
- **Encryption:** SSH encrypts all data transmitted between the client and the server, protecting the information from possible interception attacks.
- **File transfer:** In addition to allowing remote command execution, SSH is used to securely transfer files using protocols such as SFTP.
- **Replaces Telnet:** SSH was created as a secure replacement for Telnet, a remote access protocol that did not offer encryption.
- **Ports:** SSH uses TCP port 22 by default, although it can be configured on other ports.
- **Implementations:** OpenSSH is a popular open source implementation of the SSH protocol.

SSH is an essential tool for secure remote system administration, providing an encrypted and protected connection between devices over unsecured networks.