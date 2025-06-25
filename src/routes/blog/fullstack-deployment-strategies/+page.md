---
title: 'Full-Stack Deployment Strategies in 2024'
description: 'A comprehensive guide to deploying modern full-stack applications with CI/CD pipelines and container orchestration.'
date: '2024-01-01'
readingTime: 15
category: 'DevOps'
---

# Full-Stack Deployment Strategies in 2024

The landscape of full-stack application deployment has evolved dramatically in recent years. With the rise of containerization, serverless architectures, and sophisticated CI/CD pipelines, developers now have unprecedented flexibility in how they deploy and scale their applications. This comprehensive guide explores modern deployment strategies that enable teams to deliver robust, scalable applications with confidence.

## Modern Deployment Architecture Overview

Contemporary full-stack deployment involves multiple interconnected components that work together to deliver seamless user experiences:

- **Frontend applications** with static site generation and edge deployment
- **Backend APIs** with containerized microservices
- **Database systems** with automated backups and scaling
- **CDN networks** for global content delivery
- **Monitoring and observability** for real-time insights
- **Security layers** with automated vulnerability scanning

## Containerization with Docker and Kubernetes

### Multi-Stage Docker Builds

Efficient containerization starts with optimized Docker images that minimize size and attack surface:

```dockerfile
# Frontend Dockerfile (React/Next.js example)
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```dockerfile
# Backend Dockerfile (Node.js API example)
FROM node:18-alpine AS base
RUN apk add --no-cache dumb-init
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

FROM base AS production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
USER node
EXPOSE 3000
CMD ["dumb-init", "node", "dist/server.js"]
```

### Kubernetes Deployment Manifests

```yaml
# Frontend deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deployment
  labels:
    app: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: your-registry/frontend:latest
          ports:
            - containerPort: 80
          resources:
            requests:
              memory: '64Mi'
              cpu: '50m'
            limits:
              memory: '128Mi'
              cpu: '100m'
          livenessProbe:
            httpGet:
              path: /health
              port: 80
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

```yaml
# Backend deployment with ConfigMap and Secrets
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: your-registry/backend:latest
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: 'production'
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: backend-secrets
                  key: database-url
            - name: REDIS_URL
              valueFrom:
                configMapKeyRef:
                  name: backend-config
                  key: redis-url
          resources:
            requests:
              memory: '256Mi'
              cpu: '100m'
            limits:
              memory: '512Mi'
              cpu: '500m'
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 60
            periodSeconds: 30
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 5
```

## CI/CD Pipeline Implementation

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy Full-Stack Application

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type checking
        run: npm run type-check

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}

      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    outputs:
      frontend-image: ${{ steps.frontend-meta.outputs.tags }}
      backend-image: ${{ steps.backend-meta.outputs.tags }}

    steps:
      - uses: actions/checkout@v4

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract frontend metadata
        id: frontend-meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/frontend
          tags: |
            type=ref,event=branch
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push frontend image
        uses: docker/build-push-action@v5
        with:
          context: ./frontend
          push: true
          tags: ${{ steps.frontend-meta.outputs.tags }}
          labels: ${{ steps.frontend-meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Extract backend metadata
        id: backend-meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/backend
          tags: |
            type=ref,event=branch
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push backend image
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: true
          tags: ${{ steps.backend-meta.outputs.tags }}
          labels: ${{ steps.backend-meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: production

    steps:
      - uses: actions/checkout@v4

      - name: Setup kubectl
        uses: azure/setup-kubectl@v3
        with:
          version: 'v1.28.0'

      - name: Configure kubectl
        run: |
          echo "${{ secrets.KUBE_CONFIG }}" | base64 -d > kubeconfig
          export KUBECONFIG=kubeconfig

      - name: Deploy to Kubernetes
        run: |
          export KUBECONFIG=kubeconfig

          # Update image tags in deployment manifests
          sed -i "s|IMAGE_TAG_FRONTEND|${{ needs.build-and-push.outputs.frontend-image }}|g" k8s/frontend-deployment.yaml
          sed -i "s|IMAGE_TAG_BACKEND|${{ needs.build-and-push.outputs.backend-image }}|g" k8s/backend-deployment.yaml

          # Apply configurations
          kubectl apply -f k8s/

          # Wait for rollout to complete
          kubectl rollout status deployment/frontend-deployment --timeout=600s
          kubectl rollout status deployment/backend-deployment --timeout=600s

      - name: Run smoke tests
        run: |
          export KUBECONFIG=kubeconfig

          # Get service endpoints
          FRONTEND_URL=$(kubectl get service frontend-service -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
          BACKEND_URL=$(kubectl get service backend-service -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

          # Run basic health checks
          curl -f http://$FRONTEND_URL/health || exit 1
          curl -f http://$BACKEND_URL:3000/health || exit 1

          # Run end-to-end tests
          npm run test:e2e -- --baseUrl=http://$FRONTEND_URL
```

## Infrastructure as Code with Terraform

### AWS Infrastructure Setup

```hcl
# main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "your-terraform-state-bucket"
    key    = "fullstack-app/terraform.tfstate"
    region = "us-west-2"
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC and Networking
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "${var.project_name}-vpc"
  }
}

resource "aws_subnet" "public" {
  count = 2

  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.${count.index + 1}.0/24"
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.project_name}-public-subnet-${count.index + 1}"
  }
}

resource "aws_subnet" "private" {
  count = 2

  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 10}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "${var.project_name}-private-subnet-${count.index + 1}"
  }
}

