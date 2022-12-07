const functions = require('../../../helpers/functions')
const riders = require('../../../models/mobile/riderModel')
const rides = require('../../../models/mobile/rideModel')
const offers = require('../../../models/mobile/offerModel')
const drivers = require('../../../models/mobile/driverModel')

const newRide = async (req, res, next) => {

	try {

		const phone_number = req.user

		let rider = await riders.findOne({ phone_number: phone_number })
		let durationObj

		if(!rider) {
			return next('Rider not found')
		}

		if(!rider.customer_id || rider.payment_information.length===0){
			return next('no payment info')
		}

		const { ride_type, pick_up_lat, pick_up_lng, pick_up_address, drop_off_lat, drop_off_lng, drop_off_address, pick_up_date, pick_up_time, no_of_hours,seats_required,car_type,bags,additional_notes} = req.body

		if(!ride_type ) {
			return next('Ride Type is required')
		}
		if(!pick_up_lat ) {
			return next('Pickup Latitude is required')
		}
		if(!pick_up_lng ) {
			return next('Pickup Longitude is required')
		}
		if(!pick_up_address ) {
			return next('Pickup Address is required')
		}
		if(!pick_up_date ) {
			return next('Pickup date is required')
		}
		if(!pick_up_time ) {
			return next('Pickup time is required')
		}
		if(!seats_required) {
			return next('Number of seats is required')
		}

		if(ride_type === 'luxury'){
			if(!['sedan','limo','suv'].includes(car_type.toLowerCase())){
				return next('Car type invalid for luxury vehicles')
			}
		}

		const pick_up_at = new Date(pick_up_date + ' ' + pick_up_time)

		if(pick_up_at.getTime() <= new Date().getTime() ){
			return next('Pick up time in the past')
		}

		const prev_rides = await rides.find({ rider_id: rider._id , canceled: false })

		durationObj=await functions.checkRideValidity(prev_rides, ride_type, pick_up_at, pick_up_lat, pick_up_lng, drop_off_lat, drop_off_lng, no_of_hours)
		if(durationObj.availability===false && durationObj.reason==='time') {
			return next('Ride date and time conflicts with previously booked rides')
		}
		else if(durationObj.availability===false && durationObj.reason==='dropOff'){
			return next('Invalid Locations provided. No route from Pick up to Drop off found')
		}

		let lat=parseFloat(pick_up_lat),lng=parseFloat(pick_up_lng)

		let data = {
			rider_id: rider._id,
			ride_type: ride_type,
			pick_up_location: {
				'type': 'Point',
				'coordinates': [lng, lat]
			},
			pick_up_address: pick_up_address,
			pick_up_at: pick_up_at,
			seats_required: seats_required,
			rider_photo: rider.photo_url,
			bags,
			additional_notes
		}

		if(ride_type === 'luxury' && no_of_hours){
			if (isNaN(no_of_hours)) {
				return next('Number of Hours should be number')
			}
			data.no_of_hours = no_of_hours
			data.car_type = car_type.toLowerCase()
		}

		else if(ride_type === 'standard' && drop_off_lat && drop_off_lng && drop_off_address) {

			let distance
			await functions.calculateRoadVariables(pick_up_lat, pick_up_lng, drop_off_lat, drop_off_lng).then((response) => {
				if(response.rows[0].elements[0].status === 'NOT_FOUND' || response.rows[0].elements[0].status === 'ZERO_RESULTS'){
					return next('Could not calculate distance')
				}
				distance = Math.ceil(response.rows[0].elements[0].distance.value / 1609)
			})
			lat=parseFloat(drop_off_lat)
			lng=parseFloat(drop_off_lng)
			data.drop_off_location={
				'type': 'Point',
				'coordinates': [lng, lat]
			}
			data.estimated_distance = distance
			data.ride_duration = durationObj.duration
			data.drop_off_address = drop_off_address

		} else {
			return next('Invalid inputs')
		}

		await rides.create(data).then(() => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'New ride created successfully',
				ride: data
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (err) {
		return next(err)
	}

}

const rideOffers = async (req, res, next) => {

	try {

		const phone_number = req.user

		let rider = await riders.findOne({ phone_number: phone_number })

		if(!rider) {
			return next('Rider not found')
		}

		if(!rider.customer_id || rider.payment_information.length===0){
			return next('no payment info')
		}

		await offers.find({ ride_id: req.params.ride_id }).then((response) => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'All offers',
				offers: response
			})

		}).catch(() => {
			return next('No offers found')
		})

	} catch (error) {
		return next(error)
	}

}

