/**
 * Test script to verify email functionality
 * Run with: npx tsx test/email-test.ts
 */

import { sendBookingConfirmationEmail } from '../lib/email-utils';

async function testEmail() {
  console.log('Testing email functionality...');

  const testResult = await sendBookingConfirmationEmail({
    to: 'test@example.com', // Replace with a real test email if needed
    bookingDetails: {
      customerName: 'Test User',
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      endTime: new Date(Date.now() + 24.5 * 60 * 60 * 1000), // 24.5 hours from now
      timezone: 'UTC',
      notes: 'Platform preference: Zoom',
    }
  });

  if (testResult) {
    console.log('✅ Email sent successfully!');
  } else {
    console.log('❌ Failed to send email');
  }
}

// Run the test
testEmail().catch(console.error);