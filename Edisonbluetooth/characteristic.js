/*jslint node:true,vars:true,bitwise:true,unparam:true */
/*jshint unused:true */
var mraa = require('mraa');
var button = new mraa.Gpio(2);     // set up digital read on digital pin #5<br>
button.dir(mraa.DIR_IN); // set the GPIO direction to input<br><br>

var util = require('util');

var bleno = require('bleno');

var BlenoCharacteristic = bleno.Characteristic;

var FirstCharacteristic = function() {
  FirstCharacteristic.super_.call(this, {
    uuid: 'fc0f',
    properties: ['read', 'notify']
  });
};

util.inherits(FirstCharacteristic, BlenoCharacteristic);

FirstCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log("Has come inside readrequest!!!");
   while(true){
      var buttonState = button.read();
      if(buttonState==1){// read the value of the digital pin    
        console.log(buttonState);
        break;
      }
    }
  callback(this.RESULT_SUCCESS, buttonState);
};


// FirstCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
//   this._value = data;
//     console.log('FirstCharacteristic - onWriteRequest: value = ' + this._value);

//   if (this._updateValueCallback) {
//     console.log('FirstCharacteristic - onWriteRequest: notifying');

//     this._updateValueCallback(this._value);
//   }

//   callback(this.RESULT_SUCCESS);
// };

// FirstCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
//   console.log('FirstCharacteristic - onSubscribe');

//   this._updateValueCallback = updateValueCallback;
// };

// FirstCharacteristic.prototype.onUnsubscribe = function() {
//   console.log('FirstCharacteristic - onUnsubscribe');

//   this._updateValueCallback = null;
// };

module.exports = FirstCharacteristic;
