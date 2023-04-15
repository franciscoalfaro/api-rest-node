#Instalacion AWS
#se crea instancia con las reglas de seguridad SSH,TCP Personalizado(puerto a utilizar), HTTP

#Instalacion en aws

1 aws --> sudo yum install npm
2 aws --> sudo yum install git
3 aws --> git clone <repo>
4 aws --> cd <dir-repo> 
5 aws --> npm install requeriments
6 aws --> npm install pm2 -g
7 aws --> pm2 start <app a ejecutar>
8 aws --> pm2 start "npm start"