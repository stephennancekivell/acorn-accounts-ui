basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  
  'app/components/angular/angular.js',
  'app/components/angular-resource/angular-resource.js',
  'app/components/angular-cookies/angular-cookies.js',
  'app/components/angular-mocks/angular-mocks.js',
  'app/components/angular-ui-utils/modules/event/event.js',
  'app/components/angular-ui-utils/modules/if/if.js',
  'app/components/angular-ui-utils/modules/route/route.js',
  'app/components/underscore/underscore.js',
  'app/components/angular-dragon-drop/dragon-drop.js',
  'app/components/angular-http-auth/src/http-auth-interceptor.js',
  'app/lib/ui-bootstrap-tpls.js',

  'app/js/**/*.js',
  'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['PhantomJS'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