const acceptOffer = async (req, res, next) => {

	try {

		const phone_number = req.user

		let rider = await riders.findOne({ phone_number: phone_number })

		if(!rider) {
			return next('Rider not found')
		}

		if(!rider.customer_id || rider.payment_information.length===0){
			return next('no payment info')
		}

		let offer = await offers.findOne({ _id: req.params.offer_id })

		if(!offer) {
			return next('Offer not found')
		}

		const ride = await rides.findById(offer.ride_id)

		if(ride.status === 'expired'){
			return next('Ride is expired')
		}

		if(ride.pick_up_at  <= new Date().getTime()+1.8e+6){
			ride.status ='expired'
			await ride.save()
			return next('Ride is expired.Cannot make offer')
		}

		if(ride.status !== 'pending'){
			return next('ride already scheduled')
		}

		ride.driver_id= offer.driver_id
		ride.driver_name= offer.driver_name
		ride.driver_photo= offer.driver_photo
		ride.driver_rating=offer.average_rating
		ride.vehicle_id= offer.vehicle_id
		ride.fare= offer.offer_fare
		ride.car_name= offer.car_name
		ride.car_model= offer.car_model
		ride.car_type= offer.car_type
		ride.car_year= offer.car_year
		ride.car_plate_number= offer.car_plate_number
		ride.bags= offer.bags
		ride.additional_notes= offer.additional_notes
		ride.status= 'scheduled'
		ride.events.scheduled = new Date()

		await ride.save().then(async() => {

			offer.status='confirmed'
			await offer.save()
			const driver = await drivers.findById(offer.driver_id)
			await functions.sendNotification('Offer accepted',`Your offer to ${rider.first_name} ${rider.last_name} was accepted`,driver.device_token)
			await functions.sendSms(driver.phone_number,`Your offer to ${rider.first_name} ${rider.last_name} was accepted.`)

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Offer accepted successfully'
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (error) {
		return next(error)
	}

}

const allRides = async (req, res, next) => {

	try {

		const phone_number = req.user

		let rider = await riders.findOne({ phone_number: phone_number })

		if(!rider) {
			return next('Rider not found')
		}

		await rides.find({ rider_id: rider._id}).then((response) => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'All rides',
				rides: response
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (error) {
		return next(error)
	}

}

const retryPayment = async (req,res,next)=>{

	try{

		const phone_number = req.user

		let rider = await riders.findOne({ phone_number: phone_number })

		if(!rider) {
			return next('Rider not found')
		}

		if(!rider.customer_id || rider.payment_information.length===0){
			return next('no payment info')
		}

		await functions.payment(req.params.ride_id).then((response)=>{
			if (response === 'Payment charged successfully') {
				return res.status(200).send({
					status: 200,
					error: false,
					payment: 'Successful'
				})
			} else {
				return res.status(400).send({
					status: 400,
					error: true,
					payment: 'Failed',
					reason: response
				})
			}
		})

	}catch (err) {
		return next(err)
	}
}

const rideDetails = async (req, res, next) => {

	try {

		const phone_number = req.user

		let rider = await riders.findOne({phone_number: phone_number})

		if (!rider) {
			return next('Rider not found')
		}

		const ride = await rides.findById(req.params.ride_id).exec()

		if (ride) {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Ride Details',
				ride: ride
			})

		} else {
			return next('Ride not found')
		}

	} catch (error) {
		return next(error)
	}

}

const rideFeedback = async (req, res, next) => {

	try {

		const phone_number = req.user

		let rider = await riders.findOne({ phone_number: phone_number })

		if(!rider) {
			return next('Rider not found')
		}

		const { message, stars } = req.body

		const query = { _id: req.params.ride_id }

		const update = {
			'riderFeedback.message': message,
			'riderFeedback.stars': stars,
			'riderFeedback.status': 'uploaded'
		}

		const option = { new: true }

		await rides.findOneAndUpdate(query, update, option).then(async(response) => {

			let driver = await drivers.findById({ _id:response.driver_id })

			if(driver.rating === 0 ) {
				driver.rating = driver.rating+stars
			}
			else {
				driver.rating = driver.rating - (driver.rating / driver.completed_rides)
				driver.rating = driver.rating + stars
			}

			await driver.save()

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Ride feedback submitted',
				ride: response
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (error) {
		return next(error)
	}

}

const rideFeedbackSkipped = async (req, res, next) => {

	try {

		const phone_number = req.user

		let rider = await riders.findOne({ phone_number: phone_number })

		if(!rider) {
			return next('Rider not found')
		}

		const query = { _id: req.params.ride_id }

		const update = {
			'riderFeedback.status': 'skipped',
		}

		const option = { new: true }

		await rides.findOneAndUpdate(query, update, option).then(async(response) => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Ride feedback submitted',
				ride: response
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (error) {
		return next(error)
	}

}

const tipRide = async(req,res,next)=> {

	try {

		const phone_number = req.user

		let rider = await riders.findOne({phone_number: phone_number})

		if (!rider) {
			return next('Rider not found')
		}

		const {tip} = req.body

		await functions.tip(req.params.ride_id, tip).then((response) => {
			if (response === 'Payment charged successfully') {
				return res.status(200).send({
					status: 200,
					error: false,
					tip_payment: 'Successful'
				})
			} else {
				return res.status(200).send({
					status: 200,
					error: true,
					tip_payment: 'Failed',
					reason: response
				})
			}
		})

	} catch (err) {
		return next(err)
	}
}

const cancelRide = async(req, res, next) => {

	try{

		const phone_number = req.user

		let rider = await riders.findOne({ phone_number: phone_number })

		if(!rider) {
			return next('Rider not found')
		}

		const query = { _id: req.params.ride_id }

		const update = {
			canceled: true,
			canceledBy: 'rider'
		}

		const option = { new: true }

		await rides.findOneAndUpdate(query, update, option).then(async(response) => {

			const driver = await drivers.findById(response.driver_id)
			await functions.sendNotification('Ride Canceled',`The rider ${rider.first_name} ${rider.last_name} has cancelled the ride for ${response.pick_up_location} and ${response.drop_off_location} on ${new Date(response.pick_up_at)}`,driver.device_token)
			await functions.sendSms(driver.phone_number,`The rider ${rider.first_name} ${rider.last_name} has cancelled the ride for ${response.pick_up_location} and ${response.drop_off_location} on ${new Date(response.pick_up_at)}.`)

			await offers.deleteMany({ride_id:req.params.ride_id}).then(async()=>{
				await functions.cancellationChargesRider(response._id).then((response) => {
					if (response === 'Cancellation charged successfully') {
						return res.status(200).send({
							status: 200,
							error: false,
							message: 'Ride cancelled successfully',
							cancellation_payment: 'Successful'
						})
					} else {
						return res.status(200).send({
							status: 200,
							error: true,
							message: 'Ride cancelled successfully',
							cancellation_payment: 'Failed',
							reason: response
						})
					}
				})
			}).catch((err)=>{
				return next(err)
			})

		}).catch((error) => {
			return next(error)
		})

	} catch (error) {
		return next(error)
	}

}

module.exports = {
	newRide,
	rideOffers,
	acceptOffer,
	allRides,
	retryPayment,
	rideDetails,
	rideFeedback,
	rideFeedbackSkipped,
	tipRide,
	cancelRide,
}