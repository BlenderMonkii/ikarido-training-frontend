pipeline {
    agent any
    
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:23-alpine3.20'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    ls -la
                    node --version
                    yarn --version
                    yarn install --frozen-lockfile
                    yarn build
                    ls -la
                '''
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:23-alpine3.20'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    test -f dist/index.html
                '''
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'node:23-alpine3.20'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    yarn install netlify-cli
                    node_modules/.bin/netlify --version
                '''
            }
        }
    }
}
