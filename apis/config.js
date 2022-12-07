const dotenv =  require('dotenv')
const assert = require('assert')

dotenv.config()

assert(process.env.PORT, 'PORT is required')
assert(process.env.HOST, 'HOST is required')

module.exports = {

	port: process.env.PORT,
	host: process.env.HOST,
	hostUrl: process.env.HOST_URL,
	nodeEnv: process.env.NODE_ENV,
	apiKey: process.env.API_KEY,
	pricePerMileStandard: process.env.PRICE_PER_MILE_STANDARD,
	tokenSecret: process.env.TOKEN_SECRET,
	mongoUri: process.env.MONGO_URI,
	twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
	twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
	twilioFrom: process.env.TWILIO_FROM,
	nodemailerHost: process.env.NODEMAILER_HOST,
	nodemailerUser: process.env.NODEMAILER_USER,
	nodemailerPass: process.env.NODEMAILER_PASS,
	googleApiKey: process.env.GOOGLE_API_KEY,
	stripeKey: process.env.STRIPE_KEY,
	stripeSecret: process.env.STRIPE_SECRET,
	stripeVersion: process.env.STRIPE_VERSION,
	awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
	awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	awsDefaultRegion: process.env.AWS_DEFAULT_REGION,
	s3Bucket: process.env.S3_BUCKET,
	s3Url: process.env.S3_URL,
	s3Dir: process.env.S3_DIR,
	fcmServerKey : process.env.FCM_SERVER_KEY,
	toll_guru_api_key : process.env.TOLL_GURU_API_KEY
}