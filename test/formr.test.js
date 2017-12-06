import { expect } from 'chai'
import sinon from 'sinon'
import Formr from '../src/Formr'

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
        .above('id', 1, true)

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

    it('should have errors', () => {
      const data = {
        title: '',
        id: 0,
        content: 'Mon super contenu de ouf',
        accepted_cgu: false
      }
      const validator = new Formr(data)

      validator
        .required('title', 'id', 'content')
        .string('title', 'content')
        .number('id')
        .above('id', 0)
        .checked('accepted_cgu')

      const errors = validator.getErrors()

      expect(errors).to.have.any.keys('title', 'id')
      expect(errors['title'][0]).to.include('Ce champ est requis')
      expect(errors['id'][0]).to.include('La valeur de ce champ doit être strictement supérieure à 0')
    })

    it('should have custom error message', () => {
      const data = {
        title: '',
        id: 0,
        content: 'Mon super contenu de ouf',
        accepted_cgu: false
      }
      const validator = new Formr(data)

      validator
        .messages({ 'checked': 'Vous devez accepter les CGU !' })
        .required('title', 'id', 'content')
        .checked('accepted_cgu')

      expect(validator.getErrors()['accepted_cgu'][0]).to.include('Vous devez accepter les CGU !')
    })

    it('should have a valid image', () => {
      const validator = new Formr({
        picture: {
          name: 'pic.jpg',
          size: 6987745,
          type: 'image/jpeg',
          length: 1
        }
      }, { test_mode: 'both' })

      validator.image('picture')

      expect(validator.isValid()).to.be.true
    })

    it('should have an invalid image', () => {
      const validator = new Formr({
        picture: {
          name: 'pic.jpg',
          size: 6987745,
          type: 'application/pdf',
          length: 1
        }
      }, { test_mode: 'both' })

      validator.image('picture')

      expect(validator.isValid()).to.be.false
      expect(validator.getErrors()).to.have.property('picture')
    })
    
    it('should have a valid file mimetype', () => {
      const validator = new Formr({
        file: {
          name: 'myfile.pdf',
          size: 6987745,
          type: 'application/pdf',
          length: 1
        }
      }, { test_mode: 'both' })
  
      validator.type('file', 'application/pdf')
  
      expect(validator.isValid()).to.be.true
    })
  
    it('should have an invalid file mimetype', () => {
      const validator = new Formr({
        file: {
          name: 'myfile.pdf',
          size: 6987745,
          type: 'image/png',
          length: 1
        }
      }, { test_mode: 'both' })
  
      validator.type('file', 'application/pdf')
  
      expect(validator.isValid()).to.be.false
      expect(validator.getErrors()).to.have.property('file')
    })
  })
})
