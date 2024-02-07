#!/usr/bin/env bash

# update npm
npm install -g npm@latest

# update pip
pip install --upgrade pip

# setup JS/TS kernel
npm install -g tslab
tslab install

# setup Python kernel
pip install ipykernel --user

# setup Rust kernel
cargo install evcxr_jupyter
evcxr_jupyter --install

# install dependencies
# TODO: use a requirements.txt for this
pip install langchain[llms]
pip install openai

# install prerequisites for tauri
DEBIAN_FRONTEND=noninteractive sudo apt update -y
DEBIAN_FRONTEND=noninteractive sudo apt install -y --fix-missing \
    libwebkit2gtk-4.1-dev \
    build-essential \
    curl \
    wget \
    file \
    libssl-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev