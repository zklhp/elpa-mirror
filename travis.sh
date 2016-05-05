git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"
echo -e $SSH_KEY > ~/.ssh/id_rsa

echo "Host git.oschina.net" >> ~/.ssh/config
echo "   Hostname git.oschina.net" >> ~/.ssh/config
echo "   StrictHostKeyChecking no" >> ~/.ssh/config
echo "   CheckHostIP no" >> ~/.ssh/config
echo "   UserKnownHostsFile=/dev/null" >> ~/.ssh/config

chmod 600 ~/.ssh/id_rsa
# chmod 600 ~/.ssh

# cat ~/.ssh/config
git clone git@git.oschina.net:EmacsChina/elpa.git packages
npm install
node index.js
cd packages
git add .
git commit -m "update"

git push origin master:master

