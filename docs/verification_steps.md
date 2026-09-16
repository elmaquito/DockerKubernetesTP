# Verification Steps and Evidence Checklist

Place all evidence files under `evidences/` in the TP08 folder (create the dir if needed).

1) Start stack

Commands:

```bash
cd part6_exercises/TP08_Final_TP
docker compose up -d --build
```

Evidence:
- `evidences/01_stack_up.txt` — output of `docker compose ps`.

2) Backend health

Commands:

```bash
curl -sS http://localhost:3000/ > evidences/02_backend_root.json
curl -sS http://localhost:3000/todos > evidences/03_todos_before.json
```

Expected:
- `02_backend_root.json` contains JSON with status/version.
- `03_todos_before.json` is a JSON array or object with existing todos.

3) Add a todo (persistence proof)

Commands:

```bash
curl -sS -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"text":"preuve_persist"}' > evidences/04_post_todo.json
curl -sS http://localhost:3000/todos > evidences/05_todos_after.json
```

Expected:
- `05_todos_after.json` contains the new `preuve_persist` item.

4) Persist DB restart test

Commands:

```bash
docker compose restart db
sleep 5
curl -sS http://localhost:3000/todos > evidences/06_todos_after_db_restart.json
```

Expected:
- `06_todos_after_db_restart.json` still contains `preuve_persist`.

5) Prometheus target check

Commands:

```bash
curl -sS http://localhost:9090/api/v1/targets | jq . > evidences/07_prom_targets.json
```

Expected:
- `07_prom_targets.json` shows `backend:3000` with `health: "up"`.

6) Grafana dashboard provisioning check

Commands (after Grafana restart/provision):

```bash
curl -sS -u admin:admin "http://localhost:3001/api/search?query=tp08" | jq . > evidences/08_grafana_search.json || true
```

Expected:
- `08_grafana_search.json` contains an entry for the provisioned `tp08` dashboard.

Fallback (if API auth fails):

```bash
# Save the provisioning dashboard file from the repo as evidence
cp grafana/provisioning/dashboards/tp08-dashboard.json evidences/08_grafana_dashboard_file.json

# Save recent Grafana logs showing provisioning finished
docker compose logs --no-color grafana --tail 200 > evidences/08_grafana_logs.txt
```

Expected fallback:
- `08_grafana_dashboard_file.json` contains the dashboard JSON you provisioned.
- `08_grafana_logs.txt` contains lines like "finished to provision dashboards" proving Grafana applied provisioning files.

7) Portainer check

Commands:

```bash
curl -sS http://localhost:9000/api/status || echo "Portainer may require auth" > evidences/09_portainer_status.txt
docker compose ps | grep portainer > evidences/10_portainer_ps.txt
```

8) Collect screenshots (optional)

- `evidences/11_frontend_add_todo.png` — add a todo via the UI and screenshot the page.
- `evidences/12_prometheus_targets.png` — screenshot of Prometheus targets page.
- `evidences/13_grafana_dashboard.png` — screenshot of the TP08 dashboard in Grafana.

Notes:
- If Grafana uses a different admin password, replace `admin:admin` or follow the operations manual to reconfigure/reset the password.
- If any command fails, capture the terminal output to `evidences/` and include logs from `docker compose logs service > evidences/`.
