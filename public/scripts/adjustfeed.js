/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function viewAdjustfeed(fields) {
  fetch(`/api/adjustfeeds?username=${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
  }

function editAdjustfeed(fields) {
  fetch(`/api/adjustfeeds/`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
  }
