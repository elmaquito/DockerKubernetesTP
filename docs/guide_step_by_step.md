# Guide pas-à-pas — Déploiement sur VM Linux (VirtualBox)

Pré-requis : une VM Linux (Ubuntu 22.04+ recommandé) avec Docker, Docker Compose, et accès réseau.

Étapes rapides :

1. Préparer la VM
   - Créer une VM Linux dans VirtualBox (2 CPU, 4GB RAM, 20GB disk).
   - Mettre à jour le système.
2. Installer Docker et Docker Compose (voir `install_manual.md`).
3. Copier le dossier `TP08_Final_TP` sur la VM (git clone ou SCP).
4. Configurer les variables si nécessaire (fichier `.env` optionnel).
5. Démarrer la stack :

```bash
cd TP08_Final_TP
docker compose up -d --build
```

Note: le frontend est désormais servi par Nginx qui proxifie `/api` vers le backend. Utilisez `http://VM_IP:8080` pour l'UI sans CORS.

Postgres est mappé sur le port `5432` de la VM pour faciliter l'inspection (psql depuis l'hôte).

6. Vérifier les services :
   - Frontend : http://192.168.56.1:8080
   - Backend API : http://192.168.56.1:3000
   - PostgreSQL : accessible depuis le conteneur `db` (port interne 5432)
   - Prometheus : http://192.168.56.1:9090
   - Grafana : http://192.168.56.1:3001 (admin/ismalab31!)
   - Portainer : http://192.168.56.1:9000

7. Tester la persistance : créer une todo via le frontend puis redémarrer le conteneur `db` et vérifier qu'elle est toujours présente.

8. CI/CD : pousser le dépôt sur GitLab, configurer un Runner capable d'exécuter docker-compose, et activer la pipeline (.gitlab-ci.yml fourni).