# EKS Cluster
resource "aws_eks_cluster" "main" {
  name     = "${var.project_name}-cluster"
  role_arn = aws_iam_role.eks_cluster.arn
  version  = "1.28"

  vpc_config {
    subnet_ids              = concat(aws_subnet.public[*].id, aws_subnet.private[*].id)
    endpoint_private_access = true
    endpoint_public_access  = true
  }

  enabled_cluster_log_types = ["api", "audit", "authenticator", "controllerManager", "scheduler"]

  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy,
    aws_iam_role_policy_attachment.eks_service_policy,
  ]
}

# RDS Database
resource "aws_db_instance" "main" {
  identifier = "${var.project_name}-db"

  engine         = "postgres"
  engine_version = "15.4"
  instance_class = var.db_instance_class

  allocated_storage     = 20
  max_allocated_storage = 100
  storage_encrypted     = true

  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"

  skip_final_snapshot = false
  final_snapshot_identifier = "${var.project_name}-db-final-snapshot-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"

  tags = {
    Name = "${var.project_name}-database"
  }
}

# ElastiCache Redis
resource "aws_elasticache_subnet_group" "main" {
  name       = "${var.project_name}-cache-subnet"
  subnet_ids = aws_subnet.private[*].id
}

resource "aws_elasticache_replication_group" "main" {
  replication_group_id       = "${var.project_name}-redis"
  description                = "Redis cluster for ${var.project_name}"

  node_type            = "cache.t3.micro"
  port                 = 6379
  parameter_group_name = "default.redis7"

  num_cache_clusters = 2

  subnet_group_name  = aws_elasticache_subnet_group.main.name
  security_group_ids = [aws_security_group.elasticache.id]

  at_rest_encryption_enabled = true
  transit_encryption_enabled = true

  automatic_failover_enabled = true
  multi_az_enabled          = true

  tags = {
    Name = "${var.project_name}-redis"
  }
}
```

## Serverless Deployment Strategies

### AWS Lambda with API Gateway

```yaml
# serverless.yml
service: fullstack-serverless-api

frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs18.x
  region: ${opt:region, 'us-west-2'}
  stage: ${opt:stage, 'dev'}

  environment:
    NODE_ENV: ${self:provider.stage}
    DATABASE_URL: ${ssm:/fullstack-app/${self:provider.stage}/database-url}
    REDIS_URL: ${ssm:/fullstack-app/${self:provider.stage}/redis-url}
    JWT_SECRET: ${ssm:/fullstack-app/${self:provider.stage}/jwt-secret~true}

  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.stage}-*'

    - Effect: Allow
      Action:
        - s3:GetObject
        - s3:PutObject
        - s3:DeleteObject
      Resource: 'arn:aws:s3:::${self:provider.stage}-fullstack-uploads/*'

