import {Texts} from "../../lib/collection"
import {setCurrentLanguage} from "../cms"

Template.translate.helpers({
  todo() {
    return getLanguages().filter(function(language) {
      return !language.status
    })
  },
  started() {
    return getLanguages().filter(function(language) {
      return language.status == 'started'
    })
  },
  pending() {
    return getLanguages().filter(function(language) {
      return language.status == 'pending'
    })
  },
  published() {
    return getLanguages().filter(function(language) {
      return language.status == 'published'
    })
  }
})

function getLanguages() {
  const namePairs = ISOLanguages.getNamePairs()
  return namePairs.map(function(namePair) {
    const languageCode = namePair[0]
    const languageName = namePair[1]
    const texts = Texts.findOne({languageCode: languageCode.toLowerCase()})
    if (texts) {
      return texts
    } else {
      return {languageCode, languageName}
    }
  })
}

Template.translate.events({
  "click .languageButton"(event) {
    const button = event.target
    const languageCode = $(button).data("languagecode")
    const texts = Texts.findOne({languageCode: languageCode})
    if (texts && texts.status == 'published') {
      Router.go('/' + languageCode)
    } else {
      Router.go('/' + languageCode + '/editText')
    }
  }
})

