---
title: DNS - Sistema de Nombres de Dominio | DNS - Domain Name System
lang: en
slug: dns-sistema-de-nombres-de-dominio-dns-domain-name-system-conceptorio
aspectos:
- dispositivos
- espacio
fecha: '2025-02-24'
---


**El Sistema de Nombres de Dominio**

Antes que nada, recordemos que los computadores entienden mejor números que textos. 

Por eso, las [***direcciones IP***](/direccion-ip-ip-address-conceptorio) que se usan en las redes de computadores son cadenas de números, y no nombres como *el computador de la escuela en el salón 101*. Al contrario, a nosotros los humanos, se nos facilita lidiar con textos que tengan sentido en nuestro idioma y, muchas veces, se nos dificultan los números.

Para solucionar esta diferencia de lenguajes en las direcciones de red, se desarrolló el protocolo DNS: Sistema de Nombres de Dominio (por sus siglas en inglés).

Los DNS son, sencillamente, un inmenso directorio que guarda los nombres de dominio (`google.com`) y las direcciones IP, donde puede encontrarse la información de este servidor (`172.217.28.110`). Este directorio no se encuentra en un único lugar, por el contrario hay cientos de copias en diferentes servidores ubicados en diferentes partes del planeta, haciendo que las consultas tomen poco tiempo y los sitios web carguen más rápidamente. (Fuente: [Cloudflare.gov](https://www.cloudflare.com/es-es/learning/dns/what-is-dns/#:~:text=enlace) y [Wikipedia.gov](https://es.wikipedia.org/wiki/Sistema_de_nombres_de_dominio))

### **¿Cómo funciona el DNS?**

1. **Consulta:**
    
    Cuando escribes un nombre de dominio en tu navegador, este envía una solicitud a un servidor DNS.
    
2. **Búsqueda:**
    
    El servidor DNS busca la dirección IP correspondiente al nombre de dominio en su base de datos.
    
3. **Respuesta:**
    
    El servidor DNS devuelve la dirección IP al navegador.
    
4. **Conexión:**El navegador utiliza la dirección IP para conectarse al servidor web que aloja el sitio web.

(Fuente: [Cloudflare.gov](https://www.cloudflare.com/es-es/learning/dns/what-is-dns/))

**En términos más sencillos:**

Imagina que quieres llamar a un amigo. En lugar de usar su número de teléfono, que es difícil de recordar, buscas su nombre en tu agenda telefónica. El DNS es esa agenda telefónica para internet.

### **Beneficios del DNS:**

- **Facilita el acceso a sitios web:** Permite recordar y usar nombres de dominio fáciles de recordar en lugar de direcciones IP complejas.
- **Organiza internet:** Permite que los sitios web se encuentren y accedan de manera eficiente.
- **Flexibilidad:** Permite cambiar la dirección IP de un sitio web sin afectar el nombre de dominio.

Antes que nada, recordemos que los computadores entienden mejor números que textos. 

Por eso, las [***direcciones IP***](/direccion-ip-ip-address-conceptorio) que se usan en las redes de computadores son cadenas de números, y no nombres como *el computador de la escuela en el salón 101*. Al contrario, a nosotros los humanos, se nos facilita lidiar con textos que tengan sentido en nuestro idioma y, muchas veces, se nos dificultan los números.

Para solucionar esta diferencia de lenguajes en las direcciones de red, se desarrolló el protocolo DNS: Sistema de Nombres de Dominio (por sus siglas en inglés).

Los DNS son, sencillamente, un inmenso directorio que guarda los nombres de dominio (`google.com`) y las direcciones IP, donde puede encontrarse la información de este servidor (`172.217.28.110`). Este directorio no se encuentra en un único lugar, por el contrario hay cientos de copias en diferentes servidores ubicados en diferentes partes del planeta, haciendo que las consultas tomen poco tiempo y los sitios web carguen más rápidamente.

## English

**The Domain Name System**

First of all, let's remember that computers understand numbers better than text.

That's why ***IP addresses***used in computer networks are strings of numbers, not names like *the school computer in room 101*. On the contrary, for us humans, it's easier to deal with text that makes sense in our language and, often, numbers are more difficult for us.

To solve this difference in network addressing languages, the DNS protocol was developed: Domain Name System.

DNS is, simply put, an immense directory that stores domain names (`google.com`) and IP addresses, where the information from this server can be found (`172.217.28.110`). This directory is not located in a single place; on the contrary, there are hundreds of copies on different servers located in different parts of the planet, making queries take less time and websites load more quickly. (Source: [Cloudflare](https://www.cloudflare.com/es-es/learning/dns/what-is-dns/#:~:text=enlace del artículo-,¿Qué es DNS?,:d7a2 (en IPv6).) and https://es.wikipedia.org/wiki/Sistema_de_nombres_de_dominio)

### **How does DNS work?**

1. **Query:**When you type a domain name in your browser, it sends a request to a DNS server.
2. **Lookup:**The DNS server searches for the IP address corresponding to the domain name in its database.
3. **Response:**The DNS server returns the IP address to the browser.
4. **Connection:**The browser uses the IP address to connect to the web server that hosts the website.

(Source: https://www.cloudflare.com/es-es/learning/dns/what-is-dns/)

**In simpler terms:**

Imagine you want to call a friend. Instead of using their phone number, which is difficult to remember, you look up their name in your phone book. DNS is that phone book for the internet.

### **Benefits of DNS:**

- **Facilitates access to websites:** Allows you to remember and use easy-to-remember domain names instead of complex IP addresses.
- **Organizes the internet:** Allows websites to be found and accessed efficiently.
- **Flexibility:** Allows changing a website's IP address without affecting the domain name.

First of all, let's remember that computers understand numbers better than text.

That's why ***IP addresses***used in computer networks are strings of numbers, not names like *the school computer in room 101*. On the contrary, for us humans, it's easier to deal with text that makes sense in our language and, often, numbers are more difficult for us.

To solve this difference in network addressing languages, the DNS protocol was developed: Domain Name System.

DNS is, simply put, an immense directory that stores domain names (`google.com`) and IP addresses, where the information from this server can be found (`172.217.28.110`). This directory is not located in a single place; on the contrary, there are hundreds of copies on different servers located in different parts of the planet, making queries take less time and websites load more quickly.