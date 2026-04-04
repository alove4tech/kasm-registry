FROM kasmweb/ubuntu-jammy-desktop:1.18.0

USER root

ENV DEBIAN_FRONTEND=noninteractive \
    HOME=/home/kasm-user

RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium-browser \
    ca-certificates \
    bash \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

COPY startup/discord-app-launcher.sh /usr/local/bin/discord-app-launcher.sh
COPY assets/discord.desktop /usr/share/applications/discord.desktop

RUN chmod +x /usr/local/bin/discord-app-launcher.sh \
    && mkdir -p /home/kasm-user/Desktop \
    && cp /usr/share/applications/discord.desktop /home/kasm-user/Desktop/discord.desktop \
    && chown -R 1000:1000 /home/kasm-user \
    && chmod +x /home/kasm-user/Desktop/discord.desktop

USER 1000
WORKDIR /home/kasm-user

# Prototype build recipe:
# - uses ARM64 Ubuntu Kasm desktop as the base
# - launches Discord in browser app mode
# - intended for validation and later refinement
