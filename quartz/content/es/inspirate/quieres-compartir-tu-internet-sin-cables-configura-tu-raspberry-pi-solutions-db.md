---
title: ¿Quieres compartir tu internet sin cables? Configura tu Raspberry Pi
lang: es
slug: quieres-compartir-tu-internet-sin-cables-configura-tu-raspberry-pi-solutions-db
aspectos:
- señal
- electricidad
- dispositivos
fecha: '2025-10-11'
---

# ¿Quieres compartir tu internet sin cables? Configura tu Raspberry Pi

Created: 30 de agosto de 2025 23:19
Autor: Gabriel
Solucionas: Señal
Dificultad: Promedio
Cuesta: >$ 100 COP
Ayudantes: Nadie
Tardas: Minutos
pilar/senal: 2: Aporta señal intermitente (Antena casera)
pilar/electricidad: No consigues electricidad
impacto/personas: 1
impacto/sostenibilidad: 0: Se mantiene solo
recursos/dinero: 0: Sin dinero
recursos/personas: 2: Entre 2 y 3 personas
recursos/tiempo: 0: Minutos
R-reactions: No

*Descarga esta solución para usarla desconectado*

*Download this solution to use it disconnected*

**Contenido**

[](data:image/svg+xml,%3Csvg%20id%3D%22Dinero_M_on%22%20data-name%3D%22Dinero%20M%20on%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20.cls-1%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20%23fff%3B%0A%20%20%20%20%20%20%20%20stroke%3A%20%23707070%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-1%2C%20.cls-2%20%7B%0A%20%20%20%20%20%20%20%20stroke-width%3A%202px%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-2%2C%20.cls-4%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-2%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20%23000%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-3%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%3C%2Fstyle%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20id%3D%22Grupo_356%22%20data-name%3D%22Grupo%20356%22%3E%0A%20%20%20%20%3Cg%20id%3D%22Grupo_355%22%20data-name%3D%22Grupo%20355%22%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22Elipse_199%22%20data-name%3D%22Elipse%20199%22%20class%3D%22cls-1%22%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-3%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-4%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2211%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22Elipse_200%22%20data-name%3D%22Elipse%20200%22%20class%3D%22cls-2%22%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-3%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-4%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2211%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cg%20id%3D%22Grupo_357%22%20data-name%3D%22Grupo%20357%22%20transform%3D%22translate(7.667%204.352)%22%3E%0A%20%20%20%20%3Cpath%20id%3D%22Trazado_708%22%20data-name%3D%22Trazado%20708%22%20d%3D%22M10.556-204.242a5.451%2C5.451%2C0%2C0%2C1-2.3-.461%2C3.563%2C3.563%2C0%2C0%2C1-1.567-1.354%2C3.984%2C3.984%2C0%2C0%2C1-.566-2.174v-.409H7.882v.409a2.232%2C2.232%2C0%2C0%2C0%2C.729%2C1.822%2C2.947%2C2.947%2C0%2C0%2C0%2C1.944.607%2C2.849%2C2.849%2C0%2C0%2C0%2C1.854-.516%2C1.653%2C1.653%2C0%2C0%2C0%2C.626-1.338%2C1.35%2C1.35%2C0%2C0%2C0-.287-.886%2C1.981%2C1.981%2C0%2C0%2C0-.831-.55%2C10.949%2C10.949%2C0%2C0%2C0-1.3-.385l-.606-.148a9.532%2C9.532%2C0%2C0%2C1-1.9-.649A3.1%2C3.1%2C0%2C0%2C1%2C6.864-211.3a2.818%2C2.818%2C0%2C0%2C1-.444-1.641%2C3.024%2C3.024%2C0%2C0%2C1%2C.492-1.739%2C3.188%2C3.188%2C0%2C0%2C1%2C1.38-1.116%2C5.089%2C5.089%2C0%2C0%2C1%2C2.085-.394%2C5.355%2C5.355%2C0%2C0%2C1%2C2.142.409%2C3.425%2C3.425%2C0%2C0%2C1%2C1.493%2C1.215%2C3.5%2C3.5%2C0%2C0%2C1%2C.549%2C2.02v.59H12.806v-.59a2.141%2C2.141%2C0%2C0%2C0-.3-1.2%2C1.767%2C1.767%2C0%2C0%2C0-.853-.673%2C3.528%2C3.528%2C0%2C0%2C0-1.271-.213%2C2.647%2C2.647%2C0%2C0%2C0-1.624.435%2C1.429%2C1.429%2C0%2C0%2C0-.575%2C1.206%2C1.382%2C1.382%2C0%2C0%2C0%2C.253.862%2C1.806%2C1.806%2C0%2C0%2C0%2C.748.55%2C6.772%2C6.772%2C0%2C0%2C0%2C1.215.377l.606.148a10.059%2C10.059%2C0%2C0%2C1%2C1.971.633%2C3.308%2C3.308%2C0%2C0%2C1%2C1.337%2C1.041%2C2.777%2C2.777%2C0%2C0%2C1%2C.483%2C1.691%2C3.164%2C3.164%2C0%2C0%2C1-.518%2C1.806%2C3.439%2C3.439%2C0%2C0%2C1-1.467%2C1.206A5.391%2C5.391%2C0%2C0%2C1%2C10.556-204.242Zm-.819%2C1.674v-15.3h1.624v15.3Z%22%20transform%3D%22translate(-6.126%20217.865)%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A)

