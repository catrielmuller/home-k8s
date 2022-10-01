# home-k8s

HomeLab Kubernetes Pulumi

## Untaint Master Nodes

```bash
kubectl taint node --all node-role.kubernetes.io/master:NoSchedule-
```

## Create Kubernetes Token

```bash
TOKEN=$(kubectl -n kube-system describe secret default| awk '$1=="token:"{print $2}')
kubectl config set-credentials kubernetes-admin --token="${TOKEN}"
```
