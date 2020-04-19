swagger: "2.0"
info:
  description: "This is an api for Promo Project"
  version: "1.0.0"
  title: "Promo"
  license:
    name: "ISC"
    url: "https://opensource.org/licenses/ISC"
host: "localhost:9000"
basePath: "/v2"
tags:
- name: "user"
  description: "Operations about user"
- name: "offer"
  description: "Operations about JobOffer"
- name: "portfolioTags"
  description: "Operations about portfolioTags for Search"
- name: "notify"
  description: "Operations about notify"
- name: "readNotify"
  description: "Operations about notifyLink"
- name: "report"
  description: "Operations about report"
- name: "portfolio"
  description: "Operations about portfolio"
- name: "login"
  description: "Operations about authentication"
- name: "checkout-creditCard,checkout-internetBanking,webhooks,bank-charge"
  description: "Operations about payment"

- name: "penalty"
  description: "Operations about penalty"
schemes:
- "http"

  /api/user/:
    post:
      tags:
      - "user"
      summary: "Add a new user to the database"
      description: ""
      operationId: "signup"
      consumes:
      - "application/json"
      - "application/xml"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - in: "body"
        name: "body"
        description: "User object that needs to be added to the database"
        required: true
      responses:
        200:
          description: "Post added successful"
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""
 
  /api/user/:email:
    post:
      tags:
      - "user"
      summary: "Add a new user to the database"
      description: ""
      operationId: "other"
      consumes:
      - "application/json"
      - "application/xml"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - in: "param"
        name: "email"
        description: "User object that needs to be get from the database"
        type : "string"
        format : "UTF-8"
        required: true
      responses:
        200:
          description: "get employee fetched successfully!"
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""

  /api/login/:email.:password:
    get:
      tags:
      - "login"
      summary: "get token to user that have login into system"
      description: ""
      operationId: "login"
      consumes:
      - "application/json"
      - "application/xml"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - in: "params"
        name: "email"
        description: "User that have login into the system"
        required: true
        type: "string"
        format: "UTF-8"
      - in: "params"
        name: "password"
        description: "User that have login into the system"
        required: true
        type: "string"
        format: "UTF-8"
      responses:
        200:
          description: "User login successfully"
        404:
          description: ""

  /api/portfolio/:email:
    get:
      tags:
      - "portfolio"
      summary: "get Photograpger Own portfolio"
      description: "Find portfolio by email"
      operationId: "Search"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "params"
        in: "email"
        description: "email to filter by"
        required: true
        type: "string"
        format: "UTF-8"
      responses:
        200:
          description: "Registor fetched successfully!"
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""

  /api/portfolio/:
    get:
      tags:
      - "portfolio"
      summary: "get Photograpger All portfolio"
      description: "Find portfolio by ID"
      operationId: "Search"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: ""
        in: ""
        description: " to filter All porfolio in DB"
        required: false
        type: ""
        format: ""
      responses:
        200:
          description: "Get portfolio successfully!"
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""

  /api/portfolioTags/:key:
    get:
      tags:
      - "user"
      summary: "get Photograpger All portfolio"
      description: "Find portfolio by ID"
      operationId: "Search"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "param"
        in: "key"
        description: " to filter  porfolio by key work"
        required: true
        type: "integer"
        format: "int64"
      responses:
        200:
          description: "Get portfolio successfully!"
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""

  /api/offer/:email
    get:
      tags:
      - "offer"
      summary: "get own offer"
      description: "Find portfolio by ID"
      operationId: "Search"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "param"
        in: "email"
        description: " to filter offer by email"
        required: true
        type: "string"
        format: "UTF-8"
      responses:
        200:
          description: "Get Offer successfully!"
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""

  /api/offer
	  post:
		tags:
		- "offer"
		summary: "Add a new offer and related nortification to the system"
		description: ""
		operationId: "offer"
		consumes:
		- "application/json"
		- "application/xml"
		produces:
		- "application/xml"
		- "application/json"
		parameters:
		- in: "body"
		  name: "title"
		  description: "Title of offer"
		  required: true
		- in: "body"
		  name: "photographerID"
		  description: "Photographer's id who deal this offer"
		  required: true
		- in: "body"
		  name: "portfolioName"
		  description: "Portfolio's name which deal this offer"
		  required: true
		- in: "body"
		  name: "employerID"
		  description: "Employer's id which deal this offer"
		  required: true
		- in: "body"
		  name: "employerEmail"
		  description: "Employer's email which deal this offer"
		  required: true
		- in: "body"
		  name: "style"
		  description: "Style of offer"
		  required: true
		- in: "body"
		  name: "actDate"
		  description: "Date of offer"
		  required: true
		- in: "body"
		  name: "meetUpTime"
		  description: "Meet up time of offer"
		  required: true
		- in: "body"
		  name: "location"
		  description: "Meeting location"
		  required: true
		- in: "body"
		  name: "progress"
		  description: "'Progress of meeting"
		  required: true
		- in: "body"
		  name: "optionalRequest"
		  description: "Optional request of offer"
		  required: true
        required: true
		responses:
			200:
				description: "Create user successfully"
				schema:
				$ref: "#/definitions/Success"
			400:
				description: "Invalid Input"
 
 
  /api/report/
    post:
      tags:
      - "report"
      summary: "send report"
      description: ""
      operationId: "Problemreport"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "body"
        in: "body"
        description: "send report body to DB"
        required: true

      responses:
        200:
          description: ""
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""


  /api/checkout-creditCard/
    post:
      tags:
      - "Payment"
      summary: "send Payment creditCard"
      description: ""
      operationId: "Payment"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "body"
        in: "body"
        description: "send checkout-creditCard body to OmiseServer"
        required: true

      responses:
        200:
          description: ""
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""



  /api/checkout-internetBanking/
    post:
      tags:
      - "Payment"
      summary: "send Payment internetBanking"
      description: ""
      operationId: "Payment"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "body"
        in: "body"
        description: "send checkout-creditCard body to OmiseServer"
        required: true

      responses:
        200:
          description: ""
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""


  /api/webhooks/
    post:
      tags:
      - "Payment"
      summary: "send webhooks body to frontend"
      description: ""
      operationId: "Payment"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "body"
        in: "body"
        description: "send webhooks body to frontend"
        required: true

      responses:
        200:
          description: ""
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""


  /api/bank-charge/
    post:
      tags:
      - "Payment"
      summary: "get callback bank-charge confirm"
      description: ""
      operationId: "Payment"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "body"
        in: "body"
        description: "status from omise server"
        required: true

      responses:
        200:
          description: ""
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""
  /api/notify/:email
    get:
      tags:
      - "notify"
      summary: "Get a new notify"
      description: ""
      operationId: "notify"
      consumes:
      - "application/json"
      - "application/xml"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "email"
        in: "body"
        description: "status from omise server"
        type : string 
        fprmat: UTF-8
        required: true
      responses:
        200:
          description: "Get notify"
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""
      /api/notify/:email
    get:
      tags:
      - "notify"
      summary: "Get a new notify"
      description: ""
      operationId: "notify"
      consumes:
      - "application/json"
      - "application/xml"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "email"
        in: "body"
        description: "status from omise server"
        type : string 
        fprmat: UTF-8
        required: true
      responses:
        200:
          description: "Get notify"
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""
    /api/notify/:email
    get:
      tags:
      - "notify"
      summary: "Get a new notify"
      description: ""
      operationId: "notify"
      consumes:
      - "application/json"
      - "application/xml"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "email"
        in: "body"
        description: ""
        type : string 
        fprmat: UTF-8
        required: true
      responses:
        200:
          description: "Get notify"
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""

  /api/readNotify/:email
    get:
      tags:
      - "notify"
      summary: "Get a new notify"
      description: ""
      operationId: "notify"
      consumes:
      - "application/json"
      - "application/xml"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "email"
        in: "params"
        description: ""
        type : string 
        fprmat: UTF-8
        required: true
      responses:
        200:
          description: ""
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""
  /api/replyNotify/:id.:isAccept
    get:
      tags:
      - "notify"
      summary: "Get a new notify"
      description: ""
      operationId: "notify"
      consumes:
      - "application/json"
      - "application/xml"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "id"
        in: "params"
        description: ""
        type : string 
        fprmat: UTF-8
        required: true
        parameters:
      - name: "isAccept"
        in: "params"
        description: ""
        type : bool
        required: true
      responses:
        200:
          description: ""
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""


