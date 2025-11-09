---
title: 'Raspberry Pi: A small pocket-sized Internet'
lang: en
slug: raspberry-pi-a-small-pocket-sized-internet-solutions-db
aspectos:
- señal
- dispositivos
- personas
fecha: '2025-10-11'
---

# Raspberry Pi: A small pocket-sized Internet

Created: 29 de julio de 2025 17:02
Autor: Gabriel
Solucionas: Devices
Dificultad: Difícil
Cuesta: >$200 COP
Ayudantes: 2-3 personas
Tardas: Horas
2025-prueba: No

### index

# **Install a web server on a pocket computer**

## Welcome

Hi, I'm Gabriel. I'm an artist. Digital devices, how they work and the way we humans interact with them, are interesting to me. I consider myself a gadgeteer and I invite you, if you want, to be one too.

## What is a RaspberryPi, or a pocket Internet?

This solution will help you to create a small internet on your [**local network**](/lan-red-local-lan-local-area-network-conceptorio) with few resources. 

By installing and configuring a server on the network, your community will be able to access the content hosted on it from their computers or phones. This way they will be able to have, for example, a copy of wikipedia so that everyone can review it whenever they need it, without the need to access the Internet to do so.

## What is it for?

If we are talking about using the Internet to solve Big Questions and real-life challenges in a group, having content accessible offline may be an excellent option: for example, if you are going to do SOLE in a very remote location, where you know that connectivity is definitely not going to be feasible. 

Having downloadable content offline will allow them to do some research and come to some conclusions, which they can expand on at another time with Internet connectivity or when they can plug in a Granny. 

