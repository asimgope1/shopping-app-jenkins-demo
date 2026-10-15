pipeline {
    agent any

    environment {
        CI = 'true'
        PORT = '3000'
    }

    stages {
        stage('Stage 1 — Checkout') {
            steps {
                echo '📥 Stage 1: Checkout - Obtaining Rahul\'s latest code from GitHub...'
                checkout scm
            }
        }

        stage('Stage 2 — Install') {
            steps {
                echo '📦 Stage 2: Install - Installing dependencies in Jenkins build environment...'
                sh 'npm ci || npm install'
            }
        }

        stage('Stage 2.1 — Install Browser Binaries') {
            steps {
                echo '🌐 Setting up Chromium browser for Playwright headless execution...'
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Stage 3 — Execute Tests') {
            steps {
                echo '🧪 Stage 3: Execute tests - Running Playwright test suite against shopping app...'
                sh 'npm test'
            }
        }
    }

    post {
        always {
            echo '📊 Stage 4 — Collect results: Archiving test outcomes and artifacts...'
            // Publish JUnit XML test results for Jenkins test trends and pass/fail badges
            junit testResults: 'test-results/results.xml', allowEmptyResults: true

            // Archive the rich interactive Playwright HTML report
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
        success {
            echo '🎉 SUCCESS: All test cases passed! Login feature is verified and ready for deployment.'
        }
        failure {
            echo '🚨 FAILURE: Test assertion failed! Check logs and Playwright report. Rahul (Developer) alerted.'
        }
        cleanup {
            echo '🧹 Cleaning up workspace processes...'
        }
    }
}