/api/replyNotify/:id.:isAccept
    get:
      tags:
      - "notify"
      summary: "Get a new notify"
      description: ""
      operationId: "notify"
      consumes:
      - "application/json"
      - "application/xml"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "id"
        in: "params"
        description: ""
        type : string 
        fprmat: UTF-8
        required: true
        parameters:
      - name: "isAccept"
        in: "params"
        description: ""
        type : bool
        required: true
      responses:
        200:
          description: ""
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""
/api/penalty/
    get:
      tags:
      - "penalty"
      summary: "Get a new penalty"
      description: ""
      operationId: "penalty"
      consumes:
      - "application/json"
      - "application/xml"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "id"
        in: "params"
        description: ""
        type : string 
        fprmat: UTF-8
        required: true
        parameters:
      - name: "isAccept"
        in: "params"
        description: ""
        type : bool
        required: true
      responses:
        200:
          description: ""
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""

/api/penalty/:email
    post:
      tags:
      - "penalty"
      summary: "post a new penalty"
      description: ""
      operationId: "penalty"
      consumes:
      - "application/json"
      - "application/xml"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "email"
        in: "params"
        description: ""
        type : string 
        fprmat: "email"
        required: true
        parameters:

      responses:
        200:
          description: ""
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""

/api/penalty/:email
    put:
      tags:
      - "penalty"
      summary: "post a new penalty"
      description: ""
      operationId: "penalty"
      consumes:
      - "application/json"
      - "application/xml"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "email"
        in: "params"
        description: ""
        type : string 
        fprmat: "email"
        required: true
        parameters:

      responses:
        200:
          description: ""
          schema:
            $ref: "#/definitions/Success"
        400:
          description: ""

