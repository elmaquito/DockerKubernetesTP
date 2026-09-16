Debian 13.7.0 deployment notes

Prerequisites on the Debian VM:
- Docker Engine (recommended: official install from Docker docs)
- Docker Compose plugin (use `docker compose`)
- Ensure ports below are allowed and forwarded from VirtualBox host to guest if needed.

Deploy:

```bash
cd /path/to/TP08_Final_TP
# Optional: validate the compose file
docker compose -f docker-compose.debian.yml config
# Start the full stack
docker compose -f docker-compose.debian.yml up -d
# Check services
docker compose -f docker-compose.debian.yml ps
``` 

Common verification:

- GitLab web UI: http://<vm-ip>:8929
- Grafana web UI: http://<vm-ip>:3001 (default admin/admin)
- Prometheus: http://<vm-ip>:9090
- Portainer: http://<vm-ip>:9000

Notes for VirtualBox:
- Forward host ports to guest (VM) if you want to access services via host `localhost`.
  Example forwardings: 8929, 3001, 9090, 9000, 8080, 3000, 5432
- Increase VM resources: at least 4GB RAM (GitLab needs memory), 2+ CPUs recommended.

Running tests from host (optional):
- To run the `backend` tests on the host machine, set `DB_HOST=localhost` so tests connect to the host-mapped Postgres port:

PowerShell:

```powershell
cd backend
$env:DB_HOST='localhost'
npm install --no-audit --no-fund
npm test
```

Troubleshooting:
- If `docker compose` warns about a `version` key, remove it (compose spec no longer needs it). The repository's `docker-compose.debian.yml` is versionless.
- If GitLab takes long to start, wait several minutes; check logs with `docker compose -f docker-compose.debian.yml logs gitlab --tail 200`.
