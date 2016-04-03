# citymap

1. Install ionic: http://ionicframework.com/
2. ionic platform add android
3. cordova plugin add cordova-plugin-whitelist
4. npm install
5. ionic serve -> To see if everything is working as it should
6. ionic run android -l -c -s


Required for glup/sass
`npm install -g gulp`

### Process

## Static Checks

### Javascript

jshint, check configuration `.jshintrc`
We may want to create a gulp/grunt task for it.

Install: 
   -  `sudo npm install -g jshint`
   
Run: 
    `jshint www/js`