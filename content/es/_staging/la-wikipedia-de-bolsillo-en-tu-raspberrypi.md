---
title: La Wikipedia de bolsillo en tu RaspberryPi
lang: es
slug: la-wikipedia-de-bolsillo-en-tu-raspberrypi
aspectos:
- señal
- electricidad
- dispositivos
- espacio
fecha: '2025-07-30'
---


Created: 30 de julio de 2025 0:14
Autor: Nicolás
Solucionas: Dispositivos
Dificultad: Fácil
Cuesta: Gratis
Ayudantes: Nadie
Tardas: Horas
pilar/dispositivos: 1: Aporta para tener dispositivos unipersonales (Celulares)
pilar/espacio: 0: No aporta a tener un espacio público
pilar/personas: 0: No aporta a reunir personas
pilar/senal: 0: No aporta señal
pilar/electricidad: No consigues electricidad
impacto/personas: 1
impacto/sostenibilidad: 0: Se mantiene solo, 2: Medio
recursos/dinero: 0: Sin dinero
recursos/personas: 2: Entre 2 y 3 personas
recursos/tiempo: 2: Días
2025-prueba: No





## **Instala Kiwix en tu Raspberry Pi**


¡Hola! Soy Gabriel y soy artista. Me gusta la tecnología y soy uno de los primeros cacharreros de SOLE Colombia. 

## ¿Qué es instalar una Wikipedia de bolsillo?

La Wikipedia es una enciclopedia construida de manera colaborativa. Muchas personas aportan su saber y conocimiento a ese repositorio de información que es prácticamente universal. Traer todo el contenido de la Wikipedia a un dispositivo, te permite tener acceso desconectado a un montón de información con la que puedes aprender muchas cosas. 

