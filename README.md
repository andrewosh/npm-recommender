# npm-recommender
There are tons of awesome packages on NPM, but using the built-in search feature to discover them can be frustratingly fruitless! Packages appear to be indexed by their names and a set of tags, both of which often don't describe (at least not uniquely, i.e. "build") their actual functions. Rather than searching using information declared upfront when the package is created (though using this information as well would certainly make the results more accurate!), NPM Recommender recommends packages based on the contexts in which they're frequently used. Under the hood, it constructs a set of "sentences" out of every package's `dependencies` and `devDependencies` and then feeds those to word2vec, an algorithm developed by Google which learns co-occurrence patterns of words in an input corpus.

The site is live at http://npmrec.com !

### Usage
An endpoint that serves the top 30 similar packages is publicly available at http://npmrec.com/api/similar

#### Example
```
GET http://npmrec.com/api/similar/<packageName>
[
	{	
		"word": similar-package,
		"dist": 0.9112,
		"description": This package is frequently used alongside packageName

	}
	...
]
```