functions:
  # User management
  createUser:
    handler: src/handlers/users.create
    events:
      - http:
          path: /api/users
          method: post
          cors: true
          authorizer:
            name: authHandler
            resultTtlInSeconds: 300

  getUser:
    handler: src/handlers/users.get
    events:
      - http:
          path: /api/users/{id}
          method: get
          cors: true
          request:
            parameters:
              paths:
                id: true

  updateUser:
    handler: src/handlers/users.update
    events:
      - http:
          path: /api/users/{id}
          method: put
          cors: true
          authorizer:
            name: authHandler
            resultTtlInSeconds: 300

  # Authentication
  authHandler:
    handler: src/handlers/auth.authorize

  login:
    handler: src/handlers/auth.login
    events:
      - http:
          path: /api/auth/login
          method: post
          cors: true

  # File uploads
  uploadFile:
    handler: src/handlers/files.upload
    timeout: 30
    events:
      - http:
          path: /api/files/upload
          method: post
          cors: true
          authorizer:
            name: authHandler
            resultTtlInSeconds: 300

resources:
  Resources:
    # DynamoDB Tables
    UsersTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ${self:provider.stage}-users
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
          - AttributeName: email
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
        GlobalSecondaryIndexes:
          - IndexName: EmailIndex
            KeySchema:
              - AttributeName: email
                KeyType: HASH
            Projection:
              ProjectionType: ALL
            BillingMode: PAY_PER_REQUEST
        BillingMode: PAY_PER_REQUEST
        StreamSpecification:
          StreamViewType: NEW_AND_OLD_IMAGES

    # S3 Bucket for file uploads
    FileUploadsBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: ${self:provider.stage}-fullstack-uploads
        CorsConfiguration:
          CorsRules:
            - AllowedOrigins:
                - '*'
              AllowedHeaders:
                - '*'
              AllowedMethods:
                - GET
                - PUT
                - POST
                - DELETE
                - HEAD
              MaxAge: 3000

plugins:
  - serverless-webpack
  - serverless-offline
  - serverless-domain-manager

custom:
  webpack:
    webpackConfig: webpack.config.js
    includeModules: true
    packager: 'npm'

  customDomain:
    domainName: api.yourapp.com
    stage: ${self:provider.stage}
    certificateName: '*.yourapp.com'
    createRoute53Record: true
    endpointType: 'regional'
```

## Database Migration and Management

### Automated Database Migrations

```javascript
// migrations/migrate.js
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

class MigrationRunner {
  constructor(databaseUrl) {
    this.pool = new Pool({ connectionString: databaseUrl });
  }

  async init() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  async getExecutedMigrations() {
    const result = await this.pool.query('SELECT filename FROM migrations ORDER BY id');
    return result.rows.map((row) => row.filename);
  }

  async executeMigration(filename) {
    const filePath = path.join(__dirname, 'sql', filename);
    const sql = fs.readFileSync(filePath, 'utf8');

    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(sql);
      await client.query('INSERT INTO migrations (filename) VALUES ($1)', [filename]);
      await client.query('COMMIT');
      console.log(`✅ Executed migration: ${filename}`);
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(`❌ Failed to execute migration ${filename}:`, error);
      throw error;
    } finally {
      client.release();
    }
  }

  async run() {
    await this.init();

    const migrationFiles = fs
      .readdirSync(path.join(__dirname, 'sql'))
      .filter((file) => file.endsWith('.sql'))
      .sort();

    const executedMigrations = await this.getExecutedMigrations();
    const pendingMigrations = migrationFiles.filter((file) => !executedMigrations.includes(file));

    if (pendingMigrations.length === 0) {
      console.log('No pending migrations');
      return;
    }

    console.log(`Running ${pendingMigrations.length} migrations...`);

    for (const filename of pendingMigrations) {
      await this.executeMigration(filename);
    }

    console.log('All migrations completed successfully');
  }

  async close() {
    await this.pool.end();
  }
}