Si compartes esta información, a través de una red interna con tu RaspberryPi, puedes hacer que muchas personas aprendan también contigo. Eso es lo que queremos en SOLE Colombia, que las personas descubran cómo llevar el Internet al siguiente nivel: en grupo. Aprende más sobre SOLE en [www.solecolombia.org](http://www.solecolombia.org) para saber cómo las comunidades están creando un futuro equitativo y hermoso, juntos, una Gran Pregunta a la vez.

## ¿Para qué sirve?

Esta receta hace parte de la serie de cosas útiles que puedes hacer con tu [**Raspberry Pi**](es/glossary/raspberry-pi-conceptorio.md). Con un poco de trabajo puedes configurar **una pequeña Internet de bolsillo** y convertirla en **un punto de acceso inalámbrico portátil**. Podemos seguir sumando cosas a nuestro Pi para que sea un potente dispositivo móvil y contenga información suficiente para, entre otras cosas, poder hacer SOLE en lugares donde no hay acceso a Internet constante. En los siguientes pasos vamos a poner la [Wikipedia](https://wikipedia.org/) en nuestro Pi para poder consultarla en cualquier momento que la necesitemos.

## ¿Qué necesitas?

- Un **Raspberry Pi**
- Un computador.
- Conexión a Internet.
- Un amigo para hablar mientras descarga todo lo necesario.

## ¿Cómo hacerlo?

- **Momento 1: Conectate a tu Pi**
    
![Codigo](assets/images/solv-raspberrypi-downloadwikipedia/solv-raspberrypi-wikipedia-code.webp)

Antes que nada asegurate de tener un **Raspberry Pi** funcionando. Si necesitas ayuda para esto, revisa la receta **Una pequeña Internet de bolsillo** donde te contamos cómo iniciar con este dispositivo. Una vez tengas tu sistema andando, conectate a tu pi por medio de un **Terminal** iniciando una conexión **SSH**. Asegurate que tengas conexión a Internet para poder continuar con los siguientes pasos.
    
- **Momento 2: Descarga lo necesario**
    - El servidor Kiwix
        
        ![Kiwi](assets/images/solv-raspberrypi-pocketwikipedia/solv-raspberrypi-pocketwikipedia-kiwixweb.webp)
        
        El primer componente que vamos a descargar es la aplicación que nos va a permitir servir el archivo comprimido de la wikipedia, para que podamos acceder a él desde nuestra [**red local**](es/glossary/lan-red-local-lan-local-area-network-conceptorio).
        
        ![Descarga](assets/images/solv-raspberrypi-pocketwikipedia/solv-raspberrypi-pocketwikipedia-download.webp)
        
        En la [página de descarga de Kiwix](https://www.kiwix.org/en/downloads/kiwix-serve/) copia el link llamado `GNU/Linux ARM (32 bits)`. Luego, para descargar el archivo en tu Pi, escribe lo siguiente en tu terminal:
        
        ```
        wget https://download.kiwix.org/release/kiwix-tools/kiwix-tools_linux-armhf.tar.gz
        ```
        
    - La Wikipedia comprimida
        
        ![Archivo comprimido](assets/images/solv-raspberrypi-pocketwikipedia/solv-raspberrypi-pocketwikipedia-select.webp)
        
        Ahora, vamos a descargar el archivo comprimido de la wikipedia. En la página de [contenidos de Kiwix](https://library.kiwix.org/?lang=spa&category=wikipedia), busca la versión de la Wikipedia que mejor se ajuste a tus necesidades. Nosotros te recomendamos bajar la versión de 3.3GB que trae información suficiente para poder hacer SOLE.
        
        Dale click en el botón descargar. Luego copia el enlace en el icono que dice *direct* y escribe esto en tu terminal:
        
        ```
        wget https://download.kiwix.org/zim/wikipedia/wikipedia_es_all_mini_2022-11.zim
        ```
        
        Espera pacientemente a que el proceso termine.
        
- **Momento 3: Ahora, instalamos todo**
    - Primero el servidor Kiwix
        
        ![Instalación](assets/images/solv-raspberrypi-pocketwikipedia/solv-raspberrypi-pocketwikipedia-figterm.webp)
        
        Instalar el servidor de Kiwix es muy sencillo, son únicamente dos pasos:
        
        1. Descomprimimos el archivo que acabamos de bajar, con el siguiente comando:
            
            ```
            tar -zxvf kiwix-tools_linux-armhf.tar.gz
            
            ```
            
            ![Descomprimir](assets/images/solv-raspberrypi-pocketwikipedia/solv-raspberrypi-pocketwikipedia-figterm.webp)
            
        2. Movemos los archivos a un directorio del sistema donde se encuentran los archivos ejecutables:
            
            ```
            sudo mv kiwix-tools_linux-armhf-3.3.0-1/* /usr/local/bin
            ```
            
    - Ahora, el archivo de la Wikipedia
        
        ![Archivo Wikipedia](assets/images/solv-raspberrypi-pocketwikipedia/solv-raspberrypi-pocketwikipedia-local.webp)
        
        La instalación del archivo `.zim` consiste en moverlo a otro directorio del sistema para que el servidor de Kiwix lo encuentre fácilmente:
        
        ```
        sudo mv wikipedia_es_all_mini_2022-11.zim  /var/local/
        ```
        
- **Momento 4: Vamos a crear un servicio**
    
    ![Servicio](assets/images/solv-raspberrypi-pocketwikipedia/solv-raspberrypi-pocketwikipedia-kiwixrun.webp)
    
    Un servicio en los sistemas tipo Linux, nos permite iniciar, detener y reiniciar programas que se ejecutan todo el tiempo en nuesto sistema operativo. Vamos a crear un archivo con la configuración del servicio, para que se dispare automáticamente el servidor de Kiwix cuando el Pi inicie.
    
    Primero creamos el archivo:
    
    ```
    sudo nano /etc/systemd/system/kiwix.service
    ```
    
    y dentro escribimos lo siguiente:
    
    ```
    [Unit]
    Description=Kiwix Service
    After=network.target
    
    [Service]
    Type=simple
    User=root
    Group=root
    ExecStart=/usr/local/bin/kiwix-serve /var/local/wikipedia_es_all_mini_2022-11.zim -p 8080
    Restart=always
    RestartSec=3
    
    [Install]
    WantedBy=multi-user.target
    ```
    
    Guardamos los cambios y podemos seguir con la receta.
    
- **Momento 5: Iniciamos nuestro servidor**
    
    ![Servidor](assets/images/solv-raspberrypi-pocketwikipedia/solv-raspberrypi-pocketwikipedia-start.webp)
    
    El paso final es habilitar el nuevo servicio e iniciarlo. Con estas dos líneas, cada vez que encendamos nuestro Pi, el servidor de Kiwix se iniciará automáticamente.
    
    ```
    sudo systemctl enable kiwix
    sudo systemctl start kiwix
    ```
    
- **Momento 5: Probamos que todo funcione**
    
    ![Probamos](assets/images/solv-raspberrypi-pocketwikipedia/solv-raspberrypi-pocketwikipedia-home.webp)
    
    Y ahora... ¡¡el momento que estábamos esperando!! Vamos a visitar nuestra Wikipedia de bolsillo. En el navegador de tu computador o teléfono que esté conectado a la red local navega a la dirección `http://solevoltaje.local:8080`. Una vez cargue, puedes navegar toda la información que acabamos de descargar :D
    

## ¿Cómo saber si esta solución funciona?

¡Has conseguido llenar de información tu Pi! ahora tienes una copia de la enciclopedia más grande del planeta en un dispositivo portátil. Si sigues las recetas de esta serie, podrás tener un dispositvo al que tu comunidad se conecte para buscar las respuestas a las Grandes Preguntas que tienen por resolver o para que puedan aprender juntos.

## ¿Por qué podría funcionar esta solución?

¡Ya prodrás hacer búsquedas en tu Wikipedia portátil! pero ... es una versión reducida y hay muchas otras cosas que podrías encontrar, si tienes una conexión estable a Internet. Lo interesante de esta receta es que puedes tener la Wikipedia, llevarla a muchos lugares y permitir que las comunidades se conecten a tu Raspberry Pi. !! 

## Soluciones recomendadas

- [Raspberry Pi:](es/solve/raspberry-pi-una-pequena-internet-de-bolsillo-solutions-db) 
- [¿Quieres compartir tu internet sin cables? Configura tu Raspberry Pi ](es/solve/quieres-compartir-tu-internet-sin-cables-configura-tu-raspberry-pi-solutions-db) 
- [¿Cómo conseguir equipos donados?](/como-conseguir-equipos-donados-solutions-db) 



---