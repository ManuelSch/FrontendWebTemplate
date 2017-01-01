<h2>How to:</h2>
<h4>Setup:</h4>
<ol>
    <li>Make sure Node.js is installed.</li>
    <li>Execute 'npm install' inside the project folder to download all node packages (gulp, ...)</li>
    <li>Done.</li>
</ol>
 
<h4>Development Routine:</h4>
<ol>
    <li> Execute 'gulp' inside the project folder to download the bower packages (angular, jquery,...), start the browser, live reload, sass compilation, etc.</li>
</ol>

See also: https://www.youtube.com/playlist?list=PLRk95HPmOM6PN-G1xyKj9q6ap_dc9Yckm

<h2>Important files:</h2>

<h4>bower.json</h4>
bower and bower-installer config file including the dependencies (e.g. Angular)<br/>
<br/>
Add new dependencies:
<ol>
     <li>Navigate to project directory</li>
     <li>Type in e.g.: bower install angular --save</li>
     <li>Open bower.json and add the new dependency to "install" -> "sources" to define which are the important files that will be copied to the src-folder</li>
</ol>
<br/>
Install all dependencies:
<ol>
     <li>Navigate to project directory</li>
     <li>Make sure bower-installer is installed: 'npm install bower-installer -g'
     <li>Execute 'bower-installer'. This will not only download the packages to the bower_packages-folder (like 'bower install' would do), but will also copy the important files defined in the bower.json-file (under "install" -> "sources") to the src-folder</li>
</ol>
</ul>

<h4>package.json</h4>
npm config file including the node.js dependencies (e.g. Gulp)
<br/>
Add new dependencies:
<ol>
     <li>Navigate to project directory</li>
     <li>Type in e.g.: npm install gulp --save-dev</li>
</ol>
<br/>
Install all dependencies:
<ol>
     <li>Navigate to project directory</li>
     <li>Type in: npm install</li>
</ol>

<h4>gulpfile.js</h4>
gulp file which includes all the gulp tasks (e.g. minification, ...)
<ul>
    <li>gulp-uglify -> minification</li>
</ul>
<br/>