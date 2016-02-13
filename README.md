# npm-recommender
There are tons of awesome packages on [npm](https://npmjs.org), and sometimes the most useful way to find new ones is to look at what developers in your position already used to solve their problems! `npm-recommender` recommends modules based on how they've been used in the past. This module trains a machine learning model called `word2vec` on the npm corpus, treating every package's `dependencies` and `devDependencies` as a "sentence" and the modules as "words". The algorithm learns co-occurrence statstics of words in the corpus, and yields a vectorized representation on every module in the learned space. For a given target package, we recommend others based on those that are nearby (using cosine distance).

Augmenting module info with additional contextual information seems like a way to improve on the tag and name-based search that's currently available. If you have ideas for cool enhancements or alternative algorithms, definitely open an issue or submit a pull request!

The site is live at http://npmrec.com

References and useful links
- [`node-modules`](https://github.com/mafintosh/node-modules) by @mafintosh is another cool idea for search that uses personalized account information
-  this google [site](https://code.google.com/archive/p/word2vec/) is the main word2vec site that describes the algorithm and provides useful links
-  this [document](http://www-personal.umich.edu/~ronxin/pdf/w2vexp.pdf) gives another nice explanation of word2vec
-  [`word2vec`](https://www.npmjs.com/package/word2vec) is an existing node.js module that wrap's Google's C implementation

### Usage
An endpoint that serves the top 30 similar packages is publicly available at http://npmrec.com/api/similar

##### Example
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
