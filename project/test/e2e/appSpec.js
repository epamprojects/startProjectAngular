describe('test APP', function() {
    beforeEach(function(){
        global.isAngularSite(false)
        browser.get('https://www.google.com.ua/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8');
    });

    it('testing #some', function() {
       $("#logo").getCssValue('position').then(function(param){
         console.log('-------------------');
         console.log("position: ", param);
         console.log('-------------------');
       })
    });

});