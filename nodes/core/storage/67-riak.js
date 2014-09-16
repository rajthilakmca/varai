/* 
 ** Copyright [2012-2013] [Megam Systems]
 **
 ** Licensed under the Apache License, Version 2.0 (the "License");
 ** you may not use this file except in compliance with the License.
 ** You may obtain a copy of the License at
 **
 ** http://www.apache.org/licenses/LICENSE-2.0
 **
 ** Unless required by applicable law or agreed to in writing, software
 ** distributed under the License is distributed on an "AS IS" BASIS,
 ** WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ** See the License for the specific language governing permissions and
 ** limitations under the License.
 */
module.exports = function(VARAI) {
    "use strict";
    var dgram = require('dgram');

    // The Input Node
  /*  function riakin(n) {
        VARAI.nodes.createNode(this,n);
        this.group = n.group;
        this.port = n.port;
        this.datatype = n.datatype;
        this.iface = n.iface || null;
        this.multicast = n.multicast;
        var node = this;

        var server = dgram.createSocket('riak4');

        server.on("error", function (err) {
            if ((err.code == "EACCES") && (node.port < 1024)) {
                node.error("riak access error, you may need root access for ports below 1024");
            } else {
                node.error("riak error : "+err.code);
            }
            server.close();
        });

        server.on('message', function (message, remote) {
            var msg;
            if (node.datatype =="base64") {
                msg = { payload:message.toString('base64'), fromip:remote.address+':'+remote.port };
            } else if (node.datatype =="utf8") {
                msg = { payload:message.toString('utf8'), fromip:remote.address+':'+remote.port };
            } else {
                msg = { payload:message, fromip:remote.address+':'+remote.port, ip:remote.address, port:remote.port };
            }
            node.send(msg);
        });

        server.on('listening', function () {
            var address = server.address();
            node.log('riak listener at ' + address.address + ":" + address.port);
            if (node.multicast == "true") {
                server.setBroadcast(true);
                try {
                    server.setMulticastTTL(128);
                    server.addMembership(node.group,node.iface);
                    node.log("riak multicast group "+node.group);
                } catch (e) {
                    if (e.errno == "EINVAL") {
                        node.error("Bad Multicast Address");
                    } else if (e.errno == "ENODEV") {
                        node.error("Must be ip address of the required interface");
                    } else {
                        node.error("Error :"+e.errno);
                    }
                }
            }
        });

        node.on("close", function() {
            try {
                server.close();
                node.log('riak listener stopped');
            } catch (err) {
                node.error(err);
            }
        });

        server.bind(node.port,node.iface); 
    }*/
  //  VARAI.nodes.registerType("riak in",riakin);


    // The Output Node
    function riakout(n) {/*
        VARAI.nodes.createNode(this,n);
        //this.group = n.group;
        this.port = n.port;
        this.outport = n.outport||"";
        this.base64 = n.base64;
        this.addr = n.addr;
        this.iface = n.iface || null;
        this.multicast = n.multicast;
        var node = this;

        var sock = dgram.createSocket('riak4');  // only use ipv4 for now

        if (node.multicast != "false") {
            if (node.outport == "") { node.outport = node.port; }
            sock.bind(node.outport, function() {    // have to bind before you can enable broadcast...
                sock.setBroadcast(true);            // turn on broadcast
                if (node.multicast == "multi") {
                    try {
                        sock.setMulticastTTL(128);
                        sock.addMembership(node.addr,node.iface);   // Add to the multicast group
                        node.log('riak multicast ready : '+node.outport+' -> '+node.addr+":"+node.port);
                    } catch (e) {
                        if (e.errno == "EINVAL") {
                            node.error("Bad Multicast Address");
                        } else if (e.errno == "ENODEV") {
                            node.error("Must be ip address of the required interface");
                        } else {
                            node.error("Error :"+e.errno);
                        }
                    }
                } else {
                    node.log('riak broadcast ready : '+node.outport+' -> '+node.addr+":"+node.port);
                }
            });
        } else if (node.outport != "") {
            sock.bind(node.outport);
            node.log('riak ready : '+node.outport+' -> '+node.addr+":"+node.port);
        } else {
            node.log('riak ready : '+node.addr+":"+node.port);
        }

        node.on("input", function(msg) {
            if (msg.payload != null) {
                var add = node.addr || msg.ip || "";
                var por = node.port || msg.port || 0;
                if (add == "") {
                    node.warn("riak: ip address not set");
                } else if (por == 0) {
                    node.warn("riak: port not set");
                } else if (isNaN(por) || (por < 1) || (por > 65535)) {
                    node.warn("riak: port number not valid");
                } else {
                    var message;
                    if (node.base64) {
                        message = new Buffer(b64string, 'base64');
                    } else if (msg.payload instanceof Buffer) {
                        message = msg.payload;
                    } else {
                        message = new Buffer(""+msg.payload);
                    }
                    sock.send(message, 0, message.length, por, add, function(err, bytes) {
                        if (err) {
                            node.error("riak : "+err);
                        }
                        message = null;
                    });
                }
            }
        });

        node.on("close", function() {
            try {
                sock.close();
                node.log('riak output stopped');
            } catch (err) {
                node.error(err);
            }
        });*/
    }
    VARAI.nodes.registerType("riak",riakout);
}
