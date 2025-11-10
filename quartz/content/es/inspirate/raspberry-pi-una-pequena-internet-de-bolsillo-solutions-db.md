---
title: 'Raspberry Pi: Una pequeña Internet de bolsillo'
lang: es
slug: raspberry-pi-una-pequena-internet-de-bolsillo-solutions-db
aspectos:
- señal
- dispositivos
- personas
fecha: '2025-10-11'
---

# Raspberry Pi: Una pequeña Internet de bolsillo

Created: 30 de agosto de 2025 23:19
Autor: Gabriel
Solucionas: Dispositivos
Dificultad: Difícil
Cuesta: >$200 COP
Ayudantes: 2-3 personas
Tardas: Horas
R-reactions: No

# **Instala un servidor web en un computador de bolsillo**

## Bienvenida

Hola, soy Gabriel. Soy artista. Los aparatos digitales, su funcionamiento y la forma en la que los humanos interactuamos con ellos, me resultan interesantes. Me considero un cacharrero y te invito, si quieres, a que tú también lo seas.

## ¿Qué es un RaspberryPi, o una Internet de bolsillo?

Esta solución te servirá para crear una pequeña internet en tu [**red local**](/lan-red-local-lan-local-area-network-conceptorio) con pocos recursos. 

Al instalar, y configurar, un servidor en la red, tu comunidad podrá acceder a los contenidos hospedados en él desde sus computadores o teléfonos. De esta manera podrán tener, por ejemplo, una copia de la wikipedia para que todos la puedan revisar cuando la necesiten, sin necesidad de acceder a Internet para ello.

## ¿Para qué sirve?

Si hablamos de utilizar el Internet para solucionar Grandes Preguntas y retos de la vida real en grupo, puede que tener contenido accesible sin conexión a Internet sea una opción excelente: por ejemplo, si vas a hacer SOLE en un lugar muy remoto, donde sabes que la conectividad definitivamente no va a ser viable. 

Tener contenidos descargables sin conexión, les permitirá investigar y llegar a algunas conclusiones, que pueden ampliar en otro momento con conexión a Internet o cuando puedan conectar una Abuelita. 

