all: install

install:
	sudo cp -r * /srv/http/
	sudo chown -R http:http /srv/http/
