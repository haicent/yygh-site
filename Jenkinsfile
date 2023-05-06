pipeline {
  agent {
    node {
      label 'nodejs'
    }

  }
  stages {
    stage('clone code') {
      agent none
      steps {
        container('nodejs') {
          git(url: 'http://gitlab.yinbin.ink:30000/test/yygh-site.git', credentialsId: 'nas-gitlab', branch: 'master', changelog: true, poll: false)
        }

      }
    }

    stage('build js') {
      agent none
      steps {
        container('nodejs') {
          sh 'npm i --registry=https://registry.npmmirror.com'
          sh 'npm run build'
        }

      }
    }

    stage('build & push') {
      agent none
      steps {
        container('nodejs') {
          sh 'docker build -f Dockerfile -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:v$BUILD_NUMBER .'
          withCredentials([usernamePassword(credentialsId : 'harbor-docker-registry' ,usernameVariable : 'DOCKER_REGISTY_USER' ,passwordVariable : 'DOCKER_REGISTY_PASSWD' ,)]) {
            sh '''
echo "$DOCKER_REGISTY_PASSWD" | docker login $REGISTRY -u "$DOCKER_REGISTY_USER" --password-stdin
'''
            sh '''
docker push $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:v$BUILD_NUMBER'''
          }

        }

      }
    }

    stage('deploy to production') {
      steps {
        kubernetesDeploy(configs: 'deploy/**', enableConfigSubstitution: true, kubeconfigId: "$KUBECONFIG_CREDENTIAL_ID")
      }
    }

  }
  environment {
    DOCKER_CREDENTIAL_ID = 'dockerhub-id'
    GITHUB_CREDENTIAL_ID = 'github-id'
    KUBECONFIG_CREDENTIAL_ID = 'kubeconfig-dev-id'
    REGISTRY = '192.168.122.10:30002'
    DOCKERHUB_NAMESPACE = 'devops_syt'
    GITHUB_ACCOUNT = 'kubesphere'
    APP_NAME = 'yygh-site'
  }
}
