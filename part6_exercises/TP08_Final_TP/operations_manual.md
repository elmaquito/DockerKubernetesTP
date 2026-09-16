# Manuel d'exploitation

Commandes utiles (dans `TP08_Final_TP` sur la VM) :

- Démarrer la stack : `docker compose up -d --build`
- Arrêter : `docker compose down`
- Voir logs d'un service : `docker compose logs -f backend`
- Lister conteneurs : `docker ps -a`
- Accéder à une shell d'un conteneur : `docker compose exec backend sh`

Vérifications :
- Test API : `curl http://localhost:3000/todos`
- Test frontend : ouvrir `http://192.168.56.1:8080` et ajouter une todo.
- Vérifier la persistance : `docker volume ls` et `docker volume inspect TP08_db_data`.

Supervision :
- Prometheus : `http://192.168.56.1:9090` → vérifier targets (backend).
- Grafana : `http://192.168.56.1:3001` → dashboard préconfiguré.

Gestion via Portainer :
- Ouvrir `http://192.168.56.1:9000`, connecter au socket Docker et gérer la stack (start/stop, visualiser logs, exec).

### Portainer Troubleshooting

Si Portainer n'affiche pas tous les conteneurs ou ne se connecte pas correctement :

```bash
# Vérifier que le socket est monté et accessible
ls -la /var/run/docker.sock

# Vérifier que le conteneur Portainer est en cours
docker compose ps | grep portainer

# Consulter les logs de Portainer
docker logs $(docker compose ps -q portainer)

# Redémarrer Portainer
docker compose restart portainer

# Si Portainer est configuré avec un Agent, lancer l'agent sur l'hôte cible
docker run --rm -d -p 9001:9001 --name portainer_agent -v /var/run/docker.sock:/var/run/docker.sock portainer/agent
```

Vérifiez aussi les permissions du socket Docker et ajoutez l'utilisateur au groupe `docker` si nécessaire :

```bash
sudo usermod -aG docker $USER
newgrp docker
```

Sauvegarde et restauration de la DB PostgreSQL :

```bash
docker compose exec db pg_dump -U postgres todos > todos_dump.sql
# restauration
cat todos_dump.sql | docker compose exec -T db psql -U postgres -d todos

### Réinitialiser Grafana (pré-provision forcé)

ATTENTION: Cette opération supprime les dashboards et données Grafana existants stockés dans le volume `grafana_data`.

Étapes sûres:

```bash
# Arrêter Grafana
docker compose stop grafana

# (Optionnel) Sauvegarder le contenu du volume grafana_data dans un tar dans le répertoire courant
docker run --rm -v grafana_data:/data -v "$PWD":/backup alpine sh -c "cd /data && tar czf /backup/grafana_data_backup.tar.gz ."

# Supprimer le volume Grafana
docker volume rm TP08_Final_TP_grafana_data || docker volume rm grafana_data

# Redémarrer Grafana (appliquera la pré-provision contenue dans ./grafana/provisioning)
docker compose up -d grafana

# Vérifier la présence du dashboard provisionné via l'API (par défaut admin:admin)
curl -sS -u admin:admin "http://localhost:3001/api/search?query=tp08" | jq .
```

Si Grafana est configuré avec un mot de passe admin différent et que vous ne souhaitez pas effacer les données, voir la section sur l'import manuel du dashboard dans le guide principal.

```
