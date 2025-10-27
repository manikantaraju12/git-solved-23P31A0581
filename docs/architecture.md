# System Architecture

## Overview
DevOps Simulator follows a microservices architecture designed for high availability and scalability. This document covers both production and development configurations.

## Components

### 1. Application Server
- **Technology**: Node.js + Express
- **Production Port**: 8080
- **Development Port**: 3000 (with hot reload)
- **Scaling**: Horizontal auto-scaling (production), manual single instance (development)
- **Debug**: Chrome DevTools debugger available in development

### 2. Database Layer
- **Database**: PostgreSQL 14
- **Production Configuration**: Master-slave replication with automated daily backups
- **Development Configuration**: Single local instance, auto-seed with test data, manual backups
- **Backup & Retention**: Production automated, development manual

### 3. Monitoring System
- **Production Tool**: Prometheus + Grafana with email alerts
- **Development Tool**: Console logging + optional Prometheus
- **Metrics**: CPU, Memory, Disk, Network (both)
- **Alerts**: Email notifications (production), console warnings (development)
- **Dashboard**: Web dashboard in development

### 4. Container Orchestration (Development Only)
- **Tool**: Docker Compose
- **Services**: App, Database, Redis cache
- **Volume Mounts**: Code directory for hot reload

### 5. Authentication System (Development Beta)
- **Method**: OAuth2 + JWT
- **Providers**: Google, GitHub (for testing)
- **Sessions**: Redis-based session storage

## Deployment Strategy

### Production
- **Method**: Rolling updates
- **Zero-downtime**: Yes
- **Rollback**: Automated on failure

### Development
- **Method**: Docker Compose with hot reload
- **Zero-downtime**: Not applicable
- **Rollback**: Git checkout previous commit
- **Workflow**:
  1. Make code changes
  2. Auto-reload triggers rebuild
  3. Run unit tests
  4. Check console logs
  5. Commit when ready

## Security
- **Production**: SSL/TLS encryption, database encryption, regular audits
- **Development**: SSL/TLS disabled, database credentials in plain text, CORS enabled, debug endpoints exposed

## Experimental Features (Development)
⚠️ **Warning**: The following features are experimental:
- Multi-cloud deployment
- AI-powered log analysis
- Automatic rollback on anomaly detection
