const db = require("../connection")

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      author: created_by,
      ...this.convertTimestampToDate(restOfComment),
    };
  });
};

exports.checkArticleIDExists = (article_id) => {
  return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
  .then(({rows}) => {
    if(rows.length === 0) {
      return false
    } else {return true}
  })
}

exports.checkUsernameExists = (username) => {
  return db.query("SELECT * FROM users WHERE username = $1", [username])
  .then(({rows}) => {
    if(rows.length === 0) {
      return false
    } else {return true}
  })
}

exports.checkArgumentsAreValid = ([...args]) => {
  function isValid(arg) {
    if (!arg || arg === "NULL" || arg === "null" || arg === "undefined") {
      return false 
  } else {return true}
  }
  return args.every(isValid)
}

exports.checkTopicExists = (topic) => {
  return db.query("SELECT * FROM topics WHERE slug = $1", [topic])
  .then(({rows}) => {
    if(rows.length === 0) {
      return Promise.reject({
        status: 404,
        message: `Not Found: No Topic Found under ${topic}`
      })
    } else {return true}
  })
}