// Usage in deployment
if (require.main === module) {
  const migrationRunner = new MigrationRunner(process.env.DATABASE_URL);

  migrationRunner
    .run()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

module.exports = MigrationRunner;
```

## Monitoring and Observability

### Comprehensive Monitoring Setup

```yaml
# monitoring/prometheus-config.yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
      evaluation_interval: 15s

    rule_files:
      - "alert_rules.yml"

    alerting:
      alertmanagers:
        - static_configs:
            - targets:
              - alertmanager:9093

    scrape_configs:
      - job_name: 'kubernetes-apiservers'
        kubernetes_sd_configs:
        - role: endpoints
        scheme: https
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
        relabel_configs:
        - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
          action: keep
          regex: default;kubernetes;https

      - job_name: 'kubernetes-nodes'
        kubernetes_sd_configs:
        - role: node
        relabel_configs:
        - action: labelmap
          regex: __meta_kubernetes_node_label_(.+)
        - target_label: __address__
          replacement: kubernetes.default.svc:443
        - source_labels: [__meta_kubernetes_node_name]
          regex: (.+)
          target_label: __metrics_path__
          replacement: /api/v1/nodes/${1}/proxy/metrics

      - job_name: 'kubernetes-pods'
        kubernetes_sd_configs:
        - role: pod
        relabel_configs:
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
          action: keep
          regex: true
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
          action: replace
          target_label: __metrics_path__
          regex: (.+)
        - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
          action: replace
          regex: ([^:]+)(?::\d+)?;(\d+)
          replacement: $1:$2
          target_label: __address__
        - action: labelmap
          regex: __meta_kubernetes_pod_label_(.+)
        - source_labels: [__meta_kubernetes_namespace]
          action: replace
          target_label: kubernetes_namespace
        - source_labels: [__meta_kubernetes_pod_name]
          action: replace
          target_label: kubernetes_pod_name

  alert_rules.yml: |
    groups:
    - name: fullstack-app-alerts
      rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is above 10% for 5 minutes"

      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High latency detected"
          description: "95th percentile latency is above 500ms"

      - alert: PodCrashLooping
        expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Pod is crash looping"
          description: "Pod {{ $labels.pod }} in namespace {{ $labels.namespace }} is crash looping"
```

### Application Performance Monitoring

```javascript
// monitoring/apm.js
const prometheus = require('prom-client');
const express = require('express');

// Create metrics
const httpRequestsTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const activeConnections = new prometheus.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

const databaseQueryDuration = new prometheus.Histogram({
  name: 'database_query_duration_seconds',
  help: 'Duration of database queries in seconds',
  labelNames: ['query_type'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 3, 5]
});

// Middleware for HTTP metrics
const metricsMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;

    httpRequestsTotal.labels(req.method, route, res.statusCode.toString()).inc();

    httpRequestDuration.labels(req.method, route).observe(duration);
  });

  next();
};

// Database query wrapper with metrics
const measureQuery = (queryType, queryFn) => {
  return async (...args) => {
    const start = Date.now();
    try {
      const result = await queryFn(...args);
      const duration = (Date.now() - start) / 1000;
      databaseQueryDuration.labels(queryType).observe(duration);
      return result;
    } catch (error) {
      const duration = (Date.now() - start) / 1000;
      databaseQueryDuration.labels(`${queryType}_error`).observe(duration);
      throw error;
    }
  };
};

// Health check endpoint
const createHealthCheck = (dependencies = {}) => {
  return async (req, res) => {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      dependencies: {}
    };

    // Check database connection
    if (dependencies.database) {
      try {
        await dependencies.database.query('SELECT 1');
        health.dependencies.database = 'healthy';
      } catch (error) {
        health.dependencies.database = 'unhealthy';
        health.status = 'unhealthy';
      }
    }

    // Check Redis connection
    if (dependencies.redis) {
      try {
        await dependencies.redis.ping();
        health.dependencies.redis = 'healthy';
      } catch (error) {
        health.dependencies.redis = 'unhealthy';
        health.status = 'unhealthy';
      }
    }

    const statusCode = health.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(health);
  };
};

module.exports = {
  metricsMiddleware,
  measureQuery,
  createHealthCheck,
  metrics: {
    httpRequestsTotal,
    httpRequestDuration,
    activeConnections,
    databaseQueryDuration
  }
};
```

## Security Best Practices

### Security Headers and Configuration

```javascript
// security/config.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const securityConfig = {
  // Helmet configuration for security headers
  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'", 'https://api.yourapp.com'],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"]
      }
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  },

  // Rate limiting configuration
  rateLimit: {
    // General API rate limit
    general: rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 1000 requests per windowMs
      message: 'Too many requests from this IP',
      standardHeaders: true,
      legacyHeaders: false
    }),

    // Strict rate limit for authentication endpoints
    auth: rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10,
      message: 'Too many authentication attempts',
      standardHeaders: true,
      legacyHeaders: false
    }),

    // File upload rate limit
    upload: rateLimit({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 100,
      message: 'Upload limit exceeded'
    })
  },

  // CORS configuration
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://yourapp.com', 'https://www.yourapp.com']
        : ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200
  }
};

module.exports = securityConfig;
```

### Container Security Scanning

```yaml
# .github/workflows/security-scan.yml
name: Security Scan

on:
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM
  push:
    branches: [main]

