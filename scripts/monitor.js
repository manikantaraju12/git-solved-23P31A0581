/**
 * System Monitoring Script - DevOps Simulator
 * Supports both Production and Development modes
 */

const ENV = process.env.NODE_ENV || 'production';

const monitorConfig = {
  production: {
    interval: 60000, // 1 minute
    alertThreshold: 80,
    metricsEndpoint: 'http://localhost:8080/metrics',
    debugMode: false,
    verboseLogging: false
  },
  development: {
    interval: 5000, // 5 seconds
    alertThreshold: 90,
    metricsEndpoint: 'http://localhost:3000/metrics',
    debugMode: true,
    verboseLogging: true
  }
};

const config = monitorConfig[ENV];

console.log('=================================');
console.log('DevOps Simulator - Monitor');
console.log(`Environment: ${ENV}`);
console.log(`Debug: ${config.debugMode ? 'ENABLED' : 'DISABLED'}`);
console.log('=================================');

function checkSystemHealth() {
  const timestamp = new Date().toISOString();

  if (config.debugMode) {
    console.log(`\n[${timestamp}] === DETAILED HEALTH CHECK ===`);
  } else {
    console.log(`[${timestamp}] Checking system health...`);
  }

  // Check CPU usage
  const cpuUsage = Math.random() * 100;
  console.log(`✓ CPU usage: ${cpuUsage.toFixed(2)}%`);

  // Check Memory usage
  const memUsage = Math.random() * 100;
  console.log(`✓ Memory usage: ${memUsage.toFixed(2)}%`);

  // Check Disk usage
  const diskUsage = Math.random() * 100;
  console.log(`✓ Disk space: ${diskUsage.toFixed(2)}% used`);

  // Development-specific checks
  if (config.debugMode) {
    console.log('✓ Hot reload: Active');
    console.log('✓ Debug port: 9229');
    console.log('✓ Source maps: Enabled');
  }

  // Status determination
  const maxUsage = Math.max(cpuUsage, memUsage, diskUsage);
  if (maxUsage > config.alertThreshold) {
    console.log('⚠️  System Status: WARNING - High resource usage');
  } else {
    console.log('✅ System Status: HEALTHY');
  }

  if (config.verboseLogging) {
    console.log(`Next check in ${config.interval}ms`);
  }
}

// Start monitoring
console.log(`Monitoring every ${config.interval}ms`);
setInterval(checkSystemHealth, config.interval);

// Run first check immediately
checkSystemHealth();

// Development-specific: Log memory usage periodically
if (config.debugMode) {
  setInterval(() => {
    const memUsage = process.memoryUsage();
    console.log('\n--- Memory Usage ---');
    console.log(`RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  }, 30000);
}
