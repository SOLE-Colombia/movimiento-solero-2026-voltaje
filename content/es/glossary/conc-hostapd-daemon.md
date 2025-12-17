---
title: "Demonio Hostapd | Hostapd Daemon"
date: 2025-7-22
tags:
  - "Funcionamiento del computador"
  - "Redes y conexiones"
autor: "Belén"
draft: false
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

## English

**hostapd** (host access point daemon) **is a user-space daemon that allows a network interface card (NIC) to function as a wireless access point (AP) and an authentication server**.

In essence, it turns your computer into a Wi-Fi router, allowing other devices to connect to the internet through it.

**In more detail:**

- **Access point (AP):** Hostapd creates a wireless network that other devices can connect to, similar to a traditional router.
- **Authentication server:** It manages the authentication of users attempting to connect to the network, ensuring that only authorized devices can access it.
- **IEEE 802.11:** Hostapd implements the IEEE 802.11 protocol, the standard for wireless networks, which includes functions such as access point management, authentication ([WPA](https://www.google.com/search?sca_esv=f96364e1307aa118&rlz=1C5CHFA_enES999ES1001&cs=0&q=WPA&sa=X&ved=2ahUKEwi45O3uiIOPAxUESzABHVIVKK8QxccNegQIJBAB&mstk=AUtExfDBA96uzaaQ3j1Dq0GKccrKUUsp-bySUc06dJ77H26rFLUKwSmGE_NhEbhMP91WQpsz82utZKuJbUfMhGNxcA4EtB6lLKOAIDHEh2jeLQTG7oHWw3jhZDOuxfVMsLhyJu6NOhZeduZD4nk7JIDi0DfYijLhxJXkZGqQxjlKYVtAXYv0KQo4JOGh8lk_PxzXLRAM&csui=3)/[WPA2](https://www.google.com/search?sca_esv=f96364e1307aa118&rlz=1C5CHFA_enES999ES1001&cs=0&q=WPA2&sa=X&ved=2ahUKEwi45O3uiIOPAxUESzABHVIVKK8QxccNegQIJBAC&mstk=AUtExfDBA96uzaaQ3j1Dq0GKccrKUUsp-bySUc06dJ77H26rFLUKwSmGE_NhEbhMP91WQpsz82utZKuJbUfMhGNxcA4EtB6lLKOAIDHEh2jeLQTG7oHWw3jhZDOuxfVMsLhyJu6NOhZeduZD4nk7JIDi0DfYijLhxJXkZGqQxjlKYVtAXYv0KQo4JOGh8lk_PxzXLRAM&csui=3)) and access to protected networks.
- **Implementations:** There are several implementations of hostapd, such as Jouni Malinen's (the most common), OpenBSD and Devicescape.
- [**Linux](https://www.google.com/search?sca_esv=f96364e1307aa118&rlz=1C5CHFA_enES999ES1001&cs=0&q=Linux&sa=X&ved=2ahUKEwi45O3uiIOPAxUESzABHVIVKK8QxccNegQIDhAB&mstk=AUtExfDBA96uzaaQ3j1Dq0GKccrKUUsp-bySUc06dJ77H26rFLUKwSmGE_NhEbhMP91WQpsz82utZKuJbUfMhGNxcA4EtB6lLKOAIDHEh2jeLQTG7oHWw3jhZDOuxfVMsLhyJu6NOhZeduZD4nk7JIDi0DfYijLhxJXkZGqQxjlKYVtAXYv0KQo4JOGh8lk_PxzXLRAM&csui=3) and FreeBSD:** Hostapd is compatible with Linux (Host AP, madwifi and mac80211-based drivers) and FreeBSD ([net80211](https://www.google.com/search?sca_esv=f96364e1307aa118&rlz=1C5CHFA_enES999ES1001&cs=0&q=net80211&sa=X&ved=2ahUKEwi45O3uiIOPAxUESzABHVIVKK8QxccNegQIIRAB&mstk=AUtExfDBA96uzaaQ3j1Dq0GKccrKUUsp-bySUc06dJ77H26rFLUKwSmGE_NhEbhMP91WQpsz82utZKuJbUfMhGNxcA4EtB6lLKOAIDHEh2jeLQTG7oHWw3jhZDOuxfVMsLhyJu6NOhZeduZD4nk7JIDi0DfYijLhxJXkZGqQxjlKYVtAXYv0KQo4JOGh8lk_PxzXLRAM&csui=3)).
- **Common use:** It is primarily used in devices such as [Raspberry Pi](https://www.google.com/search?sca_esv=f96364e1307aa118&rlz=1C5CHFA_enES999ES1001&cs=0&q=Raspberry+Pi&sa=X&ved=2ahUKEwi45O3uiIOPAxUESzABHVIVKK8QxccNegQIFBAB&mstk=AUtExfDBA96uzaaQ3j1Dq0GKccrKUUsp-bySUc06dJ77H26rFLUKwSmGE_NhEbhMP91WQpsz82utZKuJbUfMhGNxcA4EtB6lLKOAIDHEh2jeLQTG7oHWw3jhZDOuxfVMsLhyJu6NOhZeduZD4nk7JIDi0DfYijLhxJXkZGqQxjlKYVtAXYv0KQo4JOGh8lk_PxzXLRAM&csui=3) to create Wi-Fi access points and in wireless security testing systems.