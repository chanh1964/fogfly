#!/bin/sh
#FOGFLY DEPLOYMENT
#CONFIGURATION SCRIPT
#Version 1.0
#=========================================
#START SCRIPT
#=========================================
#Color Const
C='\033[1;36m'
NC='\033[0m'
#=========================================
#Operating System Detection
OS=`uname -s`
#=========================================
#Distribution Detection
if [ "${OS}" = "Linux" ] ; then
	#Red-Hat Distribution
	if [ -f /etc/redhat-release ] ; then
		DIST="[INSTALLATION CENTOS]"
		echo ${DIST}
		#-mongodb--
		echo "[MongoDB]"
		printf '[mongodb-org-3.6]\nname=MongoDB Repository\nbaseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.6/x86_64\ngpgcheck=1\nenabled=1\ngpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc' > /etc/yum.repos.d/mongodb-org-3.6.repo
		yum -y install mongodb-org
		mkdir -p /data/db
		echo "[MongoDB-Version]"
		mongod --version
		#----------
		#--nodejs--
		echo "[NodeJS]"
		curl --silent --location https://rpm.nodesource.com/setup_10.x | bash -
		yum -y install nodejs
		#----------
		#----npm---
		echo "[NPM-Version]"
		npm --version
		#----------
		echo "[INSTALLATION DONE]"
	#OpenSUSE Distribution
	elif [ -f /etc/SuSE-release ] ; then
		DIST="[INSTALLATION SUSE]"
		echo ${DIST}
		echo "[MongoDB]"
		#-mongodb--
		rpm --import https://www.mongodb.org/static/pgp/server-3.6.asc
		zypper addrepo --gpgcheck "https://repo.mongodb.org/zypper/suse/12/mongodb-org/3.6/x86_64/" mongodb
		zypper -y -n install mongodb-org
		mkdir -p /data/db
		echo "[MondoDB-Version]"
		mongod --version
		#----------
		#--nodejs--
		echo "[NodeJS]"
		zypper -y install nodejs6
		echo "$[NodeJS-Version]"
		node --version
		#----------
		#----npm---
		echo "[NPM-Version]"
		npm --version
		#----------
		echo "[INSTALLATION DONE]"
	#Debian Distribution
	elif [ -f /etc/debian_version ] ; then
		DIST="${C}[INSTALLATION DEBIAN]${NC}"
		echo ${DIST}
		echo "${C}[MongoDB]${NC}"
		#-mongodb--
		apt-get update && apt-get install -y mongodb-server
		mkdir -p /data/db
		echo "${C}[MondoDB-Version]${NC}"
		mongod --version
		#----------
		#--nodejs--
		echo "${C}[NodeJS]${NC}"
		curl -sL https://deb.nodesource.com/setup_10.x | bash -
		apt-get install -y nodejs
		echo "${C}[NodeJS-Version]${NC}"
		node --version
		#----------
		#----npm---
		echo "${C}[NPM-Version]${NC}"
		npm --version
		#----------
		echo "${C}[INSTALLATION DONE]${NC}"
	#Ubuntu Distribution
	elif [ -f /etc/lsb-release ] ; then
		DIST="${C}[INSTALLATION UBUNTU]${NC}"
		echo ${DIST}
		echo "${C}[MongoDB]${NC}"
		#-mongodb--
		apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
		bash -c 'echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" > /etc/apt/sources.list.d/mongodb-org-3.2.list'
		apt-get update && apt-get install -y mongodb-org
		mkdir -p /data/db
		echo "${C}[MondoDB-Version]${NC}"
		mongod --version
		#----------
		#--nodejs--
		apt-get update && apt-get install -y curl
		curl -sL https://deb.nodesource.com/setup_10.x | E- bash -
		apt-get update && apt-get install -y nodejs
		echo "${C}[NodeJS-Version]${NC}"
		node --version
		#----------
		#----npm---
		apt-get update && apt-get install -y npm
		echo "${C}[NPM-Version]${NC}"
		npm --version
		#----------
		echo "${C}[INSTALLATION DONE]${NC}"
	fi
#=========================================
#FogNode Role Configuration[Master|Slave]
	echo "${C}[Fog Node Role]${NC}"
	read -p "Choose (M)aster or (S)lave Role: " role
	if [ $role = "M" ] ; then
		echo "${C}[Master Node Area]${NC}"
		read -p "What is your area number ?: " area
		echo "${C}[Master Node Network]${NC}"
		read -p "What is your network address ?: " netaddr
		link_area="https://fogfly.000webhostapp.com/process/area.php?role=m&areacode=$area&gw=$netaddr"
		package_key=$(curl -X GET ${link_area})
		keyauth=$(echo ${package_key} | cut -d' ' -f 2)
		link_m="https://fogfly.000webhostapp.com/process/package.php?role=m&key=$keyauth"
		package_m=$(curl -X GET ${link_m})
		curl -O ${package_m}
		echo "${C}[CONFIGURATION DONE]${NC}"
	elif [ $role = "S" ] ; then
		echo "${C}[Slave Node Area]${NC}"
		read -p "What is your area number ?: " area
		link_area="https://fogfly.000webhostapp.com/process/area.php?role=s&areacode=$area"
		package_key=$(curl -X GET ${link_area})
		keyauth=$(echo ${package_key} | cut -d' ' -f 2)
		link_s="https://fogfly.000webhostapp.com/process/package.php?role=s&key=$keyauth"
		package_s=$(curl -X GET ${link_s})
		curl -O ${package_s}
		echo "${C}[CONFIGURATION DONE]${NC}"
	fi
fi
#=========================================
#END SCRIPT
#=========================================
#Dragonfly 2018
#Need Help? Please contact the developer team through email: fogfly@dragonfly.com
