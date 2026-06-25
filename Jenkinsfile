pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "shubh1709"
        IMAGE_NAME = "${DOCKERHUB_USERNAME}/url-shortener"
        IMAGE_TAG = "latest"
        EC2_USER = "ubuntu"
        EC2_HOST = "44.196.172.76"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Pulling latest code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying new version on EC2...'
                sh """
                    docker-compose pull
                    docker-compose up -d --force-recreate
                """
            }
        }
    }

    post {
        success {
            echo 'Pipeline complete — new version is live!'
        }
        failure {
            echo 'Pipeline failed — check the logs above.'
        }
        always {
            sh 'docker logout'
        }
    }
}
