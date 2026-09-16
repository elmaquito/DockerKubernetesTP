TP08 Final — Déploiement Full Stack avec Docker Compose et CI/CD

Ce dossier contient le TP final : guide, manuels, architecture, et un scaffold d'une stack complète (frontend, backend, PostgreSQL) avec Prometheus, Grafana et Portainer. Les instructions ciblent une VM Linux sous VirtualBox.

Contenu :
- `guide_step_by_step.md` : guide pas-à-pas pour monter l'infra.
- `install_manual.md` : manuel d'installation détaillé pour la VM et dépendances.
- `operations_manual.md` : manuel d'exploitation et vérifications.
- `architecture.md` : document d'architecture technique.
- `docker-compose.yml` : composition de la stack (app + monitoring + portainer).
- `backend/` : API Node.js minimale (ToDo) et Dockerfile.
- `frontend/` : page statique servie par Nginx.
- `prometheus/` et `grafana/` : configs de base.
- `.gitlab-ci.yml` : pipeline CI/CD d'exemple.

Suivre `guide_step_by_step.md` pour déployer sur la VM VirtualBox.
