import { Flight } from '../models/flight.js'

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight',
  })
}

function create(req, res) {
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error =>{
    console.log(error)
    res.redirect('/flights')
  })
}

function index (req,res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights: flights,
      title: 'All Flights'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function show (req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/show', {
      title: 'Flight No',
      flight: flight
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}
function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}
function edit (req, res) {
  Flight.findById(req.params.id)
  .then (flight => {
    res.render('flights/edit', {
      title: 'Edit Flight',
      flight: flight
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('flights')
  })
}
function update (req, res) {
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then (flight => {
    res.redirect('/flights/show')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })

}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,

}