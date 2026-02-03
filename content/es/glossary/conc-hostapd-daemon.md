---
title: "Demonio Hostapd"
date: 2025-7-22
tags:
  - "Funcionamiento del computador"
  - "Redes y conexiones"
autor: "Belén"
draft: false
resumen: "Hostapd (host access point daemon) es un demonio de espacio de usuario que permite que una tarjeta de interfaz de red (NIC) funcione como un punto de acceso ..."
---
**Hostapd** (host access point daemon) **es un demonio de espacio de usuario que permite que una tarjeta de interfaz de red (NIC) funcione como un punto de acceso inalámbrico (AP) y un servidor de autenticación**. 

En esencia, convierte tu computadora en un router Wi-Fi, permitiendo que otros dispositivos se conecten a internet a través de ella.

**En más detalle:**

- **Punto de acceso (AP):** Hostapd crea una red inalámbrica a la que otros dispositivos pueden conectarse, similar a un router tradicional.
- **Servidor de autenticación:** Gestiona la autenticación de usuarios que intentan conectarse a la red, garantizando que solo los dispositivos autorizados puedan acceder.
- **IEEE 802.11:** Hostapd implementa el protocolo IEEE 802.11, el estándar para redes inalámbricas, que incluye funciones como gestión de puntos de acceso, autenticación ([WPA](https://www.google.com/search?sca_esv=f96364e1307aa118&rlz=1C5CHFA_enES999ES1001&cs=0&q=WPA&sa=X&ved=2ahUKEwi45O3uiIOPAxUESzABHVIVKK8QxccNegQIJBAB&mstk=AUtExfDBA96uzaaQ3j1Dq0GKccrKUUsp-bySUc06dJ77H26rFLUKwSmGE_NhEbhMP91WQpsz82utZKuJbUfMhGNxcA4EtB6lLKOAIDHEh2jeLQTG7oHWw3jhZDOuxfVMsLhyJu6NOhZeduZD4nk7JIDi0DfYijLhxJXkZGqQxjlKYVtAXYv0KQo4JOGh8lk_PxzXLRAM&csui=3)/[WPA2](https://www.google.com/search?sca_esv=f96364e1307aa118&rlz=1C5CHFA_enES999ES1001&cs=0&q=WPA2&sa=X&ved=2ahUKEwi45O3uiIOPAxUESzABHVIVKK8QxccNegQIJBAC&mstk=AUtExfDBA96uzaaQ3j1Dq0GKccrKUUsp-bySUc06dJ77H26rFLUKwSmGE_NhEbhMP91WQpsz82utZKuJbUfMhGNxcA4EtB6lLKOAIDHEh2jeLQTG7oHWw3jhZDOuxfVMsLhyJu6NOhZeduZD4nk7JIDi0DfYijLhxJXkZGqQxjlKYVtAXYv0KQo4JOGh8lk_PxzXLRAM&csui=3)) y acceso a redes protegidas.
- **Implementaciones:** Existen varias implementaciones de hostapd, como la de Jouni Malinen (la más común), OpenBSD y Devicescape.
- [**Linux**](https://www.google.com/search?sca_esv=f96364e1307aa118&rlz=1C5CHFA_enES999ES1001&cs=0&q=Linux&sa=X&ved=2ahUKEwi45O3uiIOPAxUESzABHVIVKK8QxccNegQIDhAB&mstk=AUtExfDBA96uzaaQ3j1Dq0GKccrKUUsp-bySUc06dJ77H26rFLUKwSmGE_NhEbhMP91WQpsz82utZKuJbUfMhGNxcA4EtB6lLKOAIDHEh2jeLQTG7oHWw3jhZDOuxfVMsLhyJu6NOhZeduZD4nk7JIDi0DfYijLhxJXkZGqQxjlKYVtAXYv0KQo4JOGh8lk_PxzXLRAM&csui=3) **y FreeBSD:** Hostapd es compatible con Linux (Host AP, madwifi y controladores basados en mac80211) y FreeBSD ([net80211](https://www.google.com/search?sca_esv=f96364e1307aa118&rlz=1C5CHFA_enES999ES1001&cs=0&q=net80211&sa=X&ved=2ahUKEwi45O3uiIOPAxUESzABHVIVKK8QxccNegQIIRAB&mstk=AUtExfDBA96uzaaQ3j1Dq0GKccrKUUsp-bySUc06dJ77H26rFLUKwSmGE_NhEbhMP91WQpsz82utZKuJbUfMhGNxcA4EtB6lLKOAIDHEh2jeLQTG7oHWw3jhZDOuxfVMsLhyJu6NOhZeduZD4nk7JIDi0DfYijLhxJXkZGqQxjlKYVtAXYv0KQo4JOGh8lk_PxzXLRAM&csui=3)).
- **Uso común:** Se utiliza principalmente en dispositivos como [Raspberry Pi](https://www.google.com/search?sca_esv=f96364e1307aa118&rlz=1C5CHFA_enES999ES1001&cs=0&q=Raspberry+Pi&sa=X&ved=2ahUKEwi45O3uiIOPAxUESzABHVIVKK8QxccNegQIFBAB&mstk=AUtExfDBA96uzaaQ3j1Dq0GKccrKUUsp-bySUc06dJ77H26rFLUKwSmGE_NhEbhMP91WQpsz82utZKuJbUfMhGNxcA4EtB6lLKOAIDHEh2jeLQTG7oHWw3jhZDOuxfVMsLhyJu6NOhZeduZD4nk7JIDi0DfYijLhxJXkZGqQxjlKYVtAXYv0KQo4JOGh8lk_PxzXLRAM&csui=3) para crear puntos de acceso Wi-Fi y en sistemas de prueba de seguridad inalámbrica.
