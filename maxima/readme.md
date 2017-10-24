build: `docker build -t fedora:maxima .`

run: `docker run --rm -v ${pwd}/maxima:/root/workdir --security-opt seccomp=unconfined fedora:maxima`



options:
    -b <file>, --batch=<file>
        Process maxima file <file> in batch mode.
    --batch-lisp=<file>
        Process lisp file <file> in batch mode.
    --batch-string=<string>
        Process maxima command(s) <string> in batch mode.
    -d, --directories
        Display maxima internal directory information.
    --disable-readline
        Disable readline support.
    -g, --enable-lisp-debugger        Enable underlying lisp debugger.
    -h, --help
        Display this usage message.
    --userdir=<directory>
        Use  <directory> for user directory (default is $HOME/maxima for Windows, and $HOME/.maxima for others)
    --init=<file>
        Set the name of the Maxima & Lisp initialization files to <file>.mac & <file>.lisp (default is maxima-init)
    --init-mac=<file>
        Set the name of the Maxima initialization file (default is maxima-init.mac)
    --init-lisp=<file>
        Set the name of the Lisp initialization file (default is maxima-init.lisp)
    -l <lisp>, --lisp=<lisp>
        Use lisp implementation <lisp>.
    --list-avail
        List the installed version/lisp combinations.
    -p <lisp-file>, --preload-lisp=<lisp-file>
        Preload <lisp-file>.
    -q, --quiet
        Suppress Maxima start-up message.
    -r <string>, --run-string=<string>
        Process maxima command(s) <string> in interactive mode.
    -s <port>, --server=<port>        Connect Maxima to server on <port>.
    -u <version>, --use-version=<version>
        Use maxima version <version>.
    -v, --verbose
        Display lisp invocation in maxima wrapper script.
    --version
        Display the default installed version.
    --very-quiet
        Suppress expression labels and Maxima start-up message.
    -X <Lisp options>, --lisp-options=<Lisp options>
        Options to be given to the underlying Lisp
