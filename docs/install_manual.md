# Manuel d'installation — VM VirtualBox (Debian / Ubuntu)

1) Créer la VM
- Télécharger une image Debian 13 (Trixie) ou Ubuntu Server/desktop ISO.
- VirtualBox → Nouvelle VM : 2 CPU, 4GB RAM, 20+ GB disque.

2) Installer Docker (méthode recommandée — script officiel)

Le moyen le plus simple et compatible avec Debian/Ubuntu est le script officiel `get.docker.com` :

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

Remarques :
- Déconnectez-vous puis reconnectez-vous (ou redémarrez la VM) pour que l'appartenance au groupe `docker` soit effective.
- Le script installe `docker-ce`, `docker-ce-cli`, `containerd` et la `docker compose` plugin automatiquement.

3) Remédiation si vous avez déjà ajouté le dépôt `download.docker.com/linux/ubuntu` et que `apt` renvoie "no Release file"

Si vous avez suivi la méthode Ubuntu mais exécutez Debian (codename `trixie`), l'entrée de dépôt pointe vers un chemin Ubuntu inexistant — ce qui provoque les erreurs observées. Supprimez/renommez le fichier de dépôt puis utilisez le script :

```bash
sudo rm -f /etc/apt/sources.list.d/docker.list
sudo apt update
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

4) (Optionnel) Méthode manuelle pour Debian (si vous préférez gérer le dépôt vous-même)

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmour -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker $USER
```

5) Cloner le repo dans la VM

```bash
git clone <votre-repo> TP08_Final_TP
cd TP08_Final_TP
```

6) Lancer la stack

```bash
docker compose up -d --build
```

Remarques :
- Si `usermod: le groupe docker n'existe pas` apparaît encore, cela signifie que l'installation Docker n'a pas créé le groupe — ré-exécutez l'installation via le script ou créez manuellement le groupe : `sudo groupadd docker` puis `sudo usermod -aG docker $USER`.
- Ouvrir les ports 80/8080/3000/3001/9090/9000 dans le pare-feu si accès externe nécessaire.

