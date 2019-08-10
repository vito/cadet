ELM_FILES = $(shell find src/ -type f -name '*.elm' -or -name '*.js')
LESS_FILES = $(shell find css/ -type f -name '*.less')

all: worker.js public/elm.js public/main.css elm-stuff

.PHONY: clean

clean:
	rm -f public/elm.js public/elm.min.js public/main.css bindata.go

worker.js: $(ELM_FILES)
	yarn run elm make --output $@ src/Worker.elm

public/elm.js: $(ELM_FILES)
	yarn run elm make --output $@ src/Main.elm

public/main.css: $(LESS_FILES)
	yarn run lessc --autoprefix='last 2 Chrome versions, last 2 Firefox versions' --clean-css="--advanced" css/main.less $@
