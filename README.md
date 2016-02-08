# npm-recommender
Using NPM search to discover new packages that might be useful for you can be frustrating, as packages are indexed by their names and a set of tags which often don't describe the package's actual function. Rather than searching using information declared by package creators, NPM Recommender recommends packages based on the contexts in which they're frequently used. Under the hood, it constructs a set of "sentences" out of every package's `dependencies` and `devDependencies` and then feeds those to word2vec, an algorithm developed by Google which learns co-occurrence patterns of words in an input corpus.

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
