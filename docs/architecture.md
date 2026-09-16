# Architecture technique

Composants :
- Frontend : Nginx sert une page HTML/JS qui consomme l'API backend.
- Backend : Node.js/Express exposant une API REST simple `GET/POST /todos`.
- Base de données : PostgreSQL (volume persistant `TP08_db_data`).
- Monitoring : Prometheus scrappe les métriques du backend ; Grafana affiche dashboards.
- Portainer : gestion centralisée des conteneurs via UI.

Réseau : tous les services sont sur un réseau docker-compose privé `tp08_net`. Les ports exposés vers l'hôte sont : 8080 (frontend), 3000 (backend, optionnel), 9090 (Prometheus), 3001 (Grafana), 9000 (Portainer).

Persistance : volume docker `db_data` monté sur `/var/lib/postgresql/data`.

CI/CD : GitLab Runner configure pour builder les images et exécuter `docker compose up -d` sur l'hôte de déploiement.