[](data:image/svg+xml,%3Csvg%20id%3D%22Dinero_M_on%22%20data-name%3D%22Dinero%20M%20on%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20.cls-1%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20%23fff%3B%0A%20%20%20%20%20%20%20%20stroke%3A%20%23707070%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-1%2C%20.cls-2%20%7B%0A%20%20%20%20%20%20%20%20stroke-width%3A%202px%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-2%2C%20.cls-4%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-2%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20%23000%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-3%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%3C%2Fstyle%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20id%3D%22Grupo_356%22%20data-name%3D%22Grupo%20356%22%3E%0A%20%20%20%20%3Cg%20id%3D%22Grupo_355%22%20data-name%3D%22Grupo%20355%22%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22Elipse_199%22%20data-name%3D%22Elipse%20199%22%20class%3D%22cls-1%22%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-3%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-4%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2211%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22Elipse_200%22%20data-name%3D%22Elipse%20200%22%20class%3D%22cls-2%22%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-3%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-4%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2211%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cg%20id%3D%22Grupo_357%22%20data-name%3D%22Grupo%20357%22%20transform%3D%22translate(7.667%204.352)%22%3E%0A%20%20%20%20%3Cpath%20id%3D%22Trazado_708%22%20data-name%3D%22Trazado%20708%22%20d%3D%22M10.556-204.242a5.451%2C5.451%2C0%2C0%2C1-2.3-.461%2C3.563%2C3.563%2C0%2C0%2C1-1.567-1.354%2C3.984%2C3.984%2C0%2C0%2C1-.566-2.174v-.409H7.882v.409a2.232%2C2.232%2C0%2C0%2C0%2C.729%2C1.822%2C2.947%2C2.947%2C0%2C0%2C0%2C1.944.607%2C2.849%2C2.849%2C0%2C0%2C0%2C1.854-.516%2C1.653%2C1.653%2C0%2C0%2C0%2C.626-1.338%2C1.35%2C1.35%2C0%2C0%2C0-.287-.886%2C1.981%2C1.981%2C0%2C0%2C0-.831-.55%2C10.949%2C10.949%2C0%2C0%2C0-1.3-.385l-.606-.148a9.532%2C9.532%2C0%2C0%2C1-1.9-.649A3.1%2C3.1%2C0%2C0%2C1%2C6.864-211.3a2.818%2C2.818%2C0%2C0%2C1-.444-1.641%2C3.024%2C3.024%2C0%2C0%2C1%2C.492-1.739%2C3.188%2C3.188%2C0%2C0%2C1%2C1.38-1.116%2C5.089%2C5.089%2C0%2C0%2C1%2C2.085-.394%2C5.355%2C5.355%2C0%2C0%2C1%2C2.142.409%2C3.425%2C3.425%2C0%2C0%2C1%2C1.493%2C1.215%2C3.5%2C3.5%2C0%2C0%2C1%2C.549%2C2.02v.59H12.806v-.59a2.141%2C2.141%2C0%2C0%2C0-.3-1.2%2C1.767%2C1.767%2C0%2C0%2C0-.853-.673%2C3.528%2C3.528%2C0%2C0%2C0-1.271-.213%2C2.647%2C2.647%2C0%2C0%2C0-1.624.435%2C1.429%2C1.429%2C0%2C0%2C0-.575%2C1.206%2C1.382%2C1.382%2C0%2C0%2C0%2C.253.862%2C1.806%2C1.806%2C0%2C0%2C0%2C.748.55%2C6.772%2C6.772%2C0%2C0%2C0%2C1.215.377l.606.148a10.059%2C10.059%2C0%2C0%2C1%2C1.971.633%2C3.308%2C3.308%2C0%2C0%2C1%2C1.337%2C1.041%2C2.777%2C2.777%2C0%2C0%2C1%2C.483%2C1.691%2C3.164%2C3.164%2C0%2C0%2C1-.518%2C1.806%2C3.439%2C3.439%2C0%2C0%2C1-1.467%2C1.206A5.391%2C5.391%2C0%2C0%2C1%2C10.556-204.242Zm-.819%2C1.674v-15.3h1.624v15.3Z%22%20transform%3D%22translate(-6.126%20217.865)%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A)

