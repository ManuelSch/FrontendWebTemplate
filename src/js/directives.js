;
/*
    ANGULAR DIRECTIVES
*/

// TODO: Customize
templateApp.directive('testDirective', function() {
    return {
        templateUrl: 'directives/testDirective.html',
        replace: true,
        scope: {
            text: '@'
        }
    }
});
