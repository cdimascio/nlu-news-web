const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')

const natural_language_understanding = new NaturalLanguageUnderstandingV1({
  username: '57b76f1b-ad00-4917-a690-3f5122711aed',
  password: 'tcBWsc4QQcF4',
  version_date: '2017-02-27',
})

function nluAnalyze(params) {
  const parameters = {
    url: params.url,
    features: {
      entities: {
        emotion: true,
        limit: 8,
      },
    },
  }

  return new Promise((resolve, reject) => {
    natural_language_understanding.analyze(parameters, (err, response) => {
      if (err) {
        reject({
          status: 500,
          body: err,
        })
      } else {
        resolve({
          status: 200,
          body: response,
        })
      }
    })
  })
}

exports.nlu_analyze = nluAnalyze
