/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function followUser(fields) {
  fetch('/api/follows', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function unfollowUser(fields) {
  fetch('/api/follows', {method: 'DELETE', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse); 
}

function viewFollowers(fields) {
  fetch('/api/follows/followers')
    .then(showResponse)
    .catch(showResponse); 
}

function viewFollowings(fields) {
  fetch('/api/follows/followings')
    .then(showResponse)
    .catch(showResponse); 
}