[](data:image/svg+xml,%3Csvg%20id%3D%22Dinero_M_off%22%20data-name%3D%22Dinero%20M%20off%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20.cls-1%2C%20.cls-2%2C%20.cls-5%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-1%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20%23707070%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-1%2C%20.cls-2%20%7B%0A%20%20%20%20%20%20%20%20stroke-width%3A%202px%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-2%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20%23d1d0d1%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-3%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20%23d1d0d1%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-4%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%3C%2Fstyle%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20id%3D%22Grupo_356%22%20data-name%3D%22Grupo%20356%22%3E%0A%20%20%20%20%3Cg%20id%3D%22Grupo_355%22%20data-name%3D%22Grupo%20355%22%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22Elipse_199%22%20data-name%3D%22Elipse%20199%22%20class%3D%22cls-1%22%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-4%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-5%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2211%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22Elipse_200%22%20data-name%3D%22Elipse%20200%22%20class%3D%22cls-2%22%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-4%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-5%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2211%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cg%20id%3D%22Grupo_357%22%20data-name%3D%22Grupo%20357%22%20transform%3D%22translate(7.667%204.352)%22%3E%0A%20%20%20%20%3Cpath%20id%3D%22Trazado_708%22%20data-name%3D%22Trazado%20708%22%20class%3D%22cls-3%22%20d%3D%22M10.556-204.242a5.451%2C5.451%2C0%2C0%2C1-2.3-.461%2C3.563%2C3.563%2C0%2C0%2C1-1.567-1.354%2C3.984%2C3.984%2C0%2C0%2C1-.566-2.174v-.409H7.882v.409a2.232%2C2.232%2C0%2C0%2C0%2C.729%2C1.822%2C2.947%2C2.947%2C0%2C0%2C0%2C1.944.607%2C2.849%2C2.849%2C0%2C0%2C0%2C1.854-.516%2C1.653%2C1.653%2C0%2C0%2C0%2C.626-1.338%2C1.35%2C1.35%2C0%2C0%2C0-.287-.886%2C1.981%2C1.981%2C0%2C0%2C0-.831-.55%2C10.949%2C10.949%2C0%2C0%2C0-1.3-.385l-.606-.148a9.532%2C9.532%2C0%2C0%2C1-1.9-.649A3.1%2C3.1%2C0%2C0%2C1%2C6.864-211.3a2.818%2C2.818%2C0%2C0%2C1-.444-1.641%2C3.024%2C3.024%2C0%2C0%2C1%2C.492-1.739%2C3.188%2C3.188%2C0%2C0%2C1%2C1.38-1.116%2C5.089%2C5.089%2C0%2C0%2C1%2C2.085-.394%2C5.355%2C5.355%2C0%2C0%2C1%2C2.142.409%2C3.425%2C3.425%2C0%2C0%2C1%2C1.493%2C1.215%2C3.5%2C3.5%2C0%2C0%2C1%2C.549%2C2.02v.59H12.806v-.59a2.141%2C2.141%2C0%2C0%2C0-.3-1.2%2C1.767%2C1.767%2C0%2C0%2C0-.853-.673%2C3.528%2C3.528%2C0%2C0%2C0-1.271-.213%2C2.647%2C2.647%2C0%2C0%2C0-1.624.435%2C1.429%2C1.429%2C0%2C0%2C0-.575%2C1.206%2C1.382%2C1.382%2C0%2C0%2C0%2C.253.862%2C1.806%2C1.806%2C0%2C0%2C0%2C.748.55%2C6.772%2C6.772%2C0%2C0%2C0%2C1.215.377l.606.148a10.059%2C10.059%2C0%2C0%2C1%2C1.971.633%2C3.308%2C3.308%2C0%2C0%2C1%2C1.337%2C1.041%2C2.777%2C2.777%2C0%2C0%2C1%2C.483%2C1.691%2C3.164%2C3.164%2C0%2C0%2C1-.518%2C1.806%2C3.439%2C3.439%2C0%2C0%2C1-1.467%2C1.206A5.391%2C5.391%2C0%2C0%2C1%2C10.556-204.242Zm-.819%2C1.674v-15.3h1.624v15.3Z%22%20transform%3D%22translate(-6.126%20217.865)%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A)

[](data:image/svg+xml,%3Csvg%20id%3D%22Tiempo_M_on%22%20data-name%3D%22Tiempo%20M%20on%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20.cls-1%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20%23fff%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-2%2C%20.cls-4%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-2%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20%23000%3B%0A%20%20%20%20%20%20%20%20stroke-width%3A%202px%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-3%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%3C%2Fstyle%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20id%3D%22Grupo_353%22%20data-name%3D%22Grupo%20353%22%3E%0A%20%20%20%20%3Ccircle%20id%3D%22Elipse_197%22%20data-name%3D%22Elipse%20197%22%20class%3D%22cls-1%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%20transform%3D%22translate(0%200)%22%2F%3E%0A%20%20%20%20%3Cg%20id%3D%22Elipse_198%22%20data-name%3D%22Elipse%20198%22%20class%3D%22cls-2%22%20transform%3D%22translate(0%200)%22%3E%0A%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-3%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-4%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2211%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cg%20id%3D%22Body_M_Regular%22%20data-name%3D%22Body%20M%20Regular%22%20transform%3D%22translate(12%205.064)%22%3E%0A%20%20%20%20%3Cg%20id%3D%22Grupo_259%22%20data-name%3D%22Grupo%20259%22%20transform%3D%22translate(0)%22%3E%0A%20%20%20%20%20%20%3Cpath%20id%3D%22Trazado_569%22%20data-name%3D%22Trazado%20569%22%20class%3D%22cls-2%22%20d%3D%22M27.309-217.465V-210l4.166%2C4.166%22%20transform%3D%22translate(-27.309%20217.465)%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A)