jobs:
  vulnerability-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'your-registry/app:latest'
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

  dependency-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Audit dependencies
        run: |
          npm audit --audit-level=moderate
          npm audit fix --dry-run
```

## Blue-Green Deployment Strategy

### Implementation with Kubernetes

```yaml
# blue-green-deployment.yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: fullstack-app-rollout
spec:
  replicas: 5
  strategy:
    blueGreen:
      activeService: fullstack-app-active
      previewService: fullstack-app-preview
      autoPromotionEnabled: false
      scaleDownDelaySeconds: 30
      prePromotionAnalysis:
        templates:
          - templateName: success-rate
        args:
          - name: service-name
            value: fullstack-app-preview.default.svc.cluster.local
      postPromotionAnalysis:
        templates:
          - templateName: success-rate
        args:
          - name: service-name
            value: fullstack-app-active.default.svc.cluster.local
  selector:
    matchLabels:
      app: fullstack-app
  template:
    metadata:
      labels:
        app: fullstack-app
    spec:
      containers:
        - name: app
          image: your-registry/app:latest
          ports:
            - containerPort: 3000
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 60
            periodSeconds: 30
---
apiVersion: v1
kind: Service
metadata:
  name: fullstack-app-active
spec:
  selector:
    app: fullstack-app
  ports:
    - port: 80
      targetPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: fullstack-app-preview
spec:
  selector:
    app: fullstack-app
  ports:
    - port: 80
      targetPort: 3000
```

### Automated Testing and Promotion

```javascript
// deployment/blue-green-controller.js
const k8s = require('@kubernetes/client-node');
const axios = require('axios');

class BlueGreenController {
  constructor() {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    this.k8sApi = kc.makeApiClient(k8s.AppsV1Api);
    this.coreApi = kc.makeApiClient(k8s.CoreV1Api);
  }

  async deployToPreview(imageTag) {
    try {
      // Update preview deployment
      const deployment = await this.k8sApi.readNamespacedDeployment(
        'fullstack-app-preview',
        'default'
      );

      deployment.body.spec.template.spec.containers[0].image = `your-registry/app:${imageTag}`;

      await this.k8sApi.replaceNamespacedDeployment(
        'fullstack-app-preview',
        'default',
        deployment.body
      );

      console.log(`Deployed ${imageTag} to preview environment`);
      return true;
    } catch (error) {
      console.error('Preview deployment failed:', error);
      return false;
    }
  }

  async runHealthChecks(serviceUrl) {
    const checks = [
      { name: 'Health Check', endpoint: '/health' },
      { name: 'Ready Check', endpoint: '/ready' },
      { name: 'API Check', endpoint: '/api/health' }
    ];

    for (const check of checks) {
      try {
        const response = await axios.get(`${serviceUrl}${check.endpoint}`, {
          timeout: 10000
        });

        if (response.status !== 200) {
          console.error(`${check.name} failed: ${response.status}`);
          return false;
        }

        console.log(`✅ ${check.name} passed`);
      } catch (error) {
        console.error(`${check.name} failed:`, error.message);
        return false;
      }
    }

    return true;
  }

  async promoteToProduction() {
    try {
      // Get preview service selector
      const previewService = await this.coreApi.readNamespacedService(
        'fullstack-app-preview',
        'default'
      );

      // Update active service to point to preview pods
      const activeService = await this.coreApi.readNamespacedService(
        'fullstack-app-active',
        'default'
      );

      activeService.body.spec.selector = previewService.body.spec.selector;

      await this.coreApi.replaceNamespacedService(
        'fullstack-app-active',
        'default',
        activeService.body
      );

      console.log('Promoted preview to production');
      return true;
    } catch (error) {
      console.error('Production promotion failed:', error);
      return false;
    }
  }

  async rollback() {
    try {
      // Implement rollback logic
      console.log('Rolling back to previous version');
      // ... rollback implementation
      return true;
    } catch (error) {
      console.error('Rollback failed:', error);
      return false;
    }
  }
}

module.exports = BlueGreenController;
```

## Cost Optimization Strategies

### Resource Right-Sizing

```yaml
# resource-optimization.yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: production
spec:
  hard:
    requests.cpu: '100'
    requests.memory: 200Gi
    limits.cpu: '200'
    limits.memory: 400Gi
    persistentvolumeclaims: '10'
    pods: '100'
    services: '20'
---
apiVersion: v1
kind: LimitRange
metadata:
  name: resource-limits
  namespace: production
