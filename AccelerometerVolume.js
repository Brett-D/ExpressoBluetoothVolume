var controls = { 
    "report": new Uint8Array([5, 12, 9, 1, 161, 1, 21, 0, 37, 1, 117, 1, 149, 5, 9, 181, 9, 182, 9, 183, 9, 205, 9, 226, 129, 6, 149, 2, 9, 233, 9, 234, 129, 2, 149, 1, 129, 1, 192]), 
    "next": function (a) {b(1,a)}, 
    "prev": function (a) {b(2,a)}, 
    "stop": function (a) {b(4,a)}, 
    "playpause": function (a) {b(8,a)}, 
    "mute": function (a) {b(16,a)}, 
    "volumeUp": function (a) {b(32,a)}, 
    "volumeDown": function (a) {b(64,a)}
   };
  Puck.on("accel", function (a) {a.motion=!!(Puck.accelRd(27)&8);Puck.accelWr(13,a.motion?1:0);Puck.accelWr(94,a.motion?0:32)});
  Puck.on("accel", function (a) {
    if (idleTimeout) 
    {
      clearTimeout(idleTimeout);
      turnOffLed();
      controls.volumeDown();
    }
    else {
      isMoving = true;
      //updateAdvertising();
      turnOnLed();
    }
    idleTimeout = setTimeout(onIdle, TIMEOUT);
  });
  var idleTimeout = 10000;
  function turnOnLed() {digitalWrite(LED1,1);}
  function turnOffLed() {digitalWrite(LED1,0);}
  digitalWrite(D27, 0);
  NRF.setServices(undefined, { 
    "hid": new Uint8Array([5, 12, 9, 1, 161, 1, 21, 0, 37, 1, 117, 1, 149, 5, 9, 181, 9, 182, 9, 183, 9, 205, 9, 226, 129, 6, 149, 2, 9, 233, 9, 234, 129, 2, 149, 1, 129, 1, 192])
   });
  // Code saved with E.setBootCode
  Modules.addCached("puckjsv2-accel-movement",function(){function b(a){a.motion=!!(Puck.accelRd(27)&8);Puck.accelWr(13,a.motion?1:0);Puck.accelWr(94,a.motion?0:32)}if(2!=process.env.HWVERSION&&2.1!=process.env.HWVERSION)throw Error("Puck.js v2 required for this module");exports.on=function(a){a=a||{};Puck.accelOn();Puck.accelWr(21,16);Puck.accelWr(13,0);Puck.accelWr(17,0);Puck.accelWr(16,a.lowPower?176:16);Puck.accelWr(88,144);Puck.accelWr(92,E.clip(a.duration,0,15)||2);Puck.accelWr(91,E.clip(a.threshold,0,63)||2);Puck.accelWr(94,
  32);if(Puck.prependListener)Puck.prependListener("accel",b);else Puck.on("accel",b)};exports.off=function(){Puck.removeListener("accel",b);Puck.accelOff()}
  });
  Modules.addCached("ble_hid_controls",function(){function b(a,c){NRF.sendHIDReport(a,function(){NRF.sendHIDReport(0,c)})}exports.report=new Uint8Array([5,12,9,1,161,1,21,0,37,1,117,1,149,5,9,181,9,182,9,183,9,205,9,226,129,6,149,2,9,233,9,234,129,2,149,1,129,1,192]);exports.next=function(a){b(1,a)};exports.prev=function(a){b(2,a)};exports.stop=function(a){b(4,a)};exports.playpause=function(a){b(8,a)};exports.mute=function(a){b(16,a)};exports.volumeUp=function(a){b(32,a)};exports.volumeDown=function(a){b(64,a)}
  });
  var controls = require("ble_hid_controls");
  NRF.setServices(undefined, { hid : controls.report });
  require("puckjsv2-accel-movement").on();
  
  var idleTimeout = 10000;
  
  function turnOnLed()
  {
    digitalWrite(LED1,1);
    
  }
  
  function turnOffLed()
  {
    digitalWrite(LED1,0); 
  }
  
  Puck.on('accel',function(a) {
    if (idleTimeout) 
    {
      clearTimeout(idleTimeout);
      turnOffLed();
      controls.volumeDown();
    }
    else {
      isMoving = true;
      //updateAdvertising();
      turnOnLed();
    }
    idleTimeout = setTimeout(onIdle, TIMEOUT);
  });