[](data:image/svg+xml,%3Csvg%20id%3D%22Tiempo_M_off%22%20data-name%3D%22Tiempo%20M%20off%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20.cls-1%2C%20.cls-2%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-2%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20%23d1d0d1%3B%0A%20%20%20%20%20%20%20%20stroke-width%3A%202px%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-3%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%3C%2Fstyle%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20id%3D%22Grupo_353%22%20data-name%3D%22Grupo%20353%22%20transform%3D%22translate(0%200)%22%3E%0A%20%20%20%20%3Ccircle%20id%3D%22Elipse_197%22%20data-name%3D%22Elipse%20197%22%20class%3D%22cls-1%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%20transform%3D%22translate(0%200)%22%2F%3E%0A%20%20%20%20%3Cg%20id%3D%22Elipse_198%22%20data-name%3D%22Elipse%20198%22%20class%3D%22cls-2%22%20transform%3D%22translate(0%200)%22%3E%0A%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-3%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-1%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2211%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cg%20id%3D%22Body_M_Regular%22%20data-name%3D%22Body%20M%20Regular%22%20transform%3D%22translate(12%205.064)%22%3E%0A%20%20%20%20%3Cg%20id%3D%22Grupo_259%22%20data-name%3D%22Grupo%20259%22%20transform%3D%22translate(0)%22%3E%0A%20%20%20%20%20%20%3Cpath%20id%3D%22Trazado_569%22%20data-name%3D%22Trazado%20569%22%20class%3D%22cls-2%22%20d%3D%22M27.309-217.465V-210l4.166%2C4.166%22%20transform%3D%22translate(-27.309%20217.465)%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A)

[](data:image/svg+xml,%3Csvg%20id%3D%22Tiempo_M_off%22%20data-name%3D%22Tiempo%20M%20off%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20.cls-1%2C%20.cls-2%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-2%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20%23d1d0d1%3B%0A%20%20%20%20%20%20%20%20stroke-width%3A%202px%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-3%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%3C%2Fstyle%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20id%3D%22Grupo_353%22%20data-name%3D%22Grupo%20353%22%20transform%3D%22translate(0%200)%22%3E%0A%20%20%20%20%3Ccircle%20id%3D%22Elipse_197%22%20data-name%3D%22Elipse%20197%22%20class%3D%22cls-1%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%20transform%3D%22translate(0%200)%22%2F%3E%0A%20%20%20%20%3Cg%20id%3D%22Elipse_198%22%20data-name%3D%22Elipse%20198%22%20class%3D%22cls-2%22%20transform%3D%22translate(0%200)%22%3E%0A%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-3%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20class%3D%22cls-1%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2211%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cg%20id%3D%22Body_M_Regular%22%20data-name%3D%22Body%20M%20Regular%22%20transform%3D%22translate(12%205.064)%22%3E%0A%20%20%20%20%3Cg%20id%3D%22Grupo_259%22%20data-name%3D%22Grupo%20259%22%20transform%3D%22translate(0)%22%3E%0A%20%20%20%20%20%20%3Cpath%20id%3D%22Trazado_569%22%20data-name%3D%22Trazado%20569%22%20class%3D%22cls-2%22%20d%3D%22M27.309-217.465V-210l4.166%2C4.166%22%20transform%3D%22translate(-27.309%20217.465)%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A)

[](data:image/svg+xml,%3Csvg%20id%3D%22Usuario_M_on%22%20data-name%3D%22Usuario%20M%20on%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20.cls-1%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20%23ef7750%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-1%2C%20.cls-4%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20%23000%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-2%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20%23fff%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-3%20%7B%0A%20%20%20%20%20%20%20%20clip-path%3A%20url(%23clip-path)%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-4%2C%20.cls-6%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-4%20%7B%0A%20%20%20%20%20%20%20%20stroke-width%3A%202px%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-5%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%3C%2Fstyle%3E%0A%20%20%20%20%3CclipPath%20id%3D%22clip-path%22%3E%0A%20%20%20%20%20%20%3Ccircle%20id%3D%22Elipse_195%22%20data-name%3D%22Elipse%20195%22%20class%3D%22cls-1%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%20transform%3D%22translate(0%200)%22%2F%3E%0A%20%20%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Ccircle%20id%3D%22Elipse_193%22%20data-name%3D%22Elipse%20193%22%20class%3D%22cls-2%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%2F%3E%0A%20%20%3Cg%20id%3D%22Grupo_351%22%20data-name%3D%22Grupo%20351%22%20class%3D%22cls-3%22%20transform%3D%22translate(0%200)%22%3E%0A%20%20%20%20%3Cg%20id%3D%22Grupo_350%22%20data-name%3D%22Grupo%20350%22%20transform%3D%22translate(4.9%204.443)%22%3E%0A%20%20%20%20%20%20%3Cpath%20id%3D%22Trazado_707%22%20data-name%3D%22Trazado%20707%22%20class%3D%22cls-4%22%20d%3D%22M56.381-204.709v-1.145a6.279%2C6.279%2C0%2C0%2C0-6.279-6.278H48.458a6.278%2C6.278%2C0%2C0%2C0-6.278%2C6.278v1.145%22%20transform%3D%22translate(-42.18%20221.895)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20id%3D%22Elipse_194%22%20data-name%3D%22Elipse%20194%22%20class%3D%22cls-4%22%20cx%3D%223.389%22%20cy%3D%223.389%22%20r%3D%223.389%22%20transform%3D%22translate(3.711)%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cg%20id%3D%22Elipse_196%22%20data-name%3D%22Elipse%20196%22%20class%3D%22cls-4%22%3E%0A%20%20%20%20%3Ccircle%20class%3D%22cls-5%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%2F%3E%0A%20%20%20%20%3Ccircle%20class%3D%22cls-6%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2211%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A)

