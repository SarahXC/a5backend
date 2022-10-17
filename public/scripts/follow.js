/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function followUser(fields) {
  fetch('/api/follow', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function unfollowUser(fields) {
  fetch('/api/follow', {method: 'DELETE', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

// function followUser(fields) {
//   fetch(`/api/follow?username=${fields.username}`, {method: 'POST'})
//     .then(showResponse)
//     .catch(showResponse);
// }

// function unfollowUser() {
//   fetch(`/api/follow?username=${fields.username}`, {method: 'DELETE'})
//     .then(showResponse)
//     .catch(showResponse);
// }

