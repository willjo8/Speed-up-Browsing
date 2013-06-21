Speed-up-Browsing
=================

Opera 15+ extension to enhance cache usage.

Description:

This extension enhances the re-use of already downloaded images/scripts etc. thus speeds up loading of pages significantly. Just install this extension and enjoy faster surfing.
"Most web pages include resources that change infrequently, such as CSS files, image files, JavaScript files, and so on. These resources take time to download over the network, which increases the time it takes to load a web page. HTTP caching allows these resources to be saved, or cached, by a browser or proxy. Once a resource is cached, a browser or proxy can refer to the locally cached copy instead of having to download it again on subsequent visits to the web page. Thus caching is a double win: you reduce round-trip time by eliminating numerous HTTP requests for the required resources, and you substantially reduce the total payload size of the responses. Besides leading to a dramatic reduction in page load time for subsequent user visits, enabling caching can also significantly reduce the bandwidth and hosting costs for your site."
https://developers.google.com/speed/docs/best-practices/caching

Changelog:
1.3.5:
-Fixed issue with default values.
-Small code fixes and optimizations.
1.3:
-Lots of optimizations, extension execution speed increased about 70%.
-Removed JQuery, reduced size of extension.
-Default values updated.
-Now cache-content flag added if absent.

Notes:
-This extension is usefull for all users but highly recommended to the users with slow or metered Internet connection.
-Browser uses default cache to store items.
(path: C:\Users\*User Name*\AppData\Local\Opera Software\Opera Next\Cache)
-Because pages are validated always before used from cache, so you will be always served the latest page.
-You can change the max-age value for images/scripts/css independently.
-This will increase the disk space used in C: drive overtime, (to maximum of 400Mb), so if you are concerned about space, don't use this extension.
