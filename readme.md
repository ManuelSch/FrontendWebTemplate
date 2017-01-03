<h1>Web Project Template for Frontend development</h1>

<h2>Makes use of:</h2>
<ul>
    <li>npm ... package management</li>
    <li>bower ... frontend library management</li>
    <li>gulp ... task execution (custom build routines, Sass compiler and file watcher, live reload inside Chrome, js and css link injection, automated bower-install, ...)</li>
    <li>AngularJS ... single page application development (routes) and html 'templates' (custom directives)</li>
    <li>Sass ... css preprocessor providing variables, mixins and functions</li>
    <li>Bootstrap</li>
    <li>jQuery</li>
</ul>

<h2>How to:</h2>
<h4>Setup:</h4>
<ol>
    <li>Make sure Node.js is installed: https://nodejs.org/en/</li>
    <li>Execute 'npm install' inside the project folder to download all node packages (gulp, ...)</li>
    <li>Make sure bower is installed: 'npm install bower -g'</li>
    <li>Install bower-installer: 'npm install bower-installer -g'</li>
    <li>Done.</li>
</ol>
 
<h4>Development Routine:</h4>
<ol>
    <li> Execute 'gulp' inside the project folder to download the bower packages (angular, jquery,...), start the browser, live reload, sass compilation, etc.</li>
</ol>

See also: https://www.youtube.com/playlist?list=PLRk95HPmOM6PN-G1xyKj9q6ap_dc9Yckm

<h2>Important files:</h2>

<br/>
<h4>bower.json</h4>
bower and bower-installer config file including the dependencies (e.g. Angular)
<br/><br/>
Add new dependencies:
<ol>
     <li>Execute 'bower install PACKAGENAME --save' inside the project directory (e.g.: 'bower install angular --save')</li>
     <li>Open bower.json, add the new dependency to "install" -> "sources" and define which are the important files that will be copied to the src-folder (e.g.: angular.js)</li>
</ol>
Install all dependencies:
<ol>
     <li>Make sure bower-installer is installed globally: 'npm install bower-installer -g'
     <li>Execute 'bower-installer' inside the project directory. This will not only download the packages to the bower_packages-folder (which is what 'bower install' would do), but it will also copy the important files defined in the bower.json-file (under "install" -> "sources") to the src-folder</li>
</ol>
</ul>
<br/>
<h4>package.json</h4>
npm config file including the node.js dependencies (e.g. Gulp)
<br/><br/>
Add new dependencies:
<ol>
     <li>Navigate to project directory</li>
     <li>Type in e.g.: npm install gulp --save-dev</li>
</ol>
Install all dependencies:
<ol>
     <li>Navigate to project directory</li>
     <li>Type in: npm install</li>
</ol>
<br/>
<h4>gulpfile.js</h4>
gulp file including all the gulp tasks
<ul>
    <li>default ... Executes the build task</li>
    <li>build ... Runs the full build routine; makes sure the tasks are executed in sequence</li>
    <li>clean ... Deletes the build and src/lib folders</li>
    <li>bower-installer ... Executes 'bower-installer'</li>
    <li>inject ... Injects js- and css-links into index.html</li>
    <li>browser-sync ... Starts a local server for live reload while editing:</li>
    <li>html ... HTML files</li>
    <li>css ... CSS files</li>
    <li>sass ... SASS files</li>
    <li>scss ... SCSS files</li>
    <li>js ... JavaScript files</li>
    <li>lib ... Bower packages files</li>
    <li>watch ... File watchers</li>
    <li>htmlBuild, cssBuild, etc. ... Execute the file tasks and 'inject' in sequence</li>
    <li>open ... opens the default browser automatically</li>
</ul>
<br/>