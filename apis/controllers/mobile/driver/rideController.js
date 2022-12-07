const functions = require('../../../helpers/functions')
const drivers = require('../../../models/mobile/driverModel')
const rides = require('../../../models/mobile/rideModel')
const offers = require('../../../models/mobile/offerModel')
const riders = require('../../../models/mobile/riderModel')


const allRides = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		const {current_lat, current_lng, city, ride_type} = req.query

		if ((!current_lat || !current_lng) && !city) {
			return next('Either enter Latitude and Longitude or enter a City name')
		}
		if (!ride_type) {
			return next('Ride type is required')
		}

		let new_lat, new_lng

		if (city && !current_lat && !current_lng) {

			await functions.calculateLatLng(city).then((response) => {

				new_lat = response.lat.toString()
				new_lng = response.lng.toString()

			})

			await rides.find({
				pick_up_location:
                    {
                    	$near:
                            {
                            	$maxDistance: 40000,
                            	$geometry: {type: 'Point', coordinates: [new_lng, new_lat]}
                            }
                    }, canceled: false, status: 'pending', ride_type: ride_type
			}).then((response) => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'All rides',
					rides: response
				})
			})
		} else {
			await rides.find({
				pick_up_location:
                    {
                    	$near:
                            {
								$maxDistance: 40000,
                            	$geometry: {type: 'Point', coordinates: [current_lng, current_lat]}
							}
                    }, canceled: false, status: 'pending', ride_type: ride_type
			}).then((response) => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'All rides',
					rides: response
				})
			})
		}
	} catch (error) {
		return next(error)
	}
}

const rideDetails = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
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

const makeOffer = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		if(driver.status.account_status !== 'verified') {
			return next('Driver documents not verified')
		}

		const {offer_fare} = req.body

		if (!offer_fare) {
			return next('Offer Fare is required')
		}

		const ride = await rides.findById(req.params.ride_id)

		if(ride.status === 'expired'){
			return next('Ride is expired')
		}

		if(ride.pick_up_at  <= new Date().getTime()+1.8e+6){
			ride.status ='expired'
			await ride.save()
			return next('Ride is expired.Cannot make offer')
		}

		const prev_rides = await rides.find({ driver_id: driver._id , canceled: false })

		let durationObj=await functions.checkRideValidity(prev_rides, ride.ride_type, ride.pick_up_at, ride.pick_up_location.coordinates[1], ride.pick_up_location.coordinates[0],ride.drop_off_location.coordinates[1], ride.drop_off_location.coordinates[0], ride.no_of_hours)
		if(durationObj.availability===false) {
			return next('Ride date and time conflicts with previously booked rides')
		}

		let ride_type,car,car_name,car_model,car_type,car_year,car_plate_number,flag=false

		for (const [key, value] of Object.entries(driver.vehicle_information)) {
			if (value._id.equals(req.params.vehicle_id)) {
				flag=true
				ride_type = value.category
				car = value.type
				car_name = value.make
				car_model = value.model
				car_type = value.type
				car_year = value.year
				car_plate_number = value.plate_number
			}
		}

		if(flag===false){
			return next('Invalid Vehicle Id')
		}

		if (ride_type !== ride.ride_type && ride_type === 'standard') {
			return next('Offered vehicle Category does not match required vehicle Category')
		}
		if (ride.ride_type === 'luxury' && ride.car_type !== car) {
			return next('Offered vehicle type does not match required vehicle type')
		}

		const data = {
			driver_id: driver._id,
			ride_id: req.params.ride_id,
			vehicle_id: req.params.vehicle_id,
			offer_fare,
			driver_name: driver.first_name + driver.last_name,
			driver_photo: driver.photo_url,
			average_rating: driver.rating ? driver.rating : 0,
			car_name: car_name,
			car_model: car_model,
			car_type: car_type,
			car_year: car_year,
			car_plate_number: car_plate_number,
			pick_up_location: ride.pick_up_location,
			pick_up_address: ride.pick_up_address,
			pick_up_at: ride.pick_up_at,
			seats_required: ride.seats_required,
			bags: ride.bags,
			additional_notes: ride.additional_notes,
		}

		if(ride.ride_type === 'standard'){
			data.drop_off_location = ride.drop_off_location
			data.drop_off_address = ride.drop_off_address
		}
		else if(ride.ride_type === 'luxury'){
			data.no_of_hours = ride.no_of_hours
		}

		await offers.create(data).then(async (response) => {

			const rider = await riders.findById(ride.rider_id)
			await functions.sendNotification('Ride Offer',`You have received a ride Offer from ${driver.first_name} ${driver.last_name} .`,rider.device_token ).then(()=>{
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'New offer created successfully',
					offer: response
				})
			})
		}).catch((err) => {
			return next(err)
		})
	} catch (error) {
		return next(error)
	}

}