[](data:image/svg+xml,%3Csvg%20id%3D%22Usuario_M_on%22%20data-name%3D%22Usuario%20M%20on%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20.cls-1%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20%23ef7750%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-1%2C%20.cls-4%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20%23000%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-2%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20%23fff%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-3%20%7B%0A%20%20%20%20%20%20%20%20clip-path%3A%20url(%23clip-path)%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-4%2C%20.cls-6%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-4%20%7B%0A%20%20%20%20%20%20%20%20stroke-width%3A%202px%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-5%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%3C%2Fstyle%3E%0A%20%20%20%20%3CclipPath%20id%3D%22clip-path%22%3E%0A%20%20%20%20%20%20%3Ccircle%20id%3D%22Elipse_195%22%20data-name%3D%22Elipse%20195%22%20class%3D%22cls-1%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%20transform%3D%22translate(0%200)%22%2F%3E%0A%20%20%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Ccircle%20id%3D%22Elipse_193%22%20data-name%3D%22Elipse%20193%22%20class%3D%22cls-2%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%2F%3E%0A%20%20%3Cg%20id%3D%22Grupo_351%22%20data-name%3D%22Grupo%20351%22%20class%3D%22cls-3%22%20transform%3D%22translate(0%200)%22%3E%0A%20%20%20%20%3Cg%20id%3D%22Grupo_350%22%20data-name%3D%22Grupo%20350%22%20transform%3D%22translate(4.9%204.443)%22%3E%0A%20%20%20%20%20%20%3Cpath%20id%3D%22Trazado_707%22%20data-name%3D%22Trazado%20707%22%20class%3D%22cls-4%22%20d%3D%22M56.381-204.709v-1.145a6.279%2C6.279%2C0%2C0%2C0-6.279-6.278H48.458a6.278%2C6.278%2C0%2C0%2C0-6.278%2C6.278v1.145%22%20transform%3D%22translate(-42.18%20221.895)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20id%3D%22Elipse_194%22%20data-name%3D%22Elipse%20194%22%20class%3D%22cls-4%22%20cx%3D%223.389%22%20cy%3D%223.389%22%20r%3D%223.389%22%20transform%3D%22translate(3.711)%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cg%20id%3D%22Elipse_196%22%20data-name%3D%22Elipse%20196%22%20class%3D%22cls-4%22%3E%0A%20%20%20%20%3Ccircle%20class%3D%22cls-5%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%2F%3E%0A%20%20%20%20%3Ccircle%20class%3D%22cls-6%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2211%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A)

[](data:image/svg+xml,%3Csvg%20id%3D%22Usuario_M_on%22%20data-name%3D%22Usuario%20M%20on%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20.cls-1%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20%23ef7750%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-1%2C%20.cls-4%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20%23000%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-2%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20%23fff%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-3%20%7B%0A%20%20%20%20%20%20%20%20clip-path%3A%20url(%23clip-path)%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-4%2C%20.cls-6%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-4%20%7B%0A%20%20%20%20%20%20%20%20stroke-width%3A%202px%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.cls-5%20%7B%0A%20%20%20%20%20%20%20%20stroke%3A%20none%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%3C%2Fstyle%3E%0A%20%20%20%20%3CclipPath%20id%3D%22clip-path%22%3E%0A%20%20%20%20%20%20%3Ccircle%20id%3D%22Elipse_195%22%20data-name%3D%22Elipse%20195%22%20class%3D%22cls-1%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%20transform%3D%22translate(0%200)%22%2F%3E%0A%20%20%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Ccircle%20id%3D%22Elipse_193%22%20data-name%3D%22Elipse%20193%22%20class%3D%22cls-2%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%2F%3E%0A%20%20%3Cg%20id%3D%22Grupo_351%22%20data-name%3D%22Grupo%20351%22%20class%3D%22cls-3%22%20transform%3D%22translate(0%200)%22%3E%0A%20%20%20%20%3Cg%20id%3D%22Grupo_350%22%20data-name%3D%22Grupo%20350%22%20transform%3D%22translate(4.9%204.443)%22%3E%0A%20%20%20%20%20%20%3Cpath%20id%3D%22Trazado_707%22%20data-name%3D%22Trazado%20707%22%20class%3D%22cls-4%22%20d%3D%22M56.381-204.709v-1.145a6.279%2C6.279%2C0%2C0%2C0-6.279-6.278H48.458a6.278%2C6.278%2C0%2C0%2C0-6.278%2C6.278v1.145%22%20transform%3D%22translate(-42.18%20221.895)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20id%3D%22Elipse_194%22%20data-name%3D%22Elipse%20194%22%20class%3D%22cls-4%22%20cx%3D%223.389%22%20cy%3D%223.389%22%20r%3D%223.389%22%20transform%3D%22translate(3.711)%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cg%20id%3D%22Elipse_196%22%20data-name%3D%22Elipse%20196%22%20class%3D%22cls-4%22%3E%0A%20%20%20%20%3Ccircle%20class%3D%22cls-5%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%2F%3E%0A%20%20%20%20%3Ccircle%20class%3D%22cls-6%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2211%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A)

