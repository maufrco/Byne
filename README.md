# Byne

### Instalação

Execute o instalador do NPM

```
npm i
```

Crie um arquivo .env na pasta raiz com o conteudo abaixo

```
REACT_APP_PROTOCOL=ws://
REACT_APP_URL=127.0.0.1
REACT_APP_PORT=8080
```

crie o arquivo de build com o comando

```
npx brunch build -p
```

```
serve -s build
```
