define(['knockout'], function(ko) {
    var vm = function(){
        this.vcard={
            Name:"John Rego",
            Street:"123 Main St",
            City:"Houston",
            State:"Texas",
            Zip:"77004",
            Email:"JRego@sharklasers.com",
            Github:"http://www.github.com/JRego",
            Linkedin:"http://www.linkedin.com/JRego",
            Stackoverflow:"http://www.stackoverflow.com/JRego"
        };
    };

    vm.prototype.activate = function() {
        return this.vm;
    };
    vm.prototype.deactivate = function() {
        clearInterval(this.interval);
    };
    return vm;
});