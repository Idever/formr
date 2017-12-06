(function () {

  window.addEventListener('DOMContentLoaded', function () {

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
  })

})(window, undefined)