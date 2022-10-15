/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function followUser(fields) {
  fetch(`/api/follow?username=${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
}

function unfollowUser(fields) {
  fetch(`/api/unfollow?username=${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
}
