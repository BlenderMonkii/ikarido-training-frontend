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
                    yarn ci
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
                    test -f **/dist/index.html
                '''
            }
        }
    }
}
