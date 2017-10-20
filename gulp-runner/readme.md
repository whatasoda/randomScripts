build: `docker build -t ubuntu:gulp-runner .`
run: `docker run --rm -it -p 8000:80 -v [gulpfile.js|package.json:/root/option] $srcdir:/root/src $distdir:/root/dist ubuntu:gulp-runner`
