FROM kasmweb/ubuntu-jammy-desktop:1.18.0

USER root

ENV DEBIAN_FRONTEND=noninteractive \
    HOME=/home/kasm-user \
    HERMES_HOME=/home/kasm-user/.hermes \
    HERMES_INSTALL_DIR=/home/kasm-user/.hermes/hermes-agent \
    PATH=/home/kasm-user/.local/bin:/home/kasm-user/.hermes/hermes-agent/.venv/bin:$PATH

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    bash \
    unzip \
    xdg-utils \
    build-essential \
    pkg-config \
    libssl-dev \
    libffi-dev \
    python3 \
    python3-venv \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

COPY startup/hermes-first-run.sh /usr/local/bin/hermes-first-run.sh
COPY startup/hermes-desktop-launcher.sh /usr/local/bin/hermes-desktop-launcher.sh
COPY assets/hermes-agent.desktop /usr/share/applications/hermes-agent.desktop

RUN chmod +x /usr/local/bin/hermes-first-run.sh /usr/local/bin/hermes-desktop-launcher.sh \
    && mkdir -p /home/kasm-user/Desktop /home/kasm-user/.config/hermes-agent /home/kasm-user/.hermes \
    && cp /usr/share/applications/hermes-agent.desktop /home/kasm-user/Desktop/hermes-agent.desktop \
    && chown -R 1000:1000 /home/kasm-user \
    && chmod +x /home/kasm-user/Desktop/hermes-agent.desktop

USER 1000
WORKDIR /home/kasm-user

RUN curl -LsSf https://astral.sh/uv/install.sh | sh

RUN git clone https://github.com/NousResearch/hermes-agent.git "$HERMES_INSTALL_DIR"

WORKDIR /home/kasm-user/.hermes/hermes-agent

RUN /home/kasm-user/.local/bin/uv venv .venv --python 3.11 \
    && /home/kasm-user/.local/bin/uv pip install -e .[cli]

WORKDIR /home/kasm-user

# First-pass prototype build recipe:
# - installs Hermes from source in a local venv
# - keeps the image desktop-first
# - expects runtime config/state to live under ~/.hermes
#
# If browser-tool support is needed by default later, Node.js can be added in a follow-up revision.
