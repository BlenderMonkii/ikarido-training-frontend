pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID = '635cde16-d84d-487e-b701-24d4609b4f9b'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
    }
    
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
                    yarn add netlify-cli
                    node_modules/.bin/netlify --version
                    echo "Deploying to Netlify... Site ID: $NETLIFY_SITE_ID"
                    node_modules/.bin/netlify status
                    node_modules/.bin/netlify deploy --dir=dist --prod
            }
        }
    }
}
