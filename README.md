<h1> Share box </h1>
<br>

**LIST OF USER ROUTES:**

Route|HTTP|Header(s)|Body|Description|
|---|---|---|---|---|
|/users|GET|none|none|Get all users data|
|/users|POST|none|name: String **(REQUIRED)**, email: String **(REQUIRED)**, password: String **(REQUIRED)**, birthday: Date, aboutMe: String, image: file|Create new user (manual) & generate jwt |
|/users/gooSign|POST|none|id_token: String **(REQUIRED)**|Create new user (google) and generate jwt|
|/users/login|POST|none|email:String **(REQUIRED)**, password:String **(REQUIRED)**|generate jwt |
|/users|PUT|token|name: String , email: String , password: String , birthday: Date, aboutMe: String, image: file|Update user data|
|/users|DELETE|token|none|Delete user|
|/users/me|GET|token|none|Get logged in user info |

<br>
<br>

**LIST OF ARTICLE ROUTES:**
Route|HTTP|Header(s)|Body|Description|
|---|---|---|---|---|
|/aricles|GET|token|none |Get all articles|
|/aricles|POST|token|title: String **(REQUIRED)**, category: String, briefDesc: String **(REQUIRED)**, content: String **(REQUIRED)**, image: file **(REQUIRED)**, tag: String|Create a new article|
|/aricles/:id|GET|token|none |Get one article data|
|/aricles/music/:id|PUT|token|music: file **(REQUIRED)** |Upload article music|
|/aricles/:id|PUT|token|title: String, category: String, briefDesc: String, content: String, image: file, tag: String|Update article data|
|/aricles/:id/like|PUT|token|none |Update article like|
|/aricles/:id|DELETE|token|none |Delete article|
<br>
<br>

**Usage:**

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```
And don't forget to fill the .env file 

Link Server:
http://35.186.159.35

Link deploy: 
http://sharebox.veneciac.xyz/