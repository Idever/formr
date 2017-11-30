const expect = require('chai').expect
const sinon = require('sinon')
const Formr = require('../src/Formr')

describe('Formr', () => {

  beforeEach(() => global.window = undefined)

  describe('#validation', () => {

    it('should have a valid form', () => {
      const data = {
        title: 'Mon super titre',
        id: 4,
        content: 'Mon super contenu de ouf'
      }
      const validator = new Formr(data)

      validator
        .required('title', 'id', 'content')
        .string('title', 'content')
        .number('id')
        .above('id', 0)

      expect(validator.isValid()).to.be.true
    })
    
      it('should have an invalid form', () => {
        const data = {
          title: '',
          id: 0,
          content: 'Mon super contenu de ouf'
        }
        const validator = new Formr(data)
  
        validator
          .required('title', 'id', 'content')
          .string('title', 'content')
          .number('id')
          .above('id', 0)
  
        expect(Object.keys(validator.getErrors()).length).to.equal(2)
        expect(Object.keys(validator.getErrors())).to.include('title').and.include('id')
      })

  })

})