Want to know more about how to turn your space into a place to learn, or who the Abuelitas of the Cloud are? Visit [https://www.solecolombia.org/solea](https://www.solecolombia.org/solea) to learn how and browse the site to learn more about the Abuelitas Cloud that can support the learning processes happening in your space.

## How do you know if you need it?

Ask yourself how good your Internet connection is where you are going to connect from. In SOLE Colombia we know the difficulties of many remote communities, where the Internet is scarce or difficult to access, and a solution like this allows people to access downloaded content, which is almost like having access to their twins on the network. 

Thus, it becomes possible to navigate in a replica of some parts of the Internet, learning to use the technology in a different way. 

Even if its features are many and obvious, this is a solution that requires a powerful gadget spirit and high doses of commitment and patience... we are sure that you can manage to set up your own little pocket internet!

## What do you need?

- [**Raspberry Pi**](/raspberry-pi-conceptorio)
- [**MicroSD**](/memoria-sd-minisd-microsd-sd-minisd-microsd-memory-conceptorio) card 32 GB **class 10**
- Power supply for the **Raspberry Pi** - check the specifications on [Raspberry Pi](/raspberry-pi-conceptorio)
- [Ethernet cable](/conexion-cable-ethernet-ethernet-cable-connection-conceptorio)
- [**MicroSD**](/memoria-sd-minisd-microsd-sd-minisd-microsd-memory-conceptorio) to [USB](/conexion-usb-usd-connection-conceptorio) memory adapter.
- RPI box (optional)
- Internet connection
- A computer
- Patience

## How to do it?

- **Step 1: Prepare your Pi**
    
    For this solution we are using a Raspberry Pi v4, but previous versions can be used without problem. 
    
    If you are starting with a new Raspberry Pi and you have a plastic case, assemble the heatsink on the RPI processor and place it inside its protective case before proceeding.
    
    The **Raspberry Pi** developers have created a tool to make it easy to download, install and configure the **MicroSD** memory sticks that will have the operating system running the RPI. 
    
    - **Install the software specific to your operating system, Raspberry Pi Imager.**
        
        To install it on your computer visit [https://www.raspberrypi.com/software/.](https://www.raspberrypi.com/software/) There you can download the version of the Raspberry Pi Imager that works on your operating system (Windows, Linux or Mac) once installed you can proceed to the next step.
        
        ![Imagen](/assets/images/Antena 3 4G 3 4G Antenna 22b2bd68c5b68076a24ccc4e1d6ff4af/image-800w.webp)
        
    - **Connect the MicroSD to your computer**
        
        Before running the Raspberry Pi Imager, you must connect the [**MicroSD**](https://sole-doc.tiddlyhost.com/#MicroSD) memory to your computer. 
        
        To do this you need to use a USB adapter if your computer does not have a slot for it. 
        
        Once you verify that the memory is in the computer run the Raspberry Pi Imager and continue with the solution.
        
    - **Open the Raspberry Pi Imager and choose your operating system.**
        
        ![Imagen](/assets/images/Conexión cable Ethernet Ethernet cable connection 22b2bd68c5b680fa90ceecc23bea76db/image 1-275w.webp)
        
- **Moment 2: Connect your Pi**
    - **Place it on the Pi Imager**
        
        Now that our Pi is connected to the power, and to our [**local network](/lan-red-local-lan-local-area-network-conceptorio),** we must locate it to be able to connect to it. 
        
        Before this, a small note: **the following steps will be done through a** [Terminal](/terminal-o-consola-terminal-or-console-conceptorio). If you are using a Unix-like [operating system](../../Conceptorio 12a2bd68c5b6808baf3be5e67cddb488/Conceptorio 1624106bff984c4590342afeae3e5e0d/Sistema operativo (SO)%20Operating%20system%20(OS)%202342bd68c5b68003b66beb552afaa17a.md) (Linux, MacOs), simply look for the terminal and there you can follow the steps (see below how to do it). If you are using Windows, you can use [CMD](/simbolo-de-sistema-cmd-command-prompt-cmd-conceptorio) in this step and, to connect to the Pi, you can use [Putty](https://www.putty.org/).
        
        To locate the Pi in a Terminal we use the [ping program](/programa-ping-ping-program-conceptorio), it will try to send a small packet of data to the address that we indicate and it will tell us among other things the [**IP**](https://sole-doc.tiddlyhost.com/#IP) address of the computer. 
        
        Here we are going to make use of the name we gave to our Pi, in our case *solevoltage*. In the terminal we type `ping solevoltaje.local` and the program will answer us with the [**IP**](https://sole-doc.tiddlyhost.com/#IP) `192.168.0.25`, which indicates that our Pi is available for us to connect and start working.
        
        ![Imagen](/assets/images/A pocket Wikipedia in your RaspberryPi 1a42bd68c5b680289571fc002238a69a/image 2-800w.webp)
        
    - **Connect to the Pi**
        
        So that the connection between your Pi and the rest of devices is secure, we connect by means of a [SSH Protocol](/protocolo-ssh-ssh-protocol-conceptorio) to our Pi. To do this, we type in our terminal `ssh solevoltaje@solevoltaje.local` or with the [IP Address](/direccion-ip-ip-address-conceptorio) `ssh solevoltaje@192.168.0.25`
        
        Remember that we must put our [username](/nombre-de-usuario-username-conceptorio) and [domain name](/nombre-de-dominio-domain-name-conceptorio) or [**IP**](https://sole-doc.tiddlyhost.com/#IP) in the parameters we give to **SSH** `ssh <username>@<domain name>`. 
        
        As soon as the connection is established, the system will ask for the password. Type the same one you entered in the configuration in the previous steps and finish by pressing the `enter` key.
        
    - **Update the software**
        
        ![](/https:/archive.org/download/f-71-b-658-b-290-e-48-d-3-be-45-e-4733-fe-4874-d/ServerAtPi/upgrade.png)
        
        Once we are connected to the Pi we must do a couple of administration tasks. The first is to update our operating system software. We do this by typing the following in the terminal:
        
        ```
        sudo apt update && sudo apt upgrade
        ```
        
        Once the task of downloading and configuring the new software is finished we can continue with the solution.
        
        > The commands that we enter in this line start with sudo to have superuser premises and to be able to apply changes to the system.
        > 
    - **Expand the SWAP**
        
        ![](/https:/archive.org/download/f-71-b-658-b-290-e-48-d-3-be-45-e-4733-fe-4874-d/ServerAtPi/swap.png)
        
        Now, it is necessary to expand the [SWAP Memory](https://sole-doc.tiddlyhost.com/#SWAPhttps://www.notion.so/solecolombia/Memoria-SWAP-2342bd68c5b680cbad43fe0b7fa090c0?source=copy_link) space so that our Pi can easily deal with operations that require more memory than we have available in [RAM](/memoria-ram-ram-memory-conceptorio). Perform the following steps one after the other:
        
        First we disable **SWAP** memory.
        
        ```
        sudo dphys-swapfile swapoff
        ```
        
        Then we edit the configuration file and change the size to our needs:
        
        ```
        sudo nano /etc/dphys-swapfile
        ```
        
        In the file look for the line that by default says `CONF_SWAPSIZE=100` and change it to `CONF_SWAPSIZE=2048`. Then save and exit the text editor.
        
        Now we need to activate the new configuration:
        
        ```
        sudo dphys-swapfile setup
        ```
        
        We activate the **SWAP** memory again **:**
        
        ```
        sudo dphys-swapfile swapon
        ```
        
        Finally, we reboot the Pi so that all programs have access to the new **SWAP:**
        
        ```
        sudo reboot
        ```
        
        This last command, reboots the Pi, closing our remote connection. You must wait for the process to complete in a couple of minutes and reconnect via [SSH Protocol](/protocolo-ssh-ssh-protocol-conceptorio) to continue.
        
    - **Now, we install the server**
        
        ![](/https:/ia601406.us.archive.org/10/items/f-71-b-658-b-290-e-48-d-3-be-45-e-4733-fe-4874-d/ServerAtPi/nginx.png)
        
        After all this preparatory process, which is simpler than it seems we proceed to install [nginx](https://www.nginx.com/), a program that will allow our Pi can function as a web server and thus we can access from other devices through a web browser to resources that we have hosted there.
        
        Once we are connected to the Pi we write in the terminal:
        
        ```
        sudo apt install nginx
        ```
        
        This line downloads, installs and starts our server.
        
- **Moment 3: Test that everything works fine**
    
    ![](/https:/archive.org/download/f-71-b-658-b-290-e-48-d-3-be-45-e-4733-fe-4874-d/ServerAtPi/test.png)
    
    Now, we test that everything is working. 
    
    For it, in our computer, we open a window of a web browser and in the address bar we write `http://solevoltaje.local`.  
    
    If everything is working correctly, we should see a page like the one in the image that says **Welcome to nginx**.
    

## How to know if this solution works?

With this solution, you will have a local server that allows you to host content that will be visible on the local network. 

In this way, you can download useful material for the SOLE sessions and not need Internet access to answer the Big Questions. You can also think about uploading content that you would like to take to a remote location or that you would like to share with others, e.g. movies, educational material, instructions, online games... or anything that you can download to use with others! 

Because the Pi is so small you can take it to different places and have a pocket-sized Internet.

## Why would this solution work?

With this solution you will have a portable server, however it still doesn't have any information to share, we recommend you check out the other solutions we have in the guide to get the most out of your new server.

## Recommended solutions

- [¿Quieres compartir tu internet sin cables? Configura tu Raspberry Pi ](/quieres-compartir-tu-internet-sin-cables-configura-tu-raspberry-pi-solutions-db) | [Do you want to share your internet wirelessly? Configure your Raspberry Pi ](/do-you-want-to-share-your-internet-wirelessly-configure-your-raspberry-pi-solutions-db)
- [La Wikipedia de bolsillo en tu RaspberryPi](/la-wikipedia-de-bolsillo-en-tu-raspberrypi) \[A pocket Wikipedia in your RaspberryPi](/a-pocket-wikipedia-in-your-raspberrypi)
- [¿Cómo usar el juego para aprender a cuidar equipos en comunidad?](/como-usar-el-juego-para-aprender-a-cuidar-equipos-en-comunidad-solutions-db) | [How to use the game to learn how to take care of equipment in community?](/how-to-use-the-game-to-learn-how-to-take-care-of-equipment-in-community-solutions-db)

[https://notionreactions.com/embed/i1mj2EQyocvveN1TLmuk](https://notionreactions.com/embed/i1mj2EQyocvveN1TLmuk)

---

[¿Nuevo aquí?](/nuevo-aqui-sole-voltaje)

[Inspírate](/inspirate-sole-voltaje)

[Soluciona](/soluciona-sole-voltaje)

[Pregunta/Comenta](/pregunta-comenta-sole-voltaje)

[¿Desconectado?](/desconectado-sole-voltaje)

[Conceptorio](/conceptorio-sole-voltaje)

*SOLE Voltaje is a project by [SOLE Colombia](https://www.solecolombia.org/) supported by [Internet Society Foundation](https://www.isocfoundation.org/)*

[SOLE Voltaje](http://voltaje.solecolombia.org/)  2024 by [Fundación SOLE Colombia](http://www.solecolombia.org/) is licensed by [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1)