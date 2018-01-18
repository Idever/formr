# formr
An easy-to-use and fluent browser-side JavaScript form validator.


## Easy to install
You just have to download `formr.min.js` and add script tag into your HTML as following :
```HTML
<script src="/path/to/formr.min.js"></script>
```

## Basic example
#### JS
```JS
var form = document.forms['awesome-form']

var validator = new window.Formr(form)



validator

  .required('id', 'title', 'content', 'image')

  .string('title', 'content')

  .number('id')

  .between('id', 1, 10)

  .between('title', 1, 5)

  .between('content', 10, 2000)

  .checked('published', true)

  .image('image', ['png'])

  .observe({field: 'title', validate: false}, console.log)

  .submit(function (e) {

    e.preventDefault()

    console.log(validator.isValid())

    console.log(validator.getErrors())

  })
```

#### HTML
```HTML
<form name="awesome-form" action="" method="post" enctype="multipart/form-data">
  <input type="number" id="id" name="id">
  <input type="text" id="title" name="title">
  <input type="file" id="image" name="image">
  <textarea name="content" id="content" cols="30" rows="10"></textarea>
  <input type="checkbox" value="1" id="is_published" name="is_published">
  <button type="submit">Envoyer</button>
</form>
```
