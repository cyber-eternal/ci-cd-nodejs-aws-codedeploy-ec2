# **CI/CD Node.js AWS EC2 CodeDeploy**

> ## **Simple example of how to deploy Node.js application to AWS EC2 instance using AWS CodeDeploy and AWS CodePipeline services**

## ![Deployment process](/tmp/deployment.png)

## **Step By Step Guideline**

---

### **1. Create a new IAM role for EC2 instance**

1.1. Go to [Create IAM Role Page](https://console.aws.amazon.com/iam/home?region=us-east-1#/roles$new?step=type 'AWS Create IAM Role')

1.2. Choose EC2

1.3. Find and choose AmazonEC2RoleforAWSCodeDeploy policy

1.4. Add a name for the role and create

### **2. Create a new IAM role for CodeDeploy**

1.1. Go to [Create IAM Role Page](https://console.aws.amazon.com/iam/home?region=us-east-1#/roles$new?step=type 'AWS Create IAM Role')

1.2. Choose CodeDeploy

1.3. You will see AWSCodeDeployRole policy

1.4. Add a name for the role and create

### **3. Launch an EC2 instance**

1.1. Go to [Launch EC2 Instance Page](https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#LaunchInstanceWizard: 'Launch EC2 Instance')

1.2. Choose an Amazon Machine Image (AMI)

1.3. Add an IAM role that you have created in step #1 to the instance

1.4. The OS should be the same that you have in `appspec.yml` file's os

1.5. Add the user data, to run on instance launching step

```bash
#!/bin/bash
sudo yum -y update
sudo yum -y install ruby
sudo yum -y install wget
cd /home/ec2-user
wget https://aws-codedeploy-us-east-1.s3.amazonaws.com/latest/install
sudo chmod +x ./install
sudo ./install auto
```

1.6. Add a tag `Name: YOUR_INSTANCE_NAME_HERE`

1.6. Launch the instance

### **4. Create CodeDeploy Application**

1.1. Go to [Create Application Page](https://console.aws.amazon.com/codesuite/codedeploy/application/new?region=us-east-1: 'Create Application Page')

1.2. Add an `Application name` and choose an EC2 as a `Compute platform`

1.2. Create deployment group

1.2. As a `Service role` choose the role that you have created in step #2

1.2. As an `Environment configuration` choose Amazon `EC2 instances` or what you need

1.2. Turn off the `Load balancer` if you don't need it

### **5. Create CodePipeline**

1.1. Go to [Create CodePipeline Page](https://console.aws.amazon.com/codesuite/codepipeline/pipeline/new?region=us-east-1: 'Create CodePipeline Page')

1.2. Add an `Pipeline name`

1.3. New `Service role` can be generated automatically, or, you can choose an existing one

1.2. As a `Source provider` choose GitHub version 2, or the source which you need(The steps below was exposed for the GitHub source)

1.3. Create a connection with GitHub, after choose `Repository name` and `Branch name`

1.4. Turn off `Start the pipeline on source code change`, if you don't need it. in that case you will run the pipeline manually

1.5. Skip `Add build stage` stage

1.5. As a `Deploy provider` choose `AWS CodeDeploy`, choose the region and feel the `Application name` and `Deployment group` by the values that you have created in step #4

1.5. Review and create CodePipeline

### **6. Here we go!**

---

> ### **After you can run the pipeline manually, by click on the Release button on Pipeline's page. Or it will be run automatically if you are using `Start the pipeline on source code change`.**

---

## **Checking CodeDeploy agent status**

```bash
sudo service codedeploy-agent status
```

## **CodeDeploy logs directory**

```bash
/opt/codedeploy-agent/deployment-root/deployment-logs/codedeploy-agent-deployments.log
```

### Stay in touch

- Author - [Edgar Sargsyan](https://github.com/cyber-eternal)
- Website - [https://sargsyan.dev](https://sargsyan.dev)
- Twitter - [@cybereternal](https://twitter.com/cybereternal)

License Summary
This sample code is made available under a modified MIT license. See the LICENSE file.
