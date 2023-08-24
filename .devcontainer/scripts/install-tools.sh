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
pip install pydantic