¿Quieres saber más de cómo convertir tu espacio en un lugar para aprender, o quiénes son las Abuelitas de la Nube? Visita [[Solea](https://www.solecolombia.org/solea](https://www.solecolombia.org/solea)) para aprender cómo y navega por el sitio para saber más sobre la Nube de Abuelitas que puede apoyar los procesos de aprendizaje que sucedan en tu espacio.

## ¿Cómo saber si lo necesitas?

Pregúntate qué tan buena es tu conexión a Internet en el lugar desde donde te vas a conectar. En SOLE Colombia conocemos las dificultades de muchas comunidades remotas, donde el internet es escaso o de difícil acceso, y, una solución como esta, permite a las personas poder acceder a contenidos descargados, que son casi como tener acceso a sus gemelos en la red. 

Así, se vuelve posible navegar en una réplica de algunas partes del Internet, aprendiendo a usar la tecnología de una manera diferente. 

Aún cuando sus prestaciones son muchas y evidentes, esta es una solución que requiere un potente espíritu cacharrero y altas dosis de empeño y paciencia… ¡estamos seguros de que tú puedes conseguir configurar tu pequeña internet de bolsillo!

## ¿Qué necesitas?

- [**Raspberry Pi**](/raspberry-pi-conceptorio)
- Tarjeta [**MicroSD**](/memoria-sd-minisd-microsd-sd-minisd-microsd-memory-conceptorio) 32 GB **clase 10**
- Fuente de alimentación para el **Raspberry Pi** - revisa las especificaciones en [Raspberry Pi](/raspberry-pi-conceptorio)
- [Cable de Ethernet](/conexion-cable-ethernet-ethernet-cable-connection-conceptorio)
- Adaptador de memoria [**MicroSD**](/memoria-sd-minisd-microsd-sd-minisd-microsd-memory-conceptorio) a [USB](/conexion-usb-usd-connection-conceptorio).
- Caja para RPI (opcional)
- Conexión a Internet
- Un computador
- Paciencia

## ¿Cómo hacerlo?

- **Momento 1: Prepara tu Pi**
    
    Para esta solución estamos usando un Raspberry Pi v4, pero las versiones anteriores pueden servir sin problema. 
    
    Si estás iniciando con un Raspberry Pi nuevo y cuentas con una caja plástica ensambla el disipador de temperatura en el procesador del RPI y colócalo dentro de su caja protectora antes de continuar.
    
    Los desarrolladores de **Raspberry Pi** han creado una herramienta para facilitar la descarga, instalación y configuración de las memorias **MicroSD** que tendrán el sistema operativo que ejecuta el RPI. 
    
    - **Instala el software específico para tu sistema operativo, Raspberry Pi Imager**
        
        Para instalarlo en tu computador visita [[Software](https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/)). Allí puedes descargar la versión del Raspberry Pi Imager que funcione en tu sistema operativo (Windows, Linux o Mac) una vez lo instales puedes continuar con el siguiente paso.
        
        ![Imagen](/assets/images/Antena 3 4G 3 4G Antenna 22b2bd68c5b68076a24ccc4e1d6ff4af/image-800w.webp)
        
    - **Conecta la MicroSD a tu computador**
        
        Antes de ejecutar el Raspberry Pi Imager, debes conectar la memoria [**MicroSD**](https://sole-doc.tiddlyhost.com/#MicroSD) a tu computador. 
        
        Para ello es necesario usar un adaptador a USB si tu equipo no cuenta un la ranura para ello. 
        
        Una vez compruebes que la memoria está en el equipo ejecuta el Raspberry Pi Imager y continúa con la solución.
        
    - **Abre el Raspberry Pi Imager y elige tu sistema operativo**
        
        ![Imagen](/assets/images/Conexión cable Ethernet Ethernet cable connection 22b2bd68c5b680fa90ceecc23bea76db/image 1-275w.webp)
        
- **Momento 2: Conecta tu Pi**
    - **Ubícalo en el Pi Imager**
        
        Ahora que ya está nuestro Pi conectado a la corriente, y a nuestra [**red local](/lan-red-local-lan-local-area-network-conceptorio),** debemos ubicarlo para poder conectarnos a él. 
        
        Antes de esto, una pequeña nota: **los pasos que vienen a continuación los realizaremos por medio de un** [Terminal](/terminal-o-consola-terminal-or-console-conceptorio). Si usas un [sistema operativo](../../Conceptorio 2602bd68c5b681c182aed46fccc7c4ea/Conceptorio 2602bd68c5b68191afe2e809f2a2154d/Sistema operativo (SO)%20Operating%20system%20(OS)%202602bd68c5b6810dbe0cfe176de13e7b.md) tipo Unix (Linux, MacOs), simplemente, busca el terminal y ahí podrás seguir los pasos (más abajo tienes cómo hacerlo). Si usas Windows, puedes usar el [CMD](/simbolo-de-sistema-cmd-command-prompt-cmd-conceptorio) en este paso y, para conectarte al Pi, puedes usar [Putty](https://www.putty.org/).
        
        Para ubicar el Pi en un Terminal usamos el [programa ping](/programa-ping-ping-program-conceptorio), este intentará enviar un pequeño paquete de datos a la dirección que le indiquemos y nos dirá entre otras cosas la dirección [**IP**](https://sole-doc.tiddlyhost.com/#IP) del computador. 
        
        Acá vamos a hacer uso del nombre que le pusimos a nuestro Pi, en nuestro caso *solevoltaje*. En el terminal escribimos `ping solevoltaje.local` el programa nos responde entre otras cosas con la [**IP**](https://sole-doc.tiddlyhost.com/#IP) `192.168.0.25`, lo que indica que nuestro Pi está disponible para que nos conectemos y empecemos a trabajar.
        
        ![Imagen](/assets/images/A pocket Wikipedia in your RaspberryPi 1a42bd68c5b680289571fc002238a69a/image 2-800w.webp)
        
    - **Conéctate al Pi**
        
        Para que la conexión entre tu Pi y el resto de dispositivos sea segura, nos conectamos por medio de un [Protocolo SSH](/protocolo-ssh-ssh-protocol-conceptorio) a nuestro Pi. Para ello, escribimos en nuestra terminal `ssh solevoltaje@solevoltaje.local` o con la [Dirección IP](/direccion-ip-ip-address-conceptorio) `ssh solevoltaje@192.168.0.25`
        
        Recuerda que debemos colocar nuestro [nombre de usuario](/nombre-de-usuario-username-conceptorio) y [nombre de dominio](/nombre-de-dominio-domain-name-conceptorio) o [**IP**](https://sole-doc.tiddlyhost.com/#IP) en los parámetros que entregamos a **SSH** `ssh <nombre de usuario>@<nombre de dominio>`. 
        
        Tan pronto se establezca la conexión, el sistema nos pedirá la contraseña. Escribe la misma que ingresaste en la configuración en los pasos anteriores y termina presionando la tecla `enter`.
        
    - **Actualiza el software**
        
        ![](https:/archive.org/download/f-71-b-658-b-290-e-48-d-3-be-45-e-4733-fe-4874-d/ServerAtPi/upgrade.png)
        
        Una vez estemos conectados al Pi debemos hacer un par de tareas de administración. La primera es actualizar el software de nuestro sistema operativo. Esto lo realizamos escribiendo lo siguiente en la terminal:
        
        ```
        sudo apt update && sudo apt upgrade
        ```
        
        Una vez termine la tarea de descargar y configurar el nuevo software podemos seguir con la solución.
        
        > Los comandos que ingresamos en esta línea inician con sudo para tener premisos de superusuario y poder aplicar cambios al sistema.
        > 
    - **Expandimos el SWAP**
        
        ![](https:/archive.org/download/f-71-b-658-b-290-e-48-d-3-be-45-e-4733-fe-4874-d/ServerAtPi/swap.png)
        
        Ahora, es necesario expandir el espacio de la [Memoria SWAP](https://sole-doc.tiddlyhost.com/#SWAP[Memoria Swap 2342Bd68C5B680Cbad43Fe0B7Fa090C0](https://www.notion.so/solecolombia/Memoria-SWAP-2342bd68c5b680cbad43fe0b7fa090c0?source=copy_link)) para que nuestro Pi pueda lidiar fácilmente con operaciones que requieren más memoria que la que tenemos disponible en la [Memoria RAM](/memoria-ram-ram-memory-conceptorio). Realiza los pasos a continuación uno tras otro:
        
        Primero desactivamos la memoria **SWAP**
        
        ```
        sudo dphys-swapfile swapoff
        ```
        
        Luego editamos el archivo de configuración y cambiamos el tamaño a nuestras necesidades:
        
        ```
        sudo nano /etc/dphys-swapfile
        ```
        
        En el archivo busca la línea que por defecto dice `CONF_SWAPSIZE=100` y cámbiala por `CONF_SWAPSIZE=2048`. Luego, guarda y sal del editor de texto.
        
        Ahora necesitamos activar la nueva configuración:
        
        ```
        sudo dphys-swapfile setup
        ```
        
        Activamos nuevamente la memoria **SWAP:**
        
        ```
        sudo dphys-swapfile swapon
        ```
        
        Finalmente, reiniciamos el Pi para que todos los programas tengan acceso al nuevo **SWAP:**
        
        ```
        sudo reboot
        ```
        
        Este último comando, reincia el Pi, cerrando nuestra conexión remota. Debes esperar que se complete el proceso en un par de minutos y volver a conectarte por [Protocolo SSH](/protocolo-ssh-ssh-protocol-conceptorio) para continuar.
        
    - **Ahora, instalamos el servidor**
        
        ![](https:/ia601406.us.archive.org/10/items/f-71-b-658-b-290-e-48-d-3-be-45-e-4733-fe-4874-d/ServerAtPi/nginx.png)
        
        Luego de todo este proceso preparatorio, que es más sencillo de lo que parece procedemos a instalar [nginx](https://www.nginx.com/), un programa que permitirá que nuestro Pi pueda funcionar como servidor web y de esta manera podamos acceder desde otros dispositivos por medio de un navegador web a recursos que tengamos alojados allí.
        
        Una vez estemos conectados al Pi escribimos en el terminal:
        
        ```
        sudo apt install nginx
        ```
        
        Esta línea descarga, instala e inicia nuestro servidor.
        
- **Momento 3: Prueba que todo funciona bien**
    
    ![](https:/archive.org/download/f-71-b-658-b-290-e-48-d-3-be-45-e-4733-fe-4874-d/ServerAtPi/test.png)
    
    Ahora, probamos que todo esté funcionando. 
    
    Para ello, en nuestro computador, abrimos una ventana de un navegador web y en la barra de direcciones escribimos `[solevoltaje.local`](http://solevoltaje.local`)  
    
    Si todo está funcionando de manera correcta, debemos ver una página como la de la imagen que dice **Welcome to nginx**.
    

## ¿Cómo saber si esta solución funciona?

Con esta solución, lograrás tener un servidor local que permite alojar contenidos y que serán visibles en la red local. 

De esta manera, puedes descargar material útil para las sesiones de SOLE y no necesitar de acceso a Internet para responder las Grandes Preguntas. También puedes pensar en cargar el contenido que quisieras llevar a un lugar remoto o que quisieras compartir con otras personas, por ejemplo, películas, material educativo, instrucciones, juegos en línea… ¡o cualquier cosa que puedas descargar para usar con otros! 

Gracias a que el Pi es tan pequeño puedes llevarlo a diferentes lugares y tener una Internet de bolsillo.

## ¿Por qué podría funcionar esta solución?

Con esta solución tendrás un servidor portátil, sin embargo aún no tiene nada de información para compartir, te recomendamos revisar las demás soluciones que tenemos en la guía para que le saques provecho a tu nuevo servidor.

## Soluciones recomendadas

- [¿Quieres compartir tu internet sin cables? Configura tu Raspberry Pi ](/quieres-compartir-tu-internet-sin-cables-configura-tu-raspberry-pi-solutions-db)
- ‣
- ‣
- [A pocket Wikipedia](/a-pocket-wikipedia-solutions-db)

[[Ghlojgiwgmok5Nppttdw](https://notionreactions.com/embed/ghlOjGIwGmoK5NpPTtdw](https://notionreactions.com/embed/ghlOjGIwGmoK5NpPTtdw))

---

[¿Nuevo aquí?](/nuevo-aqui-sole-voltaje)

[Inspírate](/inspirate-sole-voltaje)

[Soluciona](/soluciona-sole-voltaje)

[Pregunta/Comenta](/pregunta-comenta-sole-voltaje)

[¿Desconectado?](/desconectado-sole-voltaje)

[Conceptorio](/conceptorio-sole-voltaje)

*SOLE Voltaje is a project by [SOLE Colombia](https://www.solecolombia.org/) supported by [Internet Society Foundation](https://www.isocfoundation.org/)*

[SOLE Voltaje](http://voltaje.solecolombia.org/)  2024 by [Fundación SOLE Colombia](http://www.solecolombia.org/) is licensed by [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1)