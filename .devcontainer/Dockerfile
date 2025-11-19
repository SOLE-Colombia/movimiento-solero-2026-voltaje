# Usamos Node 22 como base (versión LTS reciente)
FROM node:22

# Argumentos para crear el usuario SOLE
ARG USERNAME=sole
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# 1. Configuración de usuario y herramientas básicas
# FIX: Eliminamos el usuario 'node' (UID 1000) que viene por defecto para evitar conflictos
RUN if id -u node > /dev/null 2>&1; then userdel -f node; fi && \
    if getent group node > /dev/null 2>&1; then groupdel node; fi && \
    groupadd --gid $USER_GID $USERNAME && \
    useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME && \
    apt-get update && \
    apt-get install -y \
    git \
    curl \
    wget \
    zsh \
    python3 \
    python3-pip \
    python3-venv \
    && rm -rf /var/lib/apt/lists/*

# 2. Configuración de Zsh (Powerlevel10k y plugins)
USER $USERNAME
ENV SHELL /bin/zsh

RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.2.1/zsh-in-docker.sh)" -- \
    -p git \
    -p ssh-agent \
    -p 'history-substring-search' \
    -a 'bindkey "\$terminfo[kcuu1]" history-substring-search-up' \
    -a 'bindkey "\$terminfo[kcud1]" history-substring-search-down'

# 3. Directorio de trabajo
WORKDIR /workspace
CMD ["sleep", "infinity"]