git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"
rm -r -f ~/.ssh
mkdir ~/.ssh
echo -e $SSH_KEY > ~/.ssh/id_rsa
echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config # Disable strict host checking for git clone
chmod 600 ~/.ssh/id_rsa
chmod 600 ~/.ssh
git clone git@git.coding.net:codefalling/melpa-mirror.git packages
npm install
node index.js
cd packages
git add .
git commit -m "update"
git push origin master:master --quiet

