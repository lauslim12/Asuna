# Makefile to run helper scripts.
.PHONY: bootstrap clean install-all

# Bootstrap application.
bootstrap: install-all
	cp api/.env.development api/.env
	cp web/.env.development web/.env
	cd api && yarn migrate

# Clean script.
clean:
	cd api && rm -rf node_modules
	cd web && rm -rf node_modules && rm -rf .next

# Install scripts.
install-all:
	cd web && yarn --frozen-lockfile
	cd api && yarn --frozen-lockfile