# Comparte tu internet de bolsillo

## Bienvenida

Hola, soy Gabriel. Soy artista. Los aparatos digitales, su funcionamiento y la forma en la que los humanos interactuamos con ellos, me resultan interesantes. Me considero un cacharrero y te invito, si quieres, a que tú también lo seas.

Escribí la solución [Raspberry Pi: Una pequeña Internet de bolsillo](/raspberry-pi-una-pequena-internet-de-bolsillo-solutions-db) para que pudieras configurarla y, ahora, te acompaño para que puedas compartir la señal de tu dispositivo con otras personas o con otros dispositivos. 

## ¿Qué es compartir el internet de tu RasperryPi?

Tener un computador del tamaño de una tarjeta de crédito, poder conectarlo a Internet y, además, poder compartir esa conexión con los demás computadores que tienes para hacer SOLE, es ¡abrirle las puertas a la mayor biblioteca del mundo! 

Es convertir un espacio cualquiera en un Entorno de Aprendizaje Auto-Organizado donde abrirle las puertas a la creatividad de solucionar los retos, complejos o sencillos, de tu comunidad ¡INCREÍBLE! ¿No?

Para hacer SOLE sólo hay tres cosas fundamentales: personas, unos cuantos computadores con conexión a internet y Grandes Preguntas. 

## ¿Para qué sirve?

Con esta receta podrás convertir tu [**Raspberry Pi**](/raspberry-pi-conceptorio) en un [**Enrutador**](/modem-router-o-enrutador-modem-or-router-conceptorio) portátil, para que tu comunidad pueda conectarse de forma inalámbrica y acceder a la información allí alojada, y, si cuentas con una conexión a Internet cableada, podrás compartirla también.

## ¿Qué necesitas?

- Un [**Raspberry Pi**](/raspberry-pi-conceptorio)
- Un computador
- Conexión a Internet - puedes revisar la solución [¿Cómo saber qué tipo de señal de Internet tienes?](/como-saber-que-tipo-de-senal-de-internet-tienes-solutions-db) para asegurarte de qué tipo de conexión tienes, y si la tienes activa
- Mucha paciencia

## ¿Cómo hacerlo?