securityDefinitions:

  api_key:
    type: "apiKey"
    name: "api_key"
    in: "header"


definitions:

  User:
    type: "object"
    required: 
    - firstName
    - lastName
    - email
    - username
    - password
    - nationalID
    - gender
    - birthDate
    - isPhotographer
    - displayName
    - phoneNo
    - introduction
    - profileImage
    - portfolioID
    - avgRating
    properties:
      firstname:
        type: "string"
      lastname:
        type: "string"
      email:
        type: "string"
        format: "email"
      password:
        type: "string"
      nationalID:
        type: "string"
      gender:
        type: "string"
      birthDate:
        type: "string"
        format: "date"
      isPhotgrapher:
        type: "boolean"
      displayName:
        type: "string"
      phoneNo:
        type: "string"
        format: "phoneNo"
      introduction:
        type: "string"
      profileImage:
        type: "string"
        format: "url"
      portfolioID:
        type: "string"
      avgRating:
        type: "number"
    xml:
      name: "User"

  portfolio:
    type: "object"
    required: 
    - portfolioName
    - email
    - tags
    - albums
    - minBath
    - maxBath
    properties:
      portfolioName:
        type: "string"
      email:
        type: "string"
        format: "email"
      tags:
        type: "array"
        format: "string"
      Employer:
        type: "array"
        format: "string"
      minBath:
        type: "number"
      maxBath:
        type: "number"
    xml:
      name: "Portfolio"

  offer:
    type: "object"
    required: 
    - title
    - portfolioName
    - emplpyerID
    - employerEmail
    - style
    - actDate
    - meetUpTime
    - location
    - progress
    - optionalRequest
    properties:
      title:
        type: "string"
      portfolioName:
        type: "string"
      employerID:
        type: "string"
      employerEmail:
        type: "string"
        format: "email"
      style:
        type: "string"
      actDate:
        type: "string"
        format: "date"
      meetUpTime:
        type: "string"
        format: "time"
      location: 
        type: "string"
      progress: 
        type: "string"  
      optionalRequest:
        type: "string"
    xml:
      name: "Offer"

 notify:
    type: "object"
    required:
    - email
    - content
    - redirectLink
    - isRead
    - isReply
    properties:
      email:
        type: "string"
        format: "email"
      content:
        type: "string"
      redirectLink:
        type: "string"
        format: "url"
      isRead:
        type: "boolean"
      isReply:
        type: "boolean"
    xml:
      name: "Notify"

  album:
    type: "object"
    required:
    - albumName
    - portfolioID
    - imageURLs
    properties:
      albumName:
        type: "string"
      portfolioID:
        type: "string"
      imageURLs:
        type: "string"
        format: "url"
    xml:
      name: "Album"

    
    penalty:
    type: "object"
    required: 
      - email
      - hibitScore
      - cancelJob
      - acceptJob
      - rejectOffer
    properties:
      email:
        type: "string"
        format: "email"
      hibitScore:
        type: "Int16Array"
      cancelJob:
        type: "Int16Array"
      acceptJob:
        type: "Int16Array"
      rejectOffer:
        type: "Int16Array"
    xml:
      name: "penalty"
externalDocs:
  description: "Find out more about Swagger"
  url: "http://swagger.io"