(function () {
    funcOne = function() {
            console.log('mlt funcOne here');
    }

    funcThree = function(firstName) {
            console.log(firstName, 'calls funcThree here');
    }

    baseClient = "uploads/clients/";
    tmpDir = "tmp";
    myobject = {
            title: 'Node.JS is cool',
            funcFour: function() {
                    return console.log('internal funcFour() called here');
            }
    }
})();
/*
require('./src/lib')
funcOne();
funcThree('Alex');
console.log(name);
console.log(myobject);
console.log(myobject.funcFour());

*/


   