- **Momento 1: Conéctate a tu Pi**
    - Antes que nada, asegúrate de tener un [**Raspberry Pi**](/raspberry-pi-conceptorio) funcionando. Si necesitas ayuda para esto, revisa la receta [**Rasperry Pi: Una pequeña Internet de bolsillo](/raspberry-pi-una-pequena-internet-de-bolsillo-solutions-db)** donde te contamos cómo iniciar con este dispositivo.
    - Una vez tengas tu sistema andando, conéctate a tu Rasperry Pi por medio de un [**Terminal**](/terminal-o-consola-terminal-or-console-conceptorio) iniciando una conexión [**SSH**](https://sole-doc.tiddlyhost.com/#SSH).
    - Asegúrate de tener conexión a Internet para poder continuar con los siguientes pasos.
- **Momento 2: Actualiza el sistema de tu Raspberry Pi**
    
    ![Imagen](/assets/images/Antena 3 4G 3 4G Antenna 22b2bd68c5b68076a24ccc4e1d6ff4af/image-800w.webp)
    
    El primer paso, es realizar una actualización de todo el [sistema](../../Conceptorio 2602bd68c5b681c182aed46fccc7c4ea/Conceptorio 2602bd68c5b68191afe2e809f2a2154d/Sistema informático (SI)%20Information%20system%20(IS)%202602bd68c5b681e88757d51ee7d2fb0b.md), para asegurarnos que tenemos las últimas versiones de los programas que se ejecutan en nuestro Pi. 
    
    Para ello, basta con escribir en el terminal:
    
    ```
    sudo apt update && sudo apt upgrade
    ```
    
    El sistema nos avisará cuáles paquetes se deben actualizar. Para continuar con el proceso, debemos aceptar, escribiendo `y` y presionando la tecla `enter`
    
- **Momento 3: Instala el software necesario**
    
    ![Imagen](/assets/images/Conexión cable Ethernet Ethernet cable connection 22b2bd68c5b680fa90ceecc23bea76db/image 1-275w.webp)
    
    A continuación, debemos instalar dos programas en nuestro Pi:
    
    ```
    sudo apt install -y hostapd dnsmasq
    ```
    
    Este comando nos instalará [**hostapd**](/demonio-hostapd-hostapd-daemon-conceptorio) que es una utilidad que nos permite usar el wireless de nuestro Pi como punto de acceso inalámbrico y [**dnsmasq**](/redireccionador-dns-y-servidor-dhcp-ligero-dnsmasq-conceptorio) que nos permitirá configurar un servidor [**DNS**](/dns-sistema-de-nombres-de-dominio-dns-domain-name-system-conceptorio) y de [***DHCP***](/protocolo-dhcp-dhcp-protocol-conceptorio) para permitir que usuarios se conecten al [servidor](/servidor-server-conceptorio) y puedan tener las configuraciones necesarias de la red para acceder a ella.
    
- **Momento 4: Configura una IP estática**
    - **Deshabilitar la interfaz inalámbrica**
        
        ![Imagen](/assets/images/A pocket Wikipedia in your RaspberryPi 1a42bd68c5b680289571fc002238a69a/image 2-800w.webp)
        
        En este paso configuraremos una [dirección IP estática](/direccion-ip-ip-address-conceptorio) en la [interfaz inalámbrica](/interfaz-interface-conceptorio) de nuestro PI. Es importante que no estés conectado de manera inalámbrica al Pi, porque durante los pasos siguientes la comunicación inalámbrica estará suspendida. Así que, asegúrate de estar conectado por medio de un cable, o tener una pantalla y teclado conectado directamente al Pi para continuar.
        
        Las configuraciones de red en el Pi están siendo manejadas por el programa `dhpcd`, este se encarga de solicitar y asignar las direcciones IP necesarias para las interfaces de red disponibles. En este momento, tenemos que indicarle a este programa que ignore la interfaz inalámbrica. Para ello, hay que editar el archivo de configuración:
        
        ```
        sudo nano /etc/dhcpcd.conf
        ```
        
        … y al final de este, agregar esta línea:
        
        ```
        denyinterfaces wlan0
        ```
        
        Para salir y guardar los cambios presionamos `ctrl` + `x` seguido de `y` cuando nos pregunte.
        
    - **Asignar una IP estática**
        
        ![Imagen](/assets/images/A pocket Wikipedia in your RaspberryPi 1a42bd68c5b680289571fc002238a69a/image 3-800w.webp)
        
        Ahora debemos asignar a la [interfaz](/interfaz-interface-conceptorio) `wlan0` una [dirección IP estática](/direccion-ip-ip-address-conceptorio) en otro rango diferente al de nuestra red cableada. Vamos a editar el archivo:
        
        ```
        sudo nano /etc/network/interfaces
        ```
        
        No tengas miedo. Parece complejo, pero, si has llegado hasta aquí, ya falta poco para lograrlo. Agrega lo siguiente al final:
        
        ```
        allow-hotplug wlan0
        iface wlan0 inet static
            address 192.168.10.1
            netmask 255.255.255.0
            network 192.168.10.0
            broadcast 192.168.10.255
        ```
        
        Lo que estamos haciendo es configurar esta interfaz para tener la IP `192.168.10.1`
        
        Para salir y guardar los cambios, presionamos `ctrl` + `x` seguido de `y` cuando nos pregunte.
        
- **Momento 5: Configurar nuestro punto de acceso inalámbrico**
    
    ![Imagen](/assets/images/A pocket Wikipedia in your RaspberryPi 1a42bd68c5b680289571fc002238a69a/image 4-800w.webp)
    
    Es el momento de indicarle a **hostapd** como operar. Vamos a indicarle que emita el nombre de la red ([SSID](/identificador-ssid-ssid-identifier-conceptorio)) y que opere en un canal en específico. Estas configuraciones las pondremos en el archivo:
    
    ```
    sudo nano /etc/hostapd/hostapd.conf
    ```
    
    … en donde agregamos los siguientes datos:
    
    ```
    interface=wlan0
    driver=nl80211
    ssid=SOLEVOLTAJE
    hw_mode=g
    channel=11
    ieee80211n=1
    wmm_enabled=1
    ht_capab=[HT40][SHORT-GI-20][DSSS_CCK-40]
    macaddr_acl=0
    auth_algs=1
    ignore_broadcast_ssid=0
    wpa=2
    wpa_key_mgmt=WPA-PSK
    wpa_passphrase=LACONTRASENADEACCESO
    rsn_pairwise=CCMP
    ```
    
    Acá se pueden cambiar algunas cosas:
    
    - El nombre de la red: esto lo configuramos en la línea `ssid=` en nuestro ejemplo, la red se llamará **SOLEVOLTAJE**.
    - El canal: `channel=11` está diciendo que vamos a operar en el canal 11, pero podemos cambiarlo por el que mejor funcione en nuestro lugar.
    - La contraseña de acceso: por seguridad, es necesario que asignemos una clave para conectarse a la red. Esto lo hacemos asignándola en la línea `wpa_passphrase=LACONTRASENADEACCESO`.
    
    Ahora debemos informarle a **hostapd** donde se encuentra la configuración. Esto lo hacemos editando el archivo:
    
    ```
    sudo nano /etc/default/hostapd
    ```
    
    … y agregando en el la siguiente línea:
    
    ```
    DAEMON_CONF=
    ```
    
- **Momento 6: Iniciar los servicios**
    
    Antes de reiniciar nuestro Pi, debemos habilitar los servicios para que se ejecuten siempre que lo encendamos. 
    
    Para ello, escribe lo siguiente en el terminal:
    
    ```
    sudo systemctl unmask hostapd
    sudo systemctl enable hostapd
    sudo systemctl start hostapd
    
    sudo systemctl unmask dnsmasq
    sudo systemctl enable dnsmasq
    sudo systemctl start dnsmasq
    
    ```
    
    … y finalmente, reiniciamos el Pi para hacer nuestra primera prueba
    
    ```
    sudo reboot now
    ```
    
- **Momento 7: Haz una primera prueba**
    
    ![Imagen](/assets/images/A pocket Wikipedia in your RaspberryPi 1a42bd68c5b680289571fc002238a69a/image 5-800w.webp)
    
    Desde otro computador o teléfono, busca en las redes inalámbricas la red que acabamos de crear, en nuestro caso **SOLEVOLTAJE** y conéctate a ella.
    
    Si revisas las configuraciones de la red, deberías ver que la dirección IP asignada debe estar en el rango que seleccionamos en la configuración de **dnsmasq.** En nuestro caso, el dispositivo tiene asignada la IP `192.168.10.143`
    
    ![Imagen](/assets/images/A pocket Wikipedia in your RaspberryPi 1a42bd68c5b680289571fc002238a69a/image 6-800w.webp)
    
- **Momento 8: Ya puedes compartir la conexión cableada**
    
    
    ![Imagen](/assets/images/A pocket Wikipedia in your RaspberryPi 1a42bd68c5b680289571fc002238a69a/image 7-800w.webp)
    
    En este punto, quienes se conecten a nuestro punto de acceso podrán ver los archivos y servicios que tengamos configurados en nuestro Raspberry Pi. Si quieres compartir la conexión a Internet cableada por medio de la red inalámbrica continua con los siguientes pasos.
    
- **Momento 9: Reenviar el tráfico hacia la conexión cableada**
    
    ![Imagen](/assets/images/A pocket Wikipedia in your RaspberryPi 1a42bd68c5b680289571fc002238a69a/image 8-800w.webp)
    
    Es necesario que nuestro sistema reenvíe el tráfico de la interfaz inalámbrica hacia la cableada, para poder compartir la conexión. En este punto, tenemos que editar el archivo:
    
    ```
    sudo nano /etc/sysctl.conf
    ```
    
    En el contenido de este, buscamos la línea que dice `#net.ipv4.ip_forward=1` y eliminamos el `#` al principio para indicar que queremos activar esta directriz. Una vez hagamos esta modificación, guardamos el archivo y continuamos con el siguiente paso.
    
- **Momento 10: Finalmente, asegura el Firewall**
    
    ![Imagen](/assets/images/Bicigenerador 1a42bd68c5b6803fa23af3faa6d38340/image 9-800w.webp)
    
    Ya estamos en el último paso de la configuración. Acá tenemos que decirle al [Firewall](/cortafuegos-firewall-conceptorio) que permita el transito del tráfico de la red entre las interfaces inalámbricas y cableadas, para ello, entramos estos comandos en nuestro terminal:
    
    ```
    sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
    sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
    sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT
    ```
    
    En este punto, ¡ya deberíamos tener internet en nuestros [clientes](/cliente-client-conceptorio) inalámbricos! Sin embargo, hace falta que estos cambios no se pierdan cuando reiniciemos nuestro Pi. Para ello, vamos a guardar la configuración en un archivo de texto:
    
    ```
    sudo sh -c
    ```
    
- **Momento 11: Ahora, ¡con Internet!**
    
    ![Imagen](/assets/images/Bicigenerador 1a42bd68c5b6803fa23af3faa6d38340/image 10-800w.webp)
    
    Luego de este largo proceso, los [clientes](/cliente-client-conceptorio) conectados a nuestro Pi podrán tener acceso a la conexión de Internet compartida desde nuestro Raspberry Pi… ¡CONSEGUIDO!
    

¿Te enredaste en alguno de los pasos? Cuéntanos cómo completar esta solución para que sea más clara.

## ¿Cómo saber si esta solución funciona?

Con esta receta, puedes configurar un [**Enrutador**](/modem-router-o-enrutador-modem-or-router-conceptorio) portátil, que sirve para llevar contenidos en tu [**Raspberry Pi**](https://sole-doc.tiddlyhost.com/#Raspberry Pi) y compartirlos con la comunidad, sin necesidad de tener una conexión constante a Internet. 

Además, si tienes una conexión cableada, puedes compartirla para hacer que tus sesiones de SOLE sean más potentes.

## ¿Por qué podría funcionar esta solución?

Tener un [enrutador](/modem-router-o-enrutador-modem-or-router-conceptorio) portátil y de bajo consumo, nos permite llevar fácilmente nuestros contenidos a múltiples lugares donde la conexión a Internet no es constante. 

Sin embargo, el número de clientes que puede soportar nuestro Pi es bajo. Si vas a conectar a más de 10 personas al mismo tiempo, tal vez la velocidad de la conexión se ponga un poco lenta y, para solucionarlo, debes buscar un enrutador más potente. 

Si llegaste hasta acá, has aprendido un montón de cosas que puedes compartir con tu comunidad y, así, mejorar las condiciones de conectividad. Usar el Internet en grupo es una experiencia retadora, tanto en términos de tecnología, como en términos de comunidad. Hacer SOLE es una manera de usar el Internet en grupo para vivir mejor juntos. 

## Soluciones recomendadas

[Raspberry Pi: Una pequeña Internet de bolsillo](/raspberry-pi-una-pequena-internet-de-bolsillo-solutions-db) 

[¿Cómo saber qué tipo de señal de Internet tienes?](/como-saber-que-tipo-de-senal-de-internet-tienes-solutions-db) 

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