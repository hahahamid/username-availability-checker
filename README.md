# Username Availability Checker

Inspired by platforms like Instagram, this project implements a **scalable and efficient username availability checker**. Leveraging Bloom Filters and Redis caching, the system ensures rapid and resource-efficient username validation, providing instant feedback to users during registration.

## Features

- **Bloom Filter Integration**: Fast and memory-efficient checks for username existence.
- **Redis Caching**: Caches search results to reduce server load and enhance response times.
- **Scalable Username Generation**: Handles and manages a large dataset of 10 million realistic usernames.
- **API Endpoint**: Simple and intuitive RESTful API to check username availability.
- **Efficient Resource Utilization**: Minimizes unnecessary database queries, optimizing performance and costs.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the API.
- **Redis**: In-memory data structure store used for caching.
- **Bloom Filter**: Probabilistic data structure for efficient membership testing.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.17.0 or later)
- [Redis](https://redis.io/) (v6.2.5 or later)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/username-availability-checker.git
   cd username-availability-checker
    ```

2. **Install Dependencies**

```bash
npm install
```

3. **Generate Username Data**

The project includes a script to generate 10 million realistic usernames.

```bash
node src/utils/generateUsernames.js
```

This will create a ```usernames_large.json``` file in the data directory.



4. **Run the Server**

Start the Express server with the following command:

```bash
node src/app.js
```

**API Endpoint**

Check Username Availability
- Endpoint: /api/check-username
- Method: GET
- Query Parameter: username (string) - The username to check.

**Request Example**

```bash
GET http://localhost:3000/api/check-username?username=swift_Victoria8072
```