const allOffers = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		await offers.find({driver_id: driver._id}).then((response) => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'All Offers',
				rides: response
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (error) {
		return next(error)
	}

}

const rideHistory = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		await rides.find({driver_id: driver._id,$or: [{status:'completed'},{status:'Ride ended'}, {canceled:true}]}).then((response) => {
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

const leaveForRide = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		if(driver.status.account_status !== 'verified') {
			return next('Driver documents not verified')
		}

		const ride = await rides.findById(req.params.ride_id)

		if(ride.status !== 'scheduled'){
			return next('Ride needs to be scheduled')
		}

		if(( ride.pick_up_at.getTime() - new Date().getTime() ) > 5.4e+6){
			return next('Cannot start ride 90 minutes before ride time')
		}

		ride.events.driverOnTheWay = new Date()
		ride.status = 'Driver on the way'

		await rides.save().then(async(response) => {

			driver.status.in_ride = true
			driver.save()
			const rider = await riders.findById(ride.rider_id)
			await functions.sendNotification('Driver on the way',`Your driver ${driver.first_name} ${driver.last_name} is on the way. Please check the app for an ETA and meet at pickup location.`,rider.device_token )
			await functions.sendSms(rider.phone_number,`Your driver ${driver.first_name} ${driver.last_name} is on the way. Please check the app for an ETA and meet at pickup location.`)

			await offers.deleteMany({$and: [{ ride_id: req.params.ride_id }, { status: 'pending' }]}).then(()=>{
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver is on his way for the ride',
					ride: response
				})
			}).catch((err)=>{
				return next(err)
			})
		}).catch((err) => {
			return next(err)
		})

	} catch (error) {
		return next(error)
	}

}

