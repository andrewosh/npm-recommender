# npm-recommender
There are tons of awesome packages on [npm](https://npmjs.org), and sometimes the most useful way to find new ones is to look at what developers in your position already used to solve their problems! `npm-recommender` recommends modules based on how they've been used in the past. This module trains a machine learning model called `word2vec` on the npm corpus, treating every package's `dependencies` and `devDependencies` as a "sentence" and the modules as "words". The algorithm learns co-occurrence statistics of words in the corpus, and yields a vectorized representation on every module in the learned space. For a given target package, we recommend others based on those that are nearby (using cosine distance).

Augmenting module info with additional contextual information seems like a way to improve on the tag and name-based search that's currently available. If you have ideas for cool enhancements or alternative algorithms, definitely open an issue or submit a pull request!

References and useful links
-  this [google site](https://code.google.com/archive/p/word2vec/) is the main word2vec site that describes the algorithm and provides useful links
-  this [document](http://www-personal.umich.edu/~ronxin/pdf/w2vexp.pdf) gives another nice explanation of word2vec
-  [`word2vec`](https://www.npmjs.com/package/word2vec) by @planeshifter is a npm module that wrap's Google's C implementation
-  [`node-modules`](https://github.com/mafintosh/node-modules) by @mafintosh is another cool idea for search that uses personalized account information

### using the API
The site is live at http://npmrec.com!

And an endpoint that serves the top 30 similar packages is publicly available at http://npmrec.com/api/similar

```javascript
GET http://npmrec.com/api/similar/<packageName>
[
	{	
		"word": "similar-package",
		"dist": 0.9112,
		"description": "This package is frequently used alongside packageName"

	}
	...
]
```

### using the module

This module contains code to: 
 - crawl a mirror of the npm registry
 - train the word2vec model
 - precompute the similarity scores for every module in the registry
 - serve the website

To download the npm corpus, tweak parameters, and train your own model: 
 1. make sure that you have MongoDB installed
 2. update the fields in `conf/main.js` to appropriate values (such as where you'd like to save out the trained model)
 3. `npm run download` - download and save most of the `package.json` file for every module in the npm mirror
 4. `npm run train` - train the model and generate a `vectors.txt` file 
 5. (optional) `npm run precompute` - will precompute similarity scores for all modules to make the website snappy
 6. `npm run serve` - start the API server
 7. `npm run start` - serves the website

`npm run start` on its own will launch the website configured to read data from `npmrec.com/api`, so that should work out of the box without MongoDB.
