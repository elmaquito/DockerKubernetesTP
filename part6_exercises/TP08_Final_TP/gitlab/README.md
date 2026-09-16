# GitLab CE (demo) scaffold

This folder provides a minimal example to run GitLab CE for demonstration purposes only. GitLab Omnibus is resource-heavy (recommend 4+ GB RAM).

Key points:
- Use this on a dedicated VM or host with enough RAM/CPU.
- The example `docker-compose.yml` below is a starting point for local testing.
- For production use the official GitLab Helm chart or a dedicated VM.

Quick start (from this folder):

```bash
docker compose up -d
# Wait several minutes for GitLab to initialize
```

Default web UI: http://localhost:8929 (modify ports if needed)

Runner:
- Use GitLab Runner with Docker executor. See the `docker-compose.yml` comments for runner setup guidance.
