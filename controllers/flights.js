import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js'

function newFlight(req, res) {
  const newPlane = new Flight()
  const dateTime = newPlane.departs
  const departsDate = dateTime.toISOString().slice(0,16)
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate
  })
}

function create(req, res) {
  console.log('req.body', req.body)
  Flight.create(req.body)
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
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
  .populate('food')
  .then(flight => {
    Meal.find({})
    .then(meals => {
      res.render('flights/show', {
        title: 'Flight No',
        flight: flight,
        meals: meals,
      })

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
function update(req, res) {
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect("/")
  })
}
function createTicket(req, res) {
  console.log('req.body', req.body)
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect("/")
  })
}
function addToFood(req, res) {
  console.log('req.body', req.body)
  Flight.findById(req.params.id)
  .then(flight => {
    flight.food.push(req.body.mealId)
    console.log(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)

    })
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
  createTicket,
  addToFood,
}