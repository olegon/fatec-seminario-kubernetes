# FATEC-SP - Seminário sobre Kubernetes

Esse repositório contém os slides, a aplicação e os comandos usados no seminário.

## Construindo a imagem

```bash
docker build -t olegon/node-app:v1 .
```

> Estou usando `olegon/` porque é o nome do meu usuário no Docker Hub. Troque pelo seu!

## Enviando a imagem para o Docker Hub

```bash
docker push olegon/node-app:v1
```

> É importante deixar a imagem pública!

## Minikube

### Criando um cluster

```bash
minikube start
```

### Obtendo informações do cluster

```bash
kubectl cluster-info
```

### Rodando a aplicação

```bash
kubectl run node-app-rc --image=olegon/node-app:v1 --port=5000 --generator=run/v1
```

### Expondo a aplicação

```bash
kubectl expose replicationcontroller node-app-rc --type=LoadBalancer --name=node-app-rc-lb
```

### Obtendo endereço da aplicação

```bash
minikube service node-app-rc-lb --url
```

### Usando ngrok para expor aplicação pra internet

```bash
ngrok http $(minikube service node-app-rc-lb --url | sed s/http:\\/\\///)
```

### Escalando a aplicação

```bash
kubectl scale replicationcontroller node-app-rc --replicas=3
```

## Google Cloud

### Criando um cluster

```bash
gcloud container clusters create fatec-demo --num-nodes 1 --machine-type f1-micro --region us-east1
```

### Rodando a aplicação

```bash
kubectl run node-app-rc --image=olegon/node-app:v1 --port=5000 --generator=run/v1
```

### Expondo a aplicação

```bash
kubectl expose replicationcontroller node-app-rc --type=LoadBalancer --name=node-app-rc-lb
```

### Escalando a aplicação

```bash
kubectl scale replicationcontroller node-app-rc --replicas=3
```

### Removendo o cluster ($$)

```bash
gcloud container clusters delete fatec-demo --zone us-east1
```
