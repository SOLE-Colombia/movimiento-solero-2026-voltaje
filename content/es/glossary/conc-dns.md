---
title: "DNS - Sistema de Nombres de Dominio"
date: 2025-02-24
tags:
  - "Redes y conexiones"
  - "Términos del mundo virtual"
autor: "SOLE Colombia"
draft: false
resumen: "Antes que nada, recordemos que los computadores entienden mejor números que textos."
---
Antes que nada, recordemos que los computadores entienden mejor números que textos. 

Por eso, las [***direcciones IP***](/es/glossary/direccion-ip-ip-address-conceptorio) que se usan en las redes de computadores son cadenas de números, y no nombres como *el computador de la escuela en el salón 101*. Al contrario, a nosotros los humanos, se nos facilita lidiar con textos que tengan sentido en nuestro idioma y, muchas veces, se nos dificultan los números.

Para solucionar esta diferencia de lenguajes en las direcciones de red, se desarrolló el protocolo DNS: Sistema de Nombres de Dominio (por sus siglas en inglés).

Los DNS son, sencillamente, un inmenso directorio que guarda los nombres de dominio (`google.com`) y las direcciones IP, donde puede encontrarse la información de este servidor (`172.217.28.110`). Este directorio no se encuentra en un único lugar, por el contrario hay cientos de copias en diferentes servidores ubicados en diferentes partes del planeta, haciendo que las consultas tomen poco tiempo y los sitios web carguen más rápidamente. (Fuente: [Cloudflare](https://www.cloudflare.com/es-es/learning/dns/what-is-dns/#:~:text=enlace) y [Wikipedia](https://es.wikipedia.org/wiki/Sistema_de_nombres_de_dominio))

### **¿Cómo funciona el DNS?**

1. **Consulta:**
    
    Cuando escribes un nombre de dominio en tu navegador, este envía una solicitud a un servidor DNS.
    
2. **Búsqueda:**
    
    El servidor DNS busca la dirección IP correspondiente al nombre de dominio en su base de datos.
    
3. **Respuesta:**
    
    El servidor DNS devuelve la dirección IP al navegador.
    
4. **Conexión:**El navegador utiliza la dirección IP para conectarse al servidor web que aloja el sitio web.

(Fuente: [Cloudflare](https://www.cloudflare.com/es-es/learning/dns/what-is-dns/))

**En términos más sencillos:**

Imagina que quieres llamar a un amigo. En lugar de usar su número de teléfono, que es difícil de recordar, buscas su nombre en tu agenda telefónica. El DNS es esa agenda telefónica para internet.

### **Beneficios del DNS:**

- **Facilita el acceso a sitios web:** Permite recordar y usar nombres de dominio fáciles de recordar en lugar de direcciones IP complejas.
- **Organiza internet:** Permite que los sitios web se encuentren y accedan de manera eficiente.
- **Flexibilidad:** Permite cambiar la dirección IP de un sitio web sin afectar el nombre de dominio.

Antes que nada, recordemos que los computadores entienden mejor números que textos. 

Por eso, las [***direcciones IP***](/es/glossary/direccion-ip-ip-address-conceptorio) que se usan en las redes de computadores son cadenas de números, y no nombres como *el computador de la escuela en el salón 101*. Al contrario, a nosotros los humanos, se nos facilita lidiar con textos que tengan sentido en nuestro idioma y, muchas veces, se nos dificultan los números.

Para solucionar esta diferencia de lenguajes en las direcciones de red, se desarrolló el protocolo DNS: Sistema de Nombres de Dominio (por sus siglas en inglés).

Los DNS son, sencillamente, un inmenso directorio que guarda los nombres de dominio (`google.com`) y las direcciones IP, donde puede encontrarse la información de este servidor (`172.217.28.110`). Este directorio no se encuentra en un único lugar, por el contrario hay cientos de copias en diferentes servidores ubicados en diferentes partes del planeta, haciendo que las consultas tomen poco tiempo y los sitios web carguen más rápidamente.
