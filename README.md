#Steps to install, setup and run app on local machine
This app consist of two parts: [frontend](https://github.com/sysstas/fronend) and [backend](https://github.com/sysstas/ccback) (this part).

To run app you need to run both parts.

It'll be explained how to setup and run backend part further. You can find guide on frontend setup [here]().

##Setting up the app backend on Local machine:
First of all you need to clone repo:

    git clone https://github.com/sysstas/ccback.git
   
Now install all packages

    npm install
    
 Installation process is finished now you need to setup. 
 
 First of all you need to have running mysql database. 
 It could be remote DB, but for development purposes it is better to have local DB.
 To run db locally you can use [MySQL Community Server](https://dev.mysql.com/downloads/) or
  use [Docker](https://hub.docker.com/_/mysql/), 
 or any suitable way you like.
 
 So, when you set up an run database instance you need to fill .env file.
 
 In this repo you can find **.env-example** file. You need to rename it to **.env**. After fill in it with your 
 mysql credentials, following by tips in .evn file.
 
 Also you can specify variable **PORT** in **.env** file if you want it to be different from default (5000).
  For example for port 3000 you should write in **.env**
        
        PORT=3000
 
 Ok, now, when db is up and running, you can test your backend. Just type in terminal
 
        npm start
  
  If everything correctly setup console output will be like
  
        [nodemon] 1.18.5
        [nodemon] to restart at any time, enter `rs`
        [nodemon] watching: *.*
        [nodemon] starting `node ./index.js`
        info: CONNECTED TO mysql://root:password@localhost:3306/ccdbdev
        info: Node app is running on port 5000
        info: Connection has been established successfully
 
###Migration  
Now it's time to run migrations on your db. 

For successful run of migration yor need to configure **config\config.json** file. 
You can find configuration example in **config\config-example.json**.
After configuring open terminal locate to **ccback** folder and execute following

         sequelize db:migrate

If migrations run without errors you can check new db structure. It should be like

        ccdb
        --|
        --Tables
        ----|
        ----cities
        ----masters
        ----orders
        ----users
        ----SequelizeMeta
###Seeds
To fill db prepared with migrations you need to run seeds

        sequelize db:seed:all

This command will fill db with demo data.

##Configuring necessary third party services
###Authentication and authorization
Authentication completely delegated to Auth0. So you need to register profile on [Auth0](https://auth0.com/), 
create app and setup app. You'll be given a **tenant**. You need to write this **tenant** into .env file.

        TENANT="[your-auth0-appname].auth0.com"
       
Ok, now your backend is configured for Auth0, but you need to add 2 **rules** on Auth0.
First **rule**. It sync accounts and permission of users accounts. All users stored in Auth0, but actual permission -
e.i. isAdmin stores on backend side. You need this rule to sync information on your backend and Auth0 server.

Rule 1:

        function (user, context, callback) {
          user.app_metadata = user.app_metadata || {};
          if (context.request.query.redirect_uri === 'http://localhost:4200/callback') {
            const ngrokUrl = configuration.ngrokUrl;
            request.post({
              url: `${ngrokUrl}/login/auth0hook`,
              json: {
                user: user,
                secretToken: configuration.YOURWEBSITE_SECRET_TOKEN,
              },
              timeout: 15000
            }, (err, response, body) => {
              if (err) return callback(new Error(err));
              if (!body.isAdmin) return callback(null, user, context);
              user.app_metadata = user.app_metadata || {};
              user.app_metadata.isAdmin = body.isAdmin;
              auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
                .then(function(){
                  callback(null, user, context);
                })
                .catch(function(err){
                  callback(err);
                });
            });
          }
        }

Copy and paste this to **rule** on **Auth0**. Also you need to set **ngrokUrl** variable. 
You need to make a bridge from your **localhost:5000** to **Auth0** server. [ngrok]() can help you.
Install **ngrok**, run it and type (you can specify different port)

        ngrok http localhost:5000
         
then copy given url and paste it into **ngrokUrl** variable on Auth0 right below rules.


**Warning!** url provided to you by ngrock will be valid for a couple hours. 
So you need to refresh it time over time (or move your backend to static ip address)

Adding rule number 2

Rule 2:

        function (user, context, callback) {
          const namespace = 'http://';
          context.idToken[namespace + 'isAdmin/'] = user.app_metadata.isAdmin.isAdmin;
          callback(null, user, context);
        }
          
this rule adds _isAdmin_ field to JWT IdToken which Auth0 send to frontend. isAdmin field is used by backend to 
verify access to admin page and admin actions. 
For security purposes you can change _isAdmin_ field only in your db manually.

##Paypal
As payment service PayPal was chosen. You need to configure it and your backend to be able to receive payments.  
You need to create [PayPal account](https://developer.paypal.com) (sandbox) and write into .env file another 3 variables

        PAYPAL_MODE="sandbox"
        PAYPAL_CLIENT_ID=[your paypal client id]
        PAYPAL_CLIENT_SECRET=[your paypal client secret]
        
In paypal app configuration you need specify webhook for your backend - it will be bult upon ngrock url

https://[ngrock-url]/orders/paypalwebhook 

 ##Done
 You finished app configuration. Now you need to install and run frontend part (if you didn't done this yet).

