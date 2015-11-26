var http = require('http'),
        fs=require('fs'),
        httpProxy = require('http-proxy');
        // url = require('url');

//// Create your proxy server and set the target in the options.
var proxy = httpProxy.createProxyServer({});


server = http.createServer(function(req,res) {
    
    //By Default student Instance 1
	var target = {target : 'http://localhost:9001'};

    console.log("dataa", req.url);

    if (req.url == '/') { //will be executed only on index.html
        fs.readFile('index.html', function(err, page) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(page);
            res.end();
        });
        return;
    }

    if (req.url === '/favicon.ico' || req.url.slice(1).split('?')[1]==undefined) {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
        console.log('favicon requested');
        return;
    }



    
    var lastNameLetter = req.url.slice(1).split('?')[1].split('=')[1][1].toLowerCase(); //bs2888 will give us s

    
    console.log("param is: " + lastNameLetter);
    
    //Based on the Last name, select the corresponding instance
    //      A-I  -  Student Instance 1
    //      J-Q  -  Student Instance 2
    //      R-Z  -  Student Instance 3
	console.log('First Letter of Last Name ',lastNameLetter);
    //      A-I  -  Student Instance 1
    if ( lastNameLetter >= 'a' && lastNameLetter <= 'i' ) {
        console.log('Student has a last name in \'A - I\'. Now navigating to Server 1.');
        target = {target : 'http://localhost:9001'};
    }
    if ( lastNameLetter >= 'j' && lastNameLetter <= 'q' ) {
        console.log('Student has a last name in \'J - Q\'. Now navigating to Server 2.');
        target = {target : 'http://localhost:9002'};
    }
    if ( lastNameLetter >= 'r' && lastNameLetter <= 'z' ) {
        console.log('Student has a last name in \'R - Z\'. Now navigating to Server 3.');
        target = {target : 'http://localhost:9003'};
    }
    proxy.proxyRequest(req, res, target);
});


//Starting the server
console.log('Starting the Router to server studentInstances');
server.listen(8000);