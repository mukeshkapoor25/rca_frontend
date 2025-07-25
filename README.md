# LogBERT Hadoop RCA - React Frontend

A modern React-based frontend for the LogBERT Hadoop Root Cause Analysis system.

## Features

- **Dashboard**: System overview with real-time metrics
- **Log Analysis**: Upload and analyze log files using AI
- **Anomaly Detection**: Deep SVDD-based anomaly detection
- **Root Cause Analysis**: AI-powered RCA with explanations
- **Model Information**: View model details and performance
- **API Status**: Monitor backend health and endpoints

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:8000
```

## Available Scripts

- `npm start` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run dev` - Start with custom API URL

## Technology Stack

- **React 18** - UI framework
- **React Bootstrap** - UI components
- **React Router** - Navigation
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication
- **Recharts** - Data visualization
- **React Dropzone** - File uploads
- **React Toastify** - Notifications

## Architecture

```
src/
├── components/          # React components
│   ├── Dashboard.js     # Main dashboard
│   ├── LogAnalysis.js   # Log analysis interface
│   ├── AnomalyDetection.js
│   ├── RootCauseAnalysis.js
│   ├── ModelInfo.js
│   └── ApiStatus.js
├── services/           # API services
│   └── apiService.js   # HTTP client and API calls
├── App.js             # Main app component
└── index.js           # Entry point
```

## API Integration

The frontend communicates with the FastAPI backend through:

- REST API endpoints for data operations
- File upload for log analysis
- Real-time updates via Socket.IO (when enabled)

## Development

1. Ensure the backend is running on port 8000
2. Start the frontend development server
3. Open http://localhost:3000 in your browser

## Deployment

Build the frontend for production:

```bash
npm run build
```

The build artifacts will be in the `build/` directory, ready for deployment to any static hosting service.



## Commands to build and push frontend docker image to ECR.

### Pre-requisites:

1. AWS CLI must be installed on your local machine.
2. Docker must be installed and running.

### Configure AWS Credentials

Set up your AWS access keys in the credentials file:

File path: ~/.aws/credentials (Note: ~ means your home directory)

```
[default]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
```

Replace YOUR_ACCESS_KEY and YOUR_SECRET_ACCESS_KEY with your actual credentials.

### Authenticate Docker with ECR

1. Make sure the Dockerfile is located in the root directory of the repository.
2. Replace {version} with your desired image version (e.g., v1.0.0):

```
aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 113938649535.dkr.ecr.eu-north-1.amazonaws.com
```

### Build the Docker Image

```
docker build  --platform=linux/amd64 -t 113938649535.dkr.ecr.eu-north-1.amazonaws.com/group13/rca_frontend:{version} .
```

4. Push docker image to the ECR repository.

```
docker push 113938649535.dkr.ecr.eu-north-1.amazonaws.com/group13/rca_frontend:{version}
```

5. Command to run docker container on Ec2 instance.

If you are running the docker container and already container with same name exist then delete the existing one and then create the new one.

```
docker stop rca_frontend
docker rm rca_frontend
docker run -d -p 80:80 --name rca_frontend 113938649535.dkr.ecr.eu-north-1.amazonaws.com/group13/rca_frontend:{version}
```