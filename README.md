# Wellcome Chart Data Editor

WCDE (recursive acronym of "WCDE Can Definitely Edit") is a new tool for digital content producers which provides a simple UI to create chart data for our new responsive dynamic charts.

It allows a non-technical user to import a simple CSV data file, set the chart type, labels, ranges and colours for the final chart output, then produces correctly formatted JSON objects to paste in to our Drupal CMS module for chart display.

It is currently available at [chart-data-editor.wellcome-s3.org](http://chart-data-editor.wellcome-s3.org).

Examples of our charts are available in our [pattern library](http://patterns.wellcome-s3.org/wellcome.ac.uk/components/detail/dynamic-charts--default.html)

## Dev

+ install dependencies with `npm install`
+ one-time build with `npm run build`
+ watch while developing with `npm run watch`
+ deploy (if you have the rights, which you probably don't) with `npm run deploy`
