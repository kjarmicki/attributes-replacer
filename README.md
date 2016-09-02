# Attributes Replacer


## How does this extension work?

It first traverses HTML in the page in search for specified attributes within elements.
Then, among these elements, it replaces their attributes' contents according to rules defined by the user.

## Example flow

Let's say your goal is this: `I want to replace every image on the pages I'm seeing with that of Sierra Nevada Red Fox`. Because why not?

At first, you specify what you want to change.
It will be image urls, found under `<img src="...">` in the HTML.
So CSS selector for that particular attribute would be `img[src]` and this is exactly what you need to put in `Apply to selectors` field:

![readme-1](https://cloud.githubusercontent.com/assets/1783785/18214756/aece19a8-714e-11e6-8a3b-c5ce0f387db1.png)

Then you need to specify what and how to replace, using regular expressions.

For `img[src]` you want to replace whole attributes' contents, so left hand side of the replacement is: `.*` (a regexp catching everything).

Then for a replaced content you want source of your fox image, like this ome: http://www.sierraforestlegacy.org/images/conservation/SNWR/RedFox5.jpg

This is going to be a right hand side of the replacement rule, right after separating arrow `=>`, so the whole thing looks like this: `.* => http://www.sierraforestlegacy.org/images/conservation/SNWR/RedFox5.jpg`

![readme-2](https://cloud.githubusercontent.com/assets/1783785/18214757/aed53e7c-714e-11e6-96cd-97f3cb7f6470.png)

Now, all that's left to do is to turn the replacement switch on:

![readme-3](https://cloud.githubusercontent.com/assets/1783785/18214758/aed79424-714e-11e6-87c0-b80e31587960.png)

And tada, your bbc.com is now full of foxes!

![bbc](https://cloud.githubusercontent.com/assets/1783785/18214815/f0909992-714e-11e6-8761-00df72b7467d.png)

## Q & A

### Does replacing apply to just the page being viewed or all the pages in current browser window?
All the pages, [as requested](https://github.com/kjarmicki/attributes-replacer/issues/3).

If however there will be demand, it should be easy to implement an option to do it only on a current tab. If you want it, [let me know](https://github.com/kjarmicki/attributes-replacer/issues).

### Can I specify multiple rules and selectors?
Yes, just separate them with new lines.

### Can I replace some set of attributes in one page and different in another?
Nope, at least not yet. The approach is currently "select all the attributes that match selectors and apply first matching rule".


#### For development: Installation and running

Requirements:
* [Node.js](https://nodejs.org) in version 4.0 or higher.
* sh-compatible shell

```
npm install
npm start
```
These commands will install project dependencies and build an extension in ```dist/``` directory,
including zip file ready for upload to Chrome Web Store.
