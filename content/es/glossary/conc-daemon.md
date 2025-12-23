---
title: "Demonio (servicio o programa) | Daemon (service or program)"
date: 2025-07-22
tags:
  - "Funcionamiento del computador"
  - "Términos del mundo virtual"
autor: "Belén"
draft: false
---
Un **servicio**, **programa residente** o **demonio** (en inglés, *daemon*) es un tipo especial de programa que se ejecuta en segundo plano, en vez de ser controlado directamente por el usuario. Este tipo de programas continúa en el sistema, es decir, que puede ejecutarse de forma persistente o reiniciarse si se intenta «matar» el proceso dependiendo de la configuración del demonio y de las políticas del sistema. El uso de este nombre viene del retroacrónimo *Daemon* (*Disk And Execution Monitor*).

Los Daemon o demonios suelen tener las siguientes características:

- No disponen de una «interfaz» directa con el usuario, ni gráfica, ni textual.
- No hacen uso de las entradas y salidas estándar para comunicar errores o registrar su funcionamiento, sino que usan archivos del sistema en zonas especiales (`/var/log/` en los [UNIX](https://es.wikipedia.org/wiki/UNIX) más modernos) o utilizan otros demonios especializados en dicho registro como el [`syslogd`](https://es.wikipedia.org/wiki/Syslogd).

Por ejemplo, una máquina que alberga un [servidor web](https://es.wikipedia.org/wiki/Servidor_web) utilizará un demonio [`HTTP`](https://es.wikipedia.org/wiki/Protocolo_de_transferencia_de_hipertexto) para ofrecer el servicio y que los visitantes a dicha [web](https://es.wikipedia.org/wiki/Página_web) puedan acceder. Otro ejemplo son los demonios «cronológicos» como [`cron`](https://es.wikipedia.org/wiki/Cron_(unix)), que realizan tareas programadas como mantenimiento del [sistema](https://es.wikipedia.org/wiki/Sistema_operativo) en segundo plano.

