# Manuel d'installation — VM VirtualBox (Ubuntu)

1) Créer la VM
- Télécharger Ubuntu Server/desktop ISO.
- VirtualBox → Nouvelle VM : 2 CPU, 4GB RAM, 20+ GB disque.

2) Installer Docker

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmour -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker $USER
```

3) (Optionnel) Installer docker-compose v1 (si vous utilisez `docker-compose` binaire) :

```bash
sudo apt install -y docker-compose
```

4) Cloner le repo dans la VM

```bash
git clone <votre-repo> TP08_Final_TP
cd TP08_Final_TP
```

5) Lancer la stack

```bash
docker compose up -d --build
```

Remarques :
- Assurez-vous que le Runner GitLab (si local) a la capacité de lancer docker-compose (Docker-in-Docker ou shell runner).
- Ouvrir les ports 80/8080/3000/3001/9090/9000 dans le pare-feu si accès externe nécessaire.
