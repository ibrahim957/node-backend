/**
 * @openapi
 *  /api/drivers/sign-in:
 *  post:
 *      summary: Driver Register/Login.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          phone_number:
 *                              type: string
 *                          device_type:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Register/Login Successful
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Register/Login Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/resend-code:
 *  post:
 *      summary: Resend Verification Code.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          phone_number:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Verification Code Sent Successful
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Verification Code Sending Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/verify:
 *  post:
 *      summary: Driver Verify.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          phone_number:
 *                              type: string
 *                          verification_code:
 *                              type: string
 *                          device_token:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Verification Successful
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Verification Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/log-out:
 *  post:
 *      summary: Driver Sign out.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '200':
 *              description: Driver Signed out Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Driver Signed out Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/policy:
 *  post:
 *      summary: Driver Policies.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '200':
 *              description: Driver accepted policies Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Driver policies Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/profile:
 *  post:
 *      summary: Driver Profile.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          first_name:
 *                              type: string
 *                          last_name:
 *                              type: string
 *                          email_address:
 *                              type: string
 *                          base64_image:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Profile updated Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Profile update Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/update-profile:
 *  post:
 *      summary: Update Driver Profile.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          first_name:
 *                              type: string
 *                          last_name:
 *                              type: string
 *                          email_address:
 *                              type: string
 *                          base64_image:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Profile updated Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Profile update Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/get-profile:
 *  get:
 *      summary: Get Driver Profile.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '200':
 *              description: Profile retrieved Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Profile retrieval Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */


/**
 * @openapi
 *  /api/drivers/driver-license:
 *  post:
 *      summary: Driver License.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          base64_image:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Driver license uploaded Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Driver license uploading Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/commercial-insurance:
 *  post:
 *      summary: Driver Commercial Insurance.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          base64_image:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Commercial Insurance uploaded Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Commercial Insurance uploading Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/personal-insurance:
 *  post:
 *      summary: Driver Personal Insurance.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          base64_image:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Personal Insurance uploaded Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Personal Insurance uploading Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/criminal-record:
 *  post:
 *      summary: Driver Criminal Record.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          base64_image:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Criminal Record uploaded Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Criminal Record uploading Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/driving-record:
 *  post:
 *      summary: Driver Driving Record.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          base64_image:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Driving Record uploaded Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Driving Record uploading Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/add-vehicle/{vehicle_id}:
 *  post:
 *      summary: Add Driver Vehicle.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: vehicle_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          plate_number:
 *                              type: string
 *                          make:
 *                              type: string
 *                          model:
 *                              type: string
 *                          year:
 *                              type: string
 *                          color:
 *                              type: string
 *                          type:
 *                              type: string
 *                          category:
 *                              type: string
 *                          passenger_seats:
 *                              type: number
 *      responses:
 *          '200':
 *              description: Vehicle added Successful
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Vehicle addition failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/all-vehicles:
 *  get:
 *      summary: All Driver Vehicles.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '200':
 *              description: Vehicles retrieved Successful
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Vehicles retrieval failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */


