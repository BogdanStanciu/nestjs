.DEFAULT_GOAL := help

# prende i parametri e li converte
RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
$(eval $(RUN_ARGS):;@:)

##help: @ Mostra tutti i comandi di questo makefile
help:
	@fgrep -h "##" $(MAKEFILE_LIST)| sort | fgrep -v fgrep | tr -d '##'  | awk 'BEGIN {FS = ":.*?@ "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

##start: @ Avvia il backend esposto sulla porta scelta
start: 
	docker-compose up -d

##stop: @ Ferma l'applicazione
stop: 
	docker-compose down

##build: @ Esegue la build delle immagini
build:
	docker-compose build

##restart: @ Fa ripartire l'applicazione
restart: stop start
