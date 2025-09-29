import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function startDevelopment() {
    console.log('🚀 Starting Chatosi Development Environment...\n');

    try {
        // Step 1: Start MongoDB
        console.log('📦 Starting MongoDB container...');
        await execAsync('docker compose up mongodb -d');
        console.log('✅ MongoDB container started\n');

        // Step 2: Wait for MongoDB to be ready
        console.log('⏳ Waiting for MongoDB to be ready...');
        await new Promise(resolve => setTimeout(resolve, 8000)); // Wait 8 seconds
        console.log('✅ MongoDB should be ready\n');

        // Step 3: Start the backend server
        console.log('🔧 Starting Node.js backend server...');
        console.log('📝 Server logs will appear below:\n');

        const serverProcess = exec('npm run dev');

        serverProcess.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        serverProcess.stderr.on('data', (data) => {
            console.error(data.toString());
        });

        // Handle process termination
        process.on('SIGINT', () => {
            console.log('\n🛑 Shutting down development environment...');
            serverProcess.kill();
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ Failed to start development environment:', error);
        process.exit(1);
    }
}

startDevelopment();