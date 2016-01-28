echo update apt-get
apt-get update

echo add rabbitmq source to apt-get sources list - backup and write over
cp /etc/apt/sources.list /etc/apt/sources.list.backup
cp /vagrant/sources.list /etc/apt/sources.list

echo  add rabbitmq public key to trusted key list
wget https://www.rabbitmq.com/rabbitmq-signing-key-public.asc
sudo apt-key add rabbitmq-signing-key-public.asc

echo  install rabbitmq
sudo apt-get --assume-yes install rabbitmq-server