/**
 * @openapi
 *  /api/drivers/delete-vehicle/{vehicle_id}:
 *  post:
 *      summary: Delete Vehicle.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: vehicle_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/default-vehicle/{id}:
 *  post:
 *      summary: Driver Default Vehicle
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: vehicle_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Driver's default vehicle added successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Driver's default vehicle Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/vehicle-registration/{vehicle_id}:
 *  post:
 *      summary: Driver Vehicle Registration.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: vehicle_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          base64_image:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Vehicle registration uploaded Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Vehicle registration uploading Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/security-information:
 *  post:
 *      summary: Driver Security Information.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          ssn:
 *                              type: string
 *                          tax_id:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Security information added Successful
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Security information failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/bank-information:
 *  post:
 *      summary: Driver Bank Information.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          account_holder_name:
 *                              type: string
 *                          account_number:
 *                              type: string
 *                          routing_number:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Bank information added Successful
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Bank information failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/bank-information-status:
 *  get:
 *      summary: Driver Bank Information Status.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '200':
 *              description: Bank information added Successful
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Bank information failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/document-list:
 *  get:
 *      summary: Driver Documents.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/help-center:
 *  post:
 *      summary: Driver Help Center.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          subject:
 *                              type: string
 *                          message:
 *                              type: string
 *                          rating:
 *                              type: number
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/all-rides:
 *  get:
 *      summary: All Rides.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          current_lat:
 *                              type: string
 *                          current_lng:
 *                              type: string
 *                          city:
 *                              type: string
 *                          ride_type:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/ride-details/{ride_id}:
 *  get:
 *      summary: Ride Details.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/make-offer/{ride_id}/{vehicle_id}:
 *  post:
 *      summary: Make Offer.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *          - name: vehicle_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          offer_fare:
 *                              type: number
 *      responses:
 *          '200':
 *              description: Offer created Successful
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Offer creation failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/confirmed-rides:
 *  get:
 *      summary: Confirmed Rides.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/ride-history:
 *  get:
 *      summary: Ride History.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/leave-for-ride/{ride_id}:
 *  post:
 *      summary: Leave For Ride.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/at-ride-location/{ride_id}:
 *  post:
 *      summary: At Ride Location.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          current_lat:
 *                              type: string
 *                          current_lng:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/start-ride/{ride_id}:
 *  post:
 *      summary: Start Ride.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/end-ride/{ride_id}:
 *  post:
 *      summary: End Ride.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/complete-ride/{ride_id}:
 *  post:
 *      summary: Complete Ride.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          stars:
 *                              type: number
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/retry-payment/{ride_id}:
 *  post:
 *      summary: Retry payment for ride.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/cancel-ride/{ride_id}:
 *  post:
 *      summary: Cancel Ride.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/drivers/canceled-rides:
 *  get:
 *      summary: Canceled Rides.
 *      tags: [Driver]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/sign-in:
 *  post:
 *      summary: Rider Register/Login.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          phone_number:
 *                              type: string
 *                          device_type:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Register/Login Successful
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Register/Login Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/resend-code:
 *  post:
 *      summary: Resend Verification Code.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          phone_number:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Verification Code Sent Successful
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Verification Code Sending Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/verify:
 *  post:
 *      summary: Rider Verify.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          phone_number:
 *                              type: string
 *                          verification_code:
 *                              type: string
 *                          device_token:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Verification Successful
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Verification Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/log-out:
 *  post:
 *      summary: Rider Sign out.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '200':
 *              description: Rider Signed out Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Rider Signed out Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/policy:
 *  post:
 *      summary: Rider Policies.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '200':
 *              description: Rider accepted policies Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Rider policies Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/profile:
 *  post:
 *      summary: Rider Profile.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          first_name:
 *                              type: string
 *                          last_name:
 *                              type: string
 *                          email_address:
 *                              type: string
 *                          base64_image:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Profile Updated Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Profile Update Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/get-profile:
 *  get:
 *      summary: Get Rider Profile.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '200':
 *              description: Profile retrieved Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Profile retrieval Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/payment:
 *  post:
 *      summary: Rider Payment Information.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          card_holder_name:
 *                              type: string
 *                          card_number:
 *                              type: string
 *                          expiration_year:
 *                              type: number
 *                          expiration_date:
 *                              type: number
 *                          cvc:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Payment information updated Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Payment information update Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/all-payment:
 *  get:
 *      summary: Get Rider payment information.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '200':
 *              description: Payment retrieved Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Payment retrieval Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/default-payment/{payment_id}:
 *  post:
 *      summary: Default Payment.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: payment_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/delete-payment/{payment_id}:
 *  post:
 *      summary: Delete Payment.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: payment_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/help-center:
 *  post:
 *      summary: Rider Help Center.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          subject:
 *                              type: string
 *                          message:
 *                              type: string
 *                          rating:
 *                              type: number
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/new-ride:
 *  post:
 *      summary: Create New Ride.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          ride_type:
 *                              type: string
 *                          pick_up_lat:
 *                              type: string
 *                          pick_up_lng:
 *                              type: string
 *                          pick_up_address:
 *                              type: string
 *                          drop_off_lat:
 *                              type: string
 *                          drop_off_lng:
 *                              type: string
 *                          drop_off_address:
 *                              type: string
 *                          pick_up_date:
 *                              type: string
 *                          pick_up_time:
 *                              type: string
 *                          fare:
 *                              type: number
 *                          no_of_hours:
 *                              type: number
 *                          seats_required:
 *                              type: number
 *                          car_type:
 *                              type: string
 *      responses:
 *          '200':
 *              description: New ride created Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: New ride creation Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/ride-offers/{ride_id}:
 *  get:
 *      summary: Ride offers.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/accept-offer/{offer_id}:
 *  post:
 *      summary: Accept Offer.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: offer_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Offer accepted Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Offer acceptance Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/retry-payment:
 *  post:
 *      summary: All Rides.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/all-rides:
 *  get:
 *      summary: Retry payment of a ride.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/ride-details/{ride_id}:
 *  get:
 *      summary: Ride Details.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/ride-feedback/{ride_id}:
 *  post:
 *      summary: Ride Feedback.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                          stars:
 *                              type: number
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/ride-feedback-skipped/{ride_id}:
 *  post:
 *      summary: Ride Feedback.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/tip-ride/{ride_id}:
 *  post:
 *      summary: Ride Feedback.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/riders/cancel-ride/{ride_id}:
 *  post:
 *      summary: Cancel Ride.
 *      tags: [Rider]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          tip:
 *                              type: number
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/register:
 *  post:
 *      summary: Register User.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          '200':
 *              description: User Registration Successful
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: User Registration Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/login:
 *  post:
 *      summary: Login User.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          '200':
 *              description: User Login Successful
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: User Login Failed
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/current:
 *  get:
 *      summary: Current User.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/send-notification:
 *  post:
 *      summary: Send FCM notification.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          body:
 *                              type: string
 *                          device_token:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Notification sent Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/send-email:
 *  post:
 *      summary: Send email.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          from:
 *                              type: string
 *                          toArray:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  items:
 *                                      email_address:
 *                                          type: string
 *                                      username:
 *                                          type: string
 *                          subject:
 *                              type: string
 *                          body:
 *                              type: string
 *                          all:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Email sent Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/send-sms:
 *  post:
 *      summary: Send Sms.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          toArray:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  items:
 *                                      email_address:
 *                                          type: string
 *                                      username:
 *                                          type: string
 *                          body:
 *                              type: string
 *                          all:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Sms sent Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/read-drivers:
 *  get:
 *      summary: Read Drivers.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '200':
 *              description: Drivers read Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/read-riders:
 *  get:
 *      summary: Read Riders.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '200':
 *              description: Riders read Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/driver-documents/{id}:
 *  get:
 *      summary: Driver Documents.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/verify-documents/{id}:
 *  post:
 *      summary: Verify Driver Document.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          document:
 *                              type: string
 *                          vehicle_id:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/reject-documents/{id}:
 *  post:
 *      summary: Reject Driver Document.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          document:
 *                              type: string
 *                          vehicle_id:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/notify-documents/{id}:
 *  post:
 *      summary: Notify Driver Document.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          document:
 *                              type: string
 *                          vehicle_id:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/all-rides-by-month:
 *  get:
 *      summary: Number of rides by month.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          year:
 *                              type: number
 *                          ride_type:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/number-of-rides-this-month:
 *  get:
 *      summary: Number of rides this month.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/number-of-all-rides:
 *  get:
 *      summary: Number of all rides
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/number-of-rides-by-user:
 *  get:
 *      summary: Number of rides of specified user
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userType:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/rides-by-users/{id}:
 *  get:
 *      summary: Number of rides of specified user
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          type:
 *                              type: string
 *                          isCanceled:
 *                              type: string
 *                          ride_type:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/read-rides:
 *  get:
 *      summary: Read Rides.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          ride_type:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Rides read Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/read-ride-by-id:
 *  get:
 *      summary: Read Ride By Id.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *      responses:
 *          '200':
 *              description: Rides read Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/read-users-by-device:
 *  post:
 *      summary: Read Users by device.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          device:
 *                              type: string
 *                          user_type:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Rides read Successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/cancel-rides/{id}:
 *  post:
 *      summary: Cancel Rides.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Ride canceled successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/dismiss-driver/{id}:
 *  post:
 *      summary: Remove Driver from Ride.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Ride canceled successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/assign-driver/{id}:
 *  post:
 *      summary: Assign Driver to Ride.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          new_driver_id:
 *                              type: string
 *                          vehicle_id:
 *                              type: string
 *                          newFare:
 *                              type: number
 *      responses:
 *          '200':
 *              description: Ride canceled successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/all-payments:
 *  get:
 *      summary: Get all payments.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '200':
 *              description: All payments retrieved successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/payment-by-id/{id}:
 *  get:
 *      summary: Get payment by id.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: All payments retrieved successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/refund-payment/{ride_id}/{payment_id}:
 *  post:
 *      summary: Refund a payment.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *          - name: payment_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Payment refunded successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/retry-payment/{ride_id}:
 *  post:
 *      summary: Retry payment for ride.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: ride_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/get-earning:
 *  get:
 *      summary: Get all earnings.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '200':
 *              description: Earnings Retrieved successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/get-earning-this-month:
 *  get:
 *      summary: Get all earnings this month.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '200':
 *              description: Earnings Retrieved successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/get-earning-this-week:
 *  get:
 *      summary: Get all earnings this week.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      responses:
 *          '200':
 *              description: Earnings Retrieved successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/users/get-earning-for-driver/{driver_id}:
 *  get:
 *      summary: Get all earnings for driver.
 *      tags: [Users]
 *      security:
 *          - apiKeyHeader: []
 *          - jwtTokenHeader: []
 *      parameters:
 *          - name: driver_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Earnings Retrieved successfully
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '401':
 *              description: Incorrect Tokens Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: Tokens Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/blogs:
 *  post:
 *      summary: Create Blogs.
 *      tags: [Blogs]
 *      security:
 *          - apiKeyHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          description:
 *                              type: string
 *                          thumbnail:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/blogs:
 *  get:
 *      summary: Get All Blogs.
 *      tags: [Blogs]
 *      security:
 *          - apiKeyHeader: []
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/blogs/{id}:
 *  put:
 *      summary: Update Blogs.
 *      tags: [Blogs]
 *      security:
 *          - apiKeyHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          description:
 *                              type: string
 *                          thumbnail:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/blogs/{id}:
 *  delete:
 *      summary: Delete Blogs.
 *      tags: [Blogs]
 *      security:
 *          - apiKeyHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/blogs/{id}:
 *  get:
 *      summary: Find Blog.
 *      tags: [Blogs]
 *      security:
 *          - apiKeyHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/faqs:
 *  post:
 *      summary: Create Faqs.
 *      tags: [Faqs]
 *      security:
 *          - apiKeyHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          description:
 *                              type: string
 *                          type:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/faqs:
 *  get:
 *      summary: Get All Faqs.
 *      tags: [Faqs]
 *      security:
 *          - apiKeyHeader: []
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/faqs/{id}:
 *  put:
 *      summary: Update Faqs.
 *      tags: [Faqs]
 *      security:
 *          - apiKeyHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          description:
 *                              type: string
 *                          type:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/faqs/{id}:
 *  delete:
 *      summary: Delete Faqs.
 *      tags: [Faqs]
 *      security:
 *          - apiKeyHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/faqs/{id}:
 *  get:
 *      summary: Find Faq.
 *      tags: [Faqs]
 *      security:
 *          - apiKeyHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/news-letters:
 *  post:
 *      summary: Create Newsletters.
 *      tags: [Newsletters]
 *      security:
 *          - apiKeyHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          description:
 *                              type: string
 *                          thumbnail:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/news-letters:
 *  get:
 *      summary: Get All Newsletters.
 *      tags: [Newsletters]
 *      security:
 *          - apiKeyHeader: []
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/news-letters/{id}:
 *  put:
 *      summary: Update Newsletters.
 *      tags: [Newsletters]
 *      security:
 *          - apiKeyHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          description:
 *                              type: string
 *                          thumbnail:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/news-letters/{id}:
 *  delete:
 *      summary: Delete Newsletters.
 *      tags: [Newsletters]
 *      security:
 *          - apiKeyHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/news-letters/{id}:
 *  get:
 *      summary: Find Newsletters.
 *      tags: [Newsletters]
 *      security:
 *          - apiKeyHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/press-releases:
 *  post:
 *      summary: Create Press Releases.
 *      tags: [Press Releases]
 *      security:
 *          - apiKeyHeader: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          description:
 *                              type: string
 *                          thumbnail:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/press-releases:
 *  get:
 *      summary: Get All Press Releases.
 *      tags: [Press Releases]
 *      security:
 *          - apiKeyHeader: []
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/press-releases/{id}:
 *  put:
 *      summary: Update Press Releases.
 *      tags: [Press Releases]
 *      security:
 *          - apiKeyHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          description:
 *                              type: string
 *                          thumbnail:
 *                              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/press-releases/{id}:
 *  delete:
 *      summary: Delete Press Releases.
 *      tags: [Press Releases]
 *      security:
 *          - apiKeyHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */

/**
 * @openapi
 *  /api/press-releases/{id}:
 *  get:
 *      summary: Find Press Releases.
 *      tags: [Press Releases]
 *      security:
 *          - apiKeyHeader: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '401':
 *              description: Incorrect API Key Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '403':
 *              description: API Key Not Provided
 *              contents:
 *                  application/json:
 *                      schema:
 *                          type: object
 */