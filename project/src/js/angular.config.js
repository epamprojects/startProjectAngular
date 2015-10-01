angular.module('directivesName', function(){
   return  {
       'example':'example'
   }
});

var StartApp = angular.module('StartApp',["directivesName"])
    .service("paService", function(){
        return function(){
            return [
                {
                    "filterTitle":"red",
                    "filterPalette":["#CD5C5C","#F08080","#FA8072"]
                }
            ]
        }

    }
);
