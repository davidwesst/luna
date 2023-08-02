#!/usr/bin/env bash

# update pip
pip install --upgrade pip

# setup Python kernel
pip install ipykernel --user

# setup Rust kernel
cargo install evcxr_jupyter
evcxr_jupyter --install