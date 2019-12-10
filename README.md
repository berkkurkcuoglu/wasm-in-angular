WASM Compiler Prerequisites:

    - Ubuntu 16.04 LTS or equivalent (Windows Subsystem for Linux works too)
    - Install python 2.7
        sudo apt update
        sudo apt upgrade
        sudo apt install python2.7 python-pip
    - Git
    - CMake(https://cmake.org/download/)
    - gcc(https://askubuntu.com/questions/154402/install-gcc-on-ubuntu-12-04-lts)
    - emsdk
        git clone https://github.com/emscripten-core/emsdk.git
        cd emsdk
        ./emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
        ./emsdk activate --build=Release sdk-incoming-64bit binaryen-master-64bit
        source ./emsdk_env.sh --build=Release

Once you have emcc installed:

    - Create fibonacci.c:
        #include <emscripten.h>

        int EMSCRIPTEN_KEEPALIVE fibonacci(int n)
        {
            if (n == 0 || n == 1)
                return n;
            else
                return (fibonacci(n - 1) + fibonacci(n - 2));
        }

    - Compile to WASM
        emcc wasm/fibonacci.c -Os -s WASM=1 -s MODULARIZE=1 -o wasm/fibonacci.js

    - Copy compilation output a folder called wasm or similar under your Angular app's 'src' folder.