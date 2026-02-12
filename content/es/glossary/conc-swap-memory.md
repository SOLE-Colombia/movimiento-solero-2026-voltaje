---
title: "Memoria SWAP"
date: 2025-07-17
tags:
  - "Almacenamiento"
  - "Funcionamiento del computador"
autor: "Belén"
draft: false
resumen: "La Memoria SWAP, también conocida como espacio de intercambio o memoria virtual, es una sección del disco duro que un sistema operativo utiliza como si fuera..."
---
La Memoria SWAP, también conocida como espacio de intercambio o memoria virtual, **es una sección del disco duro que un sistema operativo utiliza como si fuera memoria RAM cuando la RAM física se está agotando**. 

Actúa como una extensión de la memoria RAM, permitiendo que el sistema mueva datos menos utilizados del RAM al disco duro para liberar espacio en la RAM para procesos más activos. (Fuente: [Aprendo Linux](https://aprendolinux.com/la-memoria-swap-en-linux/#:~:text=%C2%BFQu%C3%A9))



En términos más simples, la memoria swap es como un espacio de almacenamiento temporal en el disco duro que el sistema operativo utiliza cuando necesita más memoria de la que tiene físicamente disponible en la RAM. Cuando un programa necesita más memoria, el sistema operativo puede mover datos menos usados del RAM al swap para liberar espacio en la RAM y poder seguir ejecutando programas.

**¿Por qué se usa?**

- **Evitar la falta de memoria:** Cuando la memoria RAM está llena, el sistema operativo puede utilizar la swap para evitar que las aplicaciones se bloqueen o se vuelvan inestables.
- **Permitir ejecutar más programas:** La memoria swap permite ejecutar más programas simultáneamente de lo que sería posible solo con la RAM disponible.
- **Hibernación:** En algunos sistemas operativos, la memoria swap se utiliza para guardar el estado del sistema al hibernar.

**¿Cómo funciona?**

- **Agotamiento de la RAM:** Cuando la memoria RAM se llena, el sistema operativo identifica los datos menos utilizados.
- **Transferencia a la swap:** Estos datos menos utilizados se mueven del RAM al espacio de intercambio en el disco duro.
- **Liberación de RAM:** La memoria RAM liberada se puede usar para otros procesos que necesitan memoria.
- **Acceso a la swap:** Cuando se necesita acceder a los datos que se movieron a la swap, el sistema operativo los vuelve a cargar en la RAM, y a veces, mueve otros datos menos usados a la swap.

**Ventajas y desventajas:**

- **Ventajas:** Permite ejecutar más programas y evita problemas de memoria cuando la RAM está llena.
- **Desventajas:** El acceso a la memoria swap (en el disco duro) es mucho más lento que el acceso a la RAM, lo que puede afectar el rendimiento del sistema si se utiliza demasiado.

La memoria swap es una herramienta importante para la gestión de la memoria en sistemas informáticos, especialmente en aquellos con cantidades limitadas de RAM. Aunque útil, es importante tener en cuenta que un uso excesivo de la swap puede afectar negativamente el rendimiento del sistema.