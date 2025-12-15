---
title: Memoria SWAP | SWAP Memory
lang: es
slug: memoria-swap-swap-memory-conceptorio
aspectos:
- espacio
fecha: '2025-10-11'
---

# Memoria SWAP | SWAP Memory

Fecha de creación: 30 de agosto de 2025 23:19
Autor(a): Belen Sevilla Morillo
R2025: revisado
idioma: english, español

## Español

La Memoria SWAP, también conocida como espacio de intercambio o memoria virtual, **es una sección del disco duro que un sistema operativo utiliza como si fuera [memoria RAM](/memoria-ram-ram-memory-conceptorio) cuando la RAM física se está agotando**. 

Actúa como una extensión de la memoria RAM, permitiendo que el sistema mueva datos menos utilizados del RAM al disco duro para liberar espacio en la RAM para procesos más activos. (Fuente [Aprendo Linux](https://aprendolinux.com/la-memoria-swap-en-linux/#:~:text=¿Qué es la memoria swap,problemas de falta de memoria.))

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

## English

SWAP Memory, also known as swap space or virtual memory, **is a section of hard disk that an operating system uses as if it were [RAM](/memoria-ram-ram-memory-conceptorio) when physical RAM is running low**. 

It acts as an extension of RAM, allowing the system to move less-used data from RAM to the hard disk to free up space in RAM for more active processes (Source [I Learn Linux](https://aprendolinux.com/la-memoria-swap-en-linux/#:~:text=¿Qué es la memoria swap,problemas de falta de memoria.)).

In simpler terms, swap memory is like a temporary storage space on the hard disk that the operating system uses when it needs more memory than it has physically available in RAM. When a program needs more memory, the operating system can move less used data from RAM to swap to free up space in RAM to continue running programs.

**Why is it used?**

- **Prevent memory starvation:** When RAM is full, the operating system can use swap to prevent applications from crashing or becoming unstable.
- **Allow more programs to run:** Swap memory allows more programs to run simultaneously than would be possible with available RAM alone.
- **Hibernation:** In some operating systems, swap memory is used to save the state of the system when hibernating.

**How does it work?**

- **RAM depletion:** When RAM becomes full, the operating system identifies the least used data.
- **Transfer to swap:** This less used data is moved from RAM to swap space on the hard disk.
- **RAM release:** The released RAM can be used for other processes that need memory.
- **Swap access:** When data that was moved to swap needs to be accessed, the operating system reloads it back into RAM, and sometimes, moves other lesser-used data to swap.

**Advantages and disadvantages:**

- **Advantages:** Allows you to run more programs and avoids memory problems when RAM is full.
- **Disadvantages:** Swap memory access (on the hard disk) is much slower than RAM access, which can affect system performance if it is overused.

Swap memory is an important tool for memory management in computer systems, especially those with limited amounts of RAM. Although useful, it is important to note that excessive swap usage can negatively affect system performance.