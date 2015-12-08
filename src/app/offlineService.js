angular.module('livefeed.offline', []
)
.service('offlineService', function(_) {
   Offline.options = {checkOnLoad: true, checks: {image: {url: 'http://www.vitaminedz.com/photos/49/02-49565-front-de-mer-a-oran.jpg'}, active: 'image'}};
   console.log(Offline.check());
   Offline.on('up', function() {
     alert('up');
   });
   Offline.on('down', function() {
     alert('down');
   });
});