spec:
  limits:
    - default:
        cpu: '500m'
        memory: '512Mi'
      defaultRequest:
        cpu: '100m'
        memory: '128Mi'
      type: Container
    - max:
        cpu: '2'
        memory: '2Gi'
      min:
        cpu: '50m'
        memory: '64Mi'
      type: Container
```

### Auto-Scaling Configuration

```yaml
# horizontal-pod-autoscaler.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: fullstack-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: fullstack-app
  minReplicas: 2
  maxReplicas: 50
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
    - type: Pods
      pods:
        metric:
          name: http_requests_per_second
        target:
          type: AverageValue
          averageValue: '1000'
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
        - type: Percent
          value: 50
          periodSeconds: 60
        - type: Pods
          value: 5
          periodSeconds: 60
      selectPolicy: Max
```

## Disaster Recovery and Backup

### Automated Backup Strategy

```bash
#!/bin/bash
# backup-script.sh

set -e

BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
S3_BUCKET="your-backup-bucket"
NAMESPACE="production"

echo "Starting backup process: $BACKUP_DATE"

# Database backup
echo "Backing up PostgreSQL database..."
kubectl exec -n $NAMESPACE deployment/postgres -- \
  pg_dump -U postgres -d myapp > db_backup_$BACKUP_DATE.sql

# Upload to S3
aws s3 cp db_backup_$BACKUP_DATE.sql s3://$S3_BUCKET/database/

# Kubernetes resource backup
echo "Backing up Kubernetes resources..."
kubectl get all,configmap,secret,pv,pvc -n $NAMESPACE -o yaml > \
  k8s_backup_$BACKUP_DATE.yaml

aws s3 cp k8s_backup_$BACKUP_DATE.yaml s3://$S3_BUCKET/kubernetes/

# File storage backup (if using persistent volumes)
echo "Backing up persistent volumes..."
kubectl get pv -o name | xargs -I {} kubectl get {} -o yaml > \
  pv_backup_$BACKUP_DATE.yaml

aws s3 cp pv_backup_$BACKUP_DATE.yaml s3://$S3_BUCKET/storage/

# Cleanup local files
rm -f db_backup_$BACKUP_DATE.sql k8s_backup_$BACKUP_DATE.yaml pv_backup_$BACKUP_DATE.yaml

echo "Backup completed successfully: $BACKUP_DATE"

# Retain only last 30 days of backups
aws s3api list-objects-v2 --bucket $S3_BUCKET --prefix database/ \
  --query 'Contents[?LastModified<`'"$(date -d '30 days ago' -u +%Y-%m-%dT%H:%M:%S.%3NZ)"'`].Key' \
  --output text | xargs -I {} aws s3 rm s3://$S3_BUCKET/{}
```

## Conclusion

Modern full-stack deployment in 2024 requires a sophisticated understanding of containerization, orchestration, automation, and monitoring. The strategies outlined in this guide provide a comprehensive foundation for deploying applications that are:

- **Scalable** through container orchestration and auto-scaling
- **Reliable** with blue-green deployments and health checks
- **Secure** through automated vulnerability scanning and security headers
- **Observable** with comprehensive monitoring and alerting
- **Cost-effective** through resource optimization and right-sizing
- **Resilient** with disaster recovery and backup strategies

Key takeaways for successful full-stack deployment:

1. **Embrace Infrastructure as Code** for reproducible, version-controlled infrastructure
2. **Implement comprehensive CI/CD pipelines** with automated testing and security scanning
3. **Use container orchestration** for scalability and reliability
4. **Monitor everything** with metrics, logs, and distributed tracing
5. **Plan for failure** with disaster recovery and backup strategies
6. **Optimize costs** through resource right-sizing and auto-scaling
7. **Prioritize security** at every layer of the stack

The deployment landscape continues to evolve with new tools and practices emerging regularly. Stay informed about industry trends, experiment with new technologies in non-production environments, and always prioritize reliability and security over complexity.

Remember that the best deployment strategy is one that fits your team's expertise, application requirements, and business constraints. Start with simpler approaches and gradually adopt more sophisticated patterns as your needs and capabilities grow.

Whether you choose traditional VM-based deployments, container orchestration with Kubernetes, or serverless architectures, the principles of automation, monitoring, and security remain constant. Apply these strategies judiciously, and you'll build deployment pipelines that enable your team to deliver high-quality software with confidence.