const atRideLocation = async (req, res, next) => {

	try {

		const phone_number = req.user

		const {current_lat, current_lng} = req.body

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		if(driver.status.account_status !== 'verified') {
			return next('Driver documents not verified')
		}

		if(!current_lat || ! current_lng){
			return next('Enter current longitude latitude')
		}

		const ride = await rides.findById(req.params.ride_id)

		if(ride.status !== 'Driver on the way'){
			return next('Driver not on the way')
		}

		if(( ride.pick_up_at.getTime() - new Date().getTime() ) > 600000){
			return next('Cannot arrive 10 minutes before ride time')
		}

		await functions.calculateRoadVariables( current_lat, current_lng,ride.pick_up_location.coordinates[1], ride.pick_up_location.coordinates[0]).then(async(response) => {
			if(response.rows[0].elements[0].status === 'NOT_FOUND' || response.rows[0].elements[0].status === 'ZERO_RESULTS'){
				return next('Could not calculate distance')
			}

			if (Math.ceil(response.rows[0].elements[0].distance.value / 1609) > 1) {
				return next('Driver not at Pickup Location')
			}

			ride.status = 'Driver at ride location'
			ride.events.driverAtPickup =new Date()


			const rider = await riders.findById(ride.rider_id)
			await functions.sendNotification('Driver at pick up location',`Your driver ${driver.first_name} ${driver.last_name} has arrived at your pick up location.`,rider.device_token)
			await functions.sendSms(rider.phone_number,`Your driver ${driver.first_name} ${driver.last_name} has arrived at your pick up location.`)

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver reached at the ride location'
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (error) {
		return next(error)
	}

}

const startRide = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		if(driver.status.account_status !== 'verified') {
			return next('Driver documents not verified')
		}

		const query = {_id: req.params.ride_id}

		const update = {
			'events.rideStarted':new Date(),
			status: 'Ride started'
		}

		const option = {new: true}

		await rides.findOneAndUpdate(query, update, option).then(async(response) => {

			const rider = await riders.findById(response.rider_id)
			await functions.sendNotification('Ride started',`Your ride has now begun. Thank you for choosing Rydelinx.`,rider.device_token)
			await functions.sendSms(rider.phone_number,`Your ride has now begun. Thank you for choosing Rydelinx.`)

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Ride started successfully',
				ride: response
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (error) {
		return next(error)
	}

}

const endRide = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		if(driver.status.account_status !== 'verified') {
			return next('Driver documents not verified')
		}

		const query = {_id: req.params.ride_id}

		const update = {
			'events.rideEnded': new Date(),
			status: 'Ride ended'
		}

		const option = {new: true}

		await rides.findOneAndUpdate(query, update, option).then(async (response) => {

			const rider = await riders.findById(response.rider_id)
			await functions.sendNotification('Ride ended', `Your ride has ended. Thank you for using Rydelinx. `, rider.device_token)
			await functions.sendSms(rider.phone_number, `Your ride has ended. Thank you for choosing Rydelinx.`)
			await functions.payment(response._id).then((response) => {
				if (response === 'Payment charged successfully') {
					return res.status(200).send({
						status: 200,
						error: false,
						message: 'Ride ended successfully',
						payment: 'Successful'
					})
				} else {
					return res.status(200).send({
						status: 200,
						error: true,
						message: 'Ride ended successfully',
						payment: 'Failed',
						reason: response
					})
				}
			})
		}).catch((err) => {
			return next(err)
		})

	} catch (error) {
		return next(error)
	}

}

const completeRide = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		if(driver.status.account_status !== 'verified') {
			return next('Driver documents not verified')
		}

		const {stars} = req.body

		const query = {_id: req.params.ride_id}

		const update = {
			'events.rideCompleted':new Date(),
			status: 'completed',
			'driverFeedback.stars': stars
		}

		const option = {new: true}

		await rides.findOneAndUpdate(query, update, option).then(async (response) => {

			driver.status.in_ride = false

			let rider = await riders.findById({ _id:response.rider_id })

			rider.completed_rides = rider.completed_rides+1

			rider.rating = rider.rating + stars

			let newRating

			if(driver.completed_rides!==0 && driver.rating!==0) {
				newRating = driver.rating / driver.completed_rides
			}else{
				newRating = 5
			}
			driver.rating = driver.rating + newRating

			driver.completed_rides = driver.completed_rides + 1

			await driver.save()
			await rider.save()

			await offers.deleteMany({ ride_id: req.params.ride_id }).then(()=>{
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Ride completed successfully'
				})
			}).catch((err)=>{
				return next(err)
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (error) {
		return next(error)
	}

}

const retryPayment = async(req,res,next) =>{

	try{

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		await functions.payment(req.params.ride_id).then((response) => {
			if (response === 'Payment charged successfully') {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Ride ended successfully',
					payment: 'Successful'
				})
			} else {
				return res.status(200).send({
					status: 200,
					error: true,
					message: 'Ride ended successfully',
					payment: 'Failed',
					reason: response
				})
			}
		})

	}catch (err) {
		return next(err)
	}
}

const cancelRide = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		if(driver.status.account_status !== 'verified') {
			return next('Driver documents not verified')
		}

		const query = {_id: req.params.ride_id}

		const update = {
			canceled: true,
			canceledBy: 'driver'
		}

		await rides.findOneAndUpdate(query, update).then(async(response) => {

			const rider = await riders.findById(response.rider_id)
			await functions.sendNotification('Ride canceled',`Your ride has been canceled by the driver . Thank you for using Rydelinx. `,rider.device_token)
			await functions.sendSms(rider.phone_number,`Your ride has been canceled by the driver . Thank you for using Rydelinx.`)

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Ride canceled successfully',
				ride: response
			})
		}).catch((error) => {
			return next(error)
		})
	} catch (error) {
		return next(error)
	}
}

const canceledRides = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		if(driver.status.account_status !== 'verified') {
			return next('Driver documents not verified')
		}

		await rides.find({driver_id: driver._id, canceled: true}).then((response) => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Canceled rides',
				rides: response
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (error) {
		return next(error)
	}

}

module.exports = {
	allRides,
	rideDetails,
	makeOffer,
	allOffers,
	rideHistory,
	leaveForRide,
	atRideLocation,
	startRide,
	endRide,
	completeRide,
	retryPayment,
	cancelRide,
	